import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI")

try:
    # Initialize the client. The client is thread-safe and can be shared.
    client = MongoClient(MONGO_URI)
    # Ping the server to check the connection
    client.admin.command('ping')
    print("✅ MongoDB connection successful.")
except (ConnectionFailure, AttributeError) as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    # Exit or handle the error appropriately if the database is critical
    client = None

# Get a handle to the specific database
db = client.hackrice_db

# Get handles to the collections we will be using
# A 'user' can have many 'transactions'.
# We'll use the Auth0 user_id as the primary key (_id) for the users collection.
users_collection = db.users
transactions_collection = db.transactions

# --- REAL DATABASE FUNCTIONS ---

def save_google_credentials_to_db(user_id: str, credentials_info: dict):
    """
    Saves or updates a user's Google credentials in the 'users' collection.
    We use upsert=True to create the user document if it doesn't exist.
    """
    users_collection.update_one(
        {"_id": user_id},
        {"$set": {"google_credentials": credentials_info}},
        upsert=True
    )
    print(f"--- REAL DB: Saved Google credentials for user: {user_id} ---")
    return {"status": "success"}

def get_google_credentials_from_db(user_id: str) -> dict | None:
    """
    Fetches a user's Google credentials from the 'users' collection.
    """
    user_document = users_collection.find_one({"_id": user_id})
    print(f"--- REAL DB: Fetched credentials for user: {user_id} ---")
    if user_document and "google_credentials" in user_document:
        return user_document["google_credentials"]
    return None

def save_transactions_to_db(user_id: str, transactions: list):
    """
    Saves a list of parsed transactions to the 'transactions' collection.
    Each transaction is linked to the user via the user_id field.
    """
    if not transactions:
        return {"status": "no transactions to save", "saved_count": 0}

    # Add the user_id to each transaction document
    for tx in transactions:
        tx['user_id'] = user_id
    
    result = transactions_collection.insert_many(transactions)
    print(f"--- REAL DB: Saved {len(result.inserted_ids)} transactions for user: {user_id} ---")
    return {"status": "success", "saved_count": len(result.inserted_ids)}

def get_transactions_for_user(user_id: str) -> list:
    """
    Fetches all transaction documents for a specific user from MongoDB.
    """
    # The find() method returns a cursor, so we convert it to a list.
    # We exclude the '_id' field from the output for cleaner JSON.
    transactions = list(transactions_collection.find({"user_id": user_id}, {'_id': 0}))
    print(f"--- REAL DB: Fetched {len(transactions)} transactions for user: {user_id} ---")
    return transactions

def get_spending_summary(user_id: str) -> dict:
    """
    Calculates a spending summary for a user using MongoDB's aggregation pipeline.
    """
    pipeline = [
        {
            "$match": {"user_id": user_id} # Filter for the current user
        },
        {
            "$group": {
                "_id": "$category", # Group transactions by their category
                "total_spent": {"$sum": "$totalAmount"}, # Sum the amounts in each group
                "count": {"$sum": 1} # Count the number of transactions in each group
            }
        },
        {
            "$sort": {"total_spent": -1} # Sort by the highest spending categories first
        }
    ]
    
    summary_cursor = transactions_collection.aggregate(pipeline)
    summary_list = list(summary_cursor)
    
    # Calculate overall total
    total_spending = sum(item['total_spent'] for item in summary_list)

    print(f"--- REAL DB: Calculated spending summary for user: {user_id} ---")
    
    return {
        "total_spending": round(total_spending, 2),
        "category_breakdown": summary_list
    }

