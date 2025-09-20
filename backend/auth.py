import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")
API_AUDIENCE = os.environ.get("API_AUDIENCE")
ALGORITHMS = ["RS256"]

# This tells FastAPI where to look for the token (in the "Authorization" header)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Custom exception for authentication errors
class AuthError(HTTPException):
    def __init__(self, error, status_code):
        super().__init__(status_code=status_code, detail=error)

# Function to get the public key from Auth0 to verify the JWT signature
# We cache this so we don't have to fetch it on every single API call
jwks_cache = {}

def get_jwks():
    if not jwks_cache:
        url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        try:
            jwks_cache.update(requests.get(url).json())
        except requests.exceptions.RequestException as e:
            raise AuthError({"code": "jwks_error", "description": f"Could not connect to Auth0 to get JWKS: {e}"}, 500)
    return jwks_cache

def verify_token(token: str = Depends(oauth2_scheme)):
    """
    Verifies an Auth0 JWT token.
    This function is a FastAPI dependency, so it will be run before any
    endpoint that includes it. It returns the token payload if valid.
    """
    if not token:
        raise AuthError({"code": "authorization_header_missing", "description": "Authorization header is expected"}, 401)

    jwks = get_jwks()
    try:
        unverified_header = jwt.get_unverified_header(token)
    except JWTError:
        raise AuthError({"code": "invalid_header", "description": "Unable to parse authentication token."}, 401)
    
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if not rsa_key:
        raise AuthError({"code": "invalid_header", "description": "Unable to find appropriate key."}, 401)

    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise AuthError({"code": "token_expired", "description": "Token is expired."}, 401)
    except jwt.JWTClaimsError:
        raise AuthError({"code": "invalid_claims", "description": "Incorrect claims, please check the audience and issuer."}, 401)
    except Exception:
        raise AuthError({"code": "invalid_token", "description": "Unable to parse authentication token."}, 401)