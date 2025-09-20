import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import json

# --- INITIAL SETUP ---

# Load environment variables from .env file
load_dotenv()

# Create the FastAPI app instance
app = FastAPI()

# Configure the Google Generative AI client with the API key
try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except KeyError:
    # This will be helpful for debugging if you forget the .env file
    raise RuntimeError("GOOGLE_API_KEY not found in .env file. Please create one.")

# Initialize the Gemini model
# We use gemini-1.5-flash as it's fast and cost-effective for this kind of task
model = genai.GenerativeModel('gemini-1.5-flash')

# This is a Pydantic model. FastAPI uses it to validate the request data.
# It means we expect the incoming POST request to have a key "email_text" which is a string.
class EmailParseRequest(BaseModel):
    email_text: str

# A hardcoded example for quick testing
HARDCODED_EMAIL_EXAMPLE = """
From: Spotify <no-reply@spotify.com>
To: Alex Doe <alex.doe@example.com>
Subject: Your receipt from Spotify

Hi Alex,

Thanks for your payment. This email is your receipt for your Spotify Premium subscription.

Amount: $10.99
Billing Date: September 19, 2025
Payment Method: Visa ending in 1234

Your subscription will automatically renew next month. Happy listening!

The Spotify Team
"""


# --- API ENDPOINTS ---

@app.get("/")
def read_root():
    """
    Root endpoint to check if the API is running.
    """
    return {"status": "API is running!"}


@app.post("/prototype/parse-email")
async def parse_email_with_gemini(request: EmailParseRequest = None):
    """
    This endpoint takes email text, sends it to Gemini for parsing,
    and returns a structured JSON object with financial details.
    If no text is provided, it uses a hardcoded example.
    """
    email_content = request.email_text if request else HARDCODED_EMAIL_EXAMPLE

    # This is the prompt we send to the Gemini API.
    # It's engineered to ask the model to act as an expert and return a specific JSON format.
    prompt = f"""
    You are an expert financial data extraction agent.
    Analyze the following email content and extract these specific details:
    - vendorName: The name of the company or service.
    - transactionDate: The date of the charge or billing.
    - totalAmount: The total amount paid, as a number.
    - currency: The currency code (e.g., USD, EUR).
    - isRecurring: A boolean (true/false) indicating if this is a recurring subscription.
    - billingCycle: If recurring, the cycle (e.g., "monthly", "annually"). If not, null.
    - category: A suggested category for this expense (e.g., "Entertainment", "Utilities", "Shopping").

    Return ONLY a valid JSON object with the extracted data. Do not include any explanatory text before or after the JSON.

    Email Content:
    ---
    {email_content}
    ---
    """

    try:
        # Send the prompt to the model
        response = model.generate_content(prompt)
        
        # The response text might have markdown formatting for JSON, so we clean it up.
        cleaned_json_string = response.text.strip().replace('```json', '').replace('```', '').strip()
        
        # Convert the cleaned string into a Python dictionary
        parsed_data = json.loads(cleaned_json_string)
        
        return parsed_data

    except json.JSONDecodeError:
        # This handles cases where Gemini doesn't return perfect JSON
        raise HTTPException(status_code=500, detail="Failed to parse JSON response from AI model.")
    except Exception as e:
        # This handles other potential errors from the API call
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while communicating with the AI model.")