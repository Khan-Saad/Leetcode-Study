from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import os
from openai import Client
import os
from dotenv import load_dotenv
import utils.question_generator as questions

# Load environment variables from .env file
load_dotenv()
key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

# Update CORS configuration to allow React
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Load environment variables from .env file
load_dotenv()
key = os.getenv("OPENAI_API_KEY")

# Load the questions CSV
questions_df = questions.get_dataframe()

@app.route("/random-question", methods=["GET"])
def random_question():
    return questions.random_question(questions_df) # Fetch the question

client = Client(api_key=key)

@app.route("/grade-response", methods=["POST"])
def grade_response():
    try:
        data = request.json
        print("Received data:", data)  # Debug log

        question_title = data.get("questionTitle")
        user_response = data.get("userResponse")

        if not user_response:
            return jsonify({"error": "Response cannot be empty"}), 400

        # Prepare the messages payload
        messages = [
            {"role": "system", "content": "You are a coding interview expert."},
            {"role": "user", "content": f"Problem Description: {question_title}"},
            {"role": "user", "content": f"User's Approach: {user_response}"},
            {"role": "user", "content": "Grade this approach and provide constructive feedback. Rate it on a scale of 1 to 10."},
        ]

        # Use the client to call the Chat API
        response = client.chat.completions.create(
            model="gpt-4",  # Or "gpt-3.5-turbo" if using GPT-3.5
            messages=messages,
            max_tokens=200,
            temperature=0,  # Lower temperature for deterministic responses
        )

        # Extract feedback from the response
        feedback = response.choices[0].message.content.strip()

        return jsonify({"feedback": feedback})

    except Exception as e:
        print("Error:", str(e))  # Log the exact error
        return jsonify({"error": "An unexpected error occurred. Please try again."}), 500
    
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)