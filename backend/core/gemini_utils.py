import requests
from django.conf import settings

GEMINI_API_KEY = settings.GEMINI_API_KEY
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/{model}:generateContent?key={api_key}"
GEMINI_MODEL = "gemini-2.0-flash"  # Corrected model name, no 'models/' prefix

def get_gemini_response(prompt):
    if not GEMINI_API_KEY:
        return {"error": "GEMINI_API_KEY not set in environment."}

    # Prepend tech-only instruction and ask for plain text, no markdown
    instruction = (
    )
    teaching_prompt = f"{instruction}\nUser: {str(prompt)}"

    url = GEMINI_API_URL.format(model=GEMINI_MODEL, api_key=GEMINI_API_KEY)
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {"parts": [{"text": teaching_prompt}]}
        ]
    }
    try:
        response = requests.post(url, headers=headers, json=data, timeout=15)
        response.raise_for_status()
        result = response.json()
        return {
            "text": result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        }
    except Exception as e:
        return {"error": str(e)} 