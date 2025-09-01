import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

class Config:
    """Holds configuration variables for the application."""
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")