from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import RedirectResponse
import os, requests, jwt, json, time
from functools import lru_cache

# Google OAuth helpers
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request as GRequest
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# ---------------------------------------------------------------------------
# Environment configuration – ALL secrets should be available at runtime
# ---------------------------------------------------------------------------
AUTH0_DOMAIN: str = os.getenv("AUTH0_DOMAIN", "")  # e.g. "mone.us.auth0.com"
AUTH0_AUDIENCE: str = os.getenv("AUTH0_AUDIENCE", "")  # e.g. "https://api.mone.com"

GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
GOOGLE_SCOPES = [os.getenv("GMAIL_SCOPES", "https://www.googleapis.com/auth/gmail.readonly")]

if not all([AUTH0_DOMAIN, AUTH0_AUDIENCE, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET]):
    raise RuntimeError("Missing one or more required environment variables for Auth0 / Google OAuth")

router = APIRouter(prefix="/auth", tags=["auth"])

# ---------------------------------------------------------------------------
# 1) Auth0 JWT verification dependency
# ---------------------------------------------------------------------------

JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
_ALGORITHMS = ["RS256"]

def _get_jwks():
    """Download (and cache) Auth0 JWK set."""
    r = requests.get(JWKS_URL, timeout=5)
    r.raise_for_status()
    return r.json()

@lru_cache(maxsize=1)
def _cached_jwks():
    # Cache for 24h – simplistic
    return _get_jwks(), int(time.time()) + 24 * 60 * 60


def _choose_key(token_kid: str):
    keys, exp = _cached_jwks()
    # refresh if cache expired
    if time.time() > exp:
        _cached_jwks.cache_clear()
        keys, _ = _cached_jwks()
    for key in keys["keys"]:
        if key["kid"] == token_kid:
            return key
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Matching JWK not found")


def verify_jwt(authorization: str = Depends(lambda authorization: authorization)):
    """FastAPI dependency that validates incoming Auth0 Bearer token and returns the decoded payload."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or malformed Authorization header")
    token = authorization.split(" ")[1]
    unverified_header = jwt.get_unverified_header(token)
    key = _choose_key(unverified_header["kid"])
    try:
        payload = jwt.decode(
            token,
            key=key,
            algorithms=_ALGORITHMS,
            audience=AUTH0_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    return payload  # includes "sub" (user id)

# ---------------------------------------------------------------------------
# 2) Gmail OAuth2 (read-only) – login + callback + helper to build Gmail service
# ---------------------------------------------------------------------------

# Simple in-memory stores – replace with persistent DB in production
_oauth_state_store: dict[str, str] = {}
_gmail_token_store: dict[str, dict] = {}


def _build_flow(state: str | None = None):
    cfg = {
        "web": {
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uris": [GOOGLE_REDIRECT_URI],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    }
    return Flow.from_client_config(cfg, scopes=GOOGLE_SCOPES, state=state)


@router.get("/google/login", status_code=302)
async def google_login(current_user=Depends(verify_jwt)):
    """Redirect the authenticated user to Google OAuth consent screen."""
    flow = _build_flow()
    flow.redirect_uri = GOOGLE_REDIRECT_URI
    auth_url, state = flow.authorization_url(
        access_type="offline",  # get refresh token
        prompt="consent",  # force refresh_token each time (safe for demo)
        include_granted_scopes="true",
    )
    # Save state mapped to Auth0 user id (sub)
    _oauth_state_store[current_user["sub"]] = state
    return RedirectResponse(auth_url)


@router.get("/google/callback")
async def google_callback(state: str, code: str, current_user=Depends(verify_jwt)):
    expected_state = _oauth_state_store.get(current_user["sub"])
    if not expected_state or expected_state != state:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OAuth state")

    flow = _build_flow(state=state)
    flow.redirect_uri = GOOGLE_REDIRECT_URI

    try:
        flow.fetch_token(code=code)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch token: {e}")

    creds: Credentials = flow.credentials
    # Store tokens – WARNING: for demo only! Always encrypt and store in DB.
    _gmail_token_store[current_user["sub"]] = {
        "token": creds.token,
        "refresh_token": creds.refresh_token,
        "expiry": creds.expiry.isoformat() if creds.expiry else None,
    }

    return {"detail": "Gmail access granted", "expires": _gmail_token_store[current_user["sub"]]["expiry"]}


# ---------------------------------------------------------------------------
# 3) Helper – build Gmail API service for a user (read-only)
# ---------------------------------------------------------------------------

def get_gmail_service(user_sub: str):
    creds_info = _gmail_token_store.get(user_sub)
    if not creds_info:
        raise HTTPException(status_code=400, detail="Gmail not connected for this user")

    creds = Credentials(
        creds_info["token"],
        refresh_token=creds_info["refresh_token"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        scopes=GOOGLE_SCOPES,
    )
    if creds.expired and creds.refresh_token:
        creds.refresh(GRequest())
        # Persist refreshed token back to store
        _gmail_token_store[user_sub]["token"] = creds.token
        _gmail_token_store[user_sub]["expiry"] = creds.expiry.isoformat() if creds.expiry else None

    return build("gmail", "v1", credentials=creds)

# ---------------------------------------------------------------------------
# 4) Example protected endpoint that lists the user\'s 5 most recent receipt-like emails
# ---------------------------------------------------------------------------

@router.get("/email/sample-list")
async def list_recent_receipts(current_user=Depends(verify_jwt)):
    """Demo endpoint – show Gmail integration is working."""
    svc = get_gmail_service(current_user["sub"])
    # Gmail search query – tweak as needed
    query = "subject:(receipt OR invoice) newer_than:30d"
    resp = (
        svc.users()
        .messages()
        .list(userId="me", q=query, maxResults=5)
        .execute()
    )
    return resp.get("messages", [])
