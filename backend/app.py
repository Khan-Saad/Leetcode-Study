from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import os
from openai import Client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
key = os.getenv("OPENAI_API_KEY")

# Access the OpenAI API key from the environment

app = Flask(__name__)

# Update CORS configuration to allow React
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Load environment variables from .env file
load_dotenv()
key = os.getenv("OPENAI_API_KEY")

# Dynamically determine the absolute path to leetcode.csv
csv_path = os.path.join(os.path.dirname(__file__), "leetcode.csv")

# Load the questions CSV
questions_df = pd.read_csv(csv_path)


def get_random_question():
    # Filter DataFrame to include only rows with valid difficulties, titles, and descriptions
    valid_questions_df = questions_df[
        questions_df["difficulty"].notna()
        & (questions_df["difficulty"] != "Unknown")
        & questions_df["title"].notna()
        & questions_df["problem_description"].notna()
    ]
    
    if valid_questions_df.empty:
        return {
            "title": "No Questions Available",
            "difficulty": "N/A",
            "description": "All questions have invalid or missing data.",
        }

    # Select a random question from the filtered DataFrame
    random_index = random.randint(0, len(valid_questions_df) - 1)
    question = valid_questions_df.iloc[random_index]
    return {
        "id": int(question["id"]),  # Add an ID for reference
        "title": question["title"],
        "difficulty": question["difficulty"],
        "description": question["problem_description"],
    }


@app.route("/random-question", methods=["GET"])
def random_question():
    question = get_random_question()
    response = jsonify(question)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response

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

        # if question_id is None:
        #     return jsonify({"error": "Question ID is required"}), 400

        # Fetch the corresponding question based on the provided questionId
        # try:
        #     question = questions_df.iloc[question_id]
        #     question_description = question["problem_description"]
        # except IndexError:
        #     return jsonify({"error": "Invalid question ID"}), 404

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