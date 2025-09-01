import google.generativeai as genai
from flask import request, jsonify

from . import api_bp
from config import Config

try:
    if not Config.GEMINI_API_KEY:
        raise ValueError("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")
    
    genai.configure(api_key=Config.GEMINI_API_KEY)
    
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        safety_settings=[ # Less restrictive safety settings
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]
    )
    
except Exception as e:
    model = None
    print(f"🔴 Critical Error: Failed to initialize Gemini model: {e}")

SYSTEM_PROMPT = """
You are an expert prompt engineering assistant named 'Refiner'. 
Your sole purpose is to take a user's raw prompt and refine it into a clear, structured, and highly effective prompt for Large Language Models.

Follow these rules strictly:
1.  **Analyze Intent:** First, understand the user's core goal.
2.  **Add Structure:** Organize the prompt into logical sections like Role, Task, Context, Constraints, and Output Format.
3.  **Enhance Clarity:** Replace vague language with precise and specific terminology.
4.  **Be Concise:** Remove any conversational filler or unnecessary phrases.
5.  **Final Output:** Your response must ONLY be the refined prompt itself. Do NOT include any explanations, apologies, or conversational text.
"""

@api_bp.route('/refine', methods=['POST'])
def refine_prompt_route():
    """The main endpoint to refine a user's prompt."""
    if model is None:
        return jsonify({"error": "Model is not configured. Check server logs."}), 500

    data = request.get_json()
    if not data or "prompt" not in data or not data["prompt"].strip():
        return jsonify({"error": "The 'prompt' field is required and cannot be empty."}), 400

    original_prompt = data["prompt"]

    try:
        full_prompt = [SYSTEM_PROMPT, "---", "User's raw prompt:", original_prompt]
        
        response = model.generate_content(full_prompt)
        
        refined_text = response.text.strip()
        
        return jsonify({"refined_prompt": refined_text})

    except Exception as e:
        print(f"🔴 An error occurred during Gemini API call: {e}")
        return jsonify({"error": "Failed to refine prompt due to an internal server error."}), 500