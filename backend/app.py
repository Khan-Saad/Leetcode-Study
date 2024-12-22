from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from openai import Client
import os
from dotenv import load_dotenv
import utils.question_generator as questions
import utils.question_grader as grader

app = Flask(__name__)
# Update CORS configuration to allow React
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Load environment variables from .env file
load_dotenv()
key = os.getenv("OPENAI_API_KEY")
questions_df = questions.get_dataframe()
client = Client(api_key=key)

@app.route("/random-question", methods=["GET"])
def random_question():
    #TODO This is terrible fix this. 
    difficulty = request.args.getlist('difficulty')
    category = request.args.getlist('category')
    difficulty = [d.capitalize() for d in difficulty]  # Capitalize first letters
    print(f"Difficulty: {difficulty}, Category: {category}")
    filtered_df = questions_df
    if 'All' not in difficulty and difficulty:
        filtered_df = filtered_df[filtered_df['difficulty'].isin(difficulty)]
    if 'All' not in category and category:
        filtered_df = filtered_df[filtered_df['topic_tags'].apply(lambda x: any(cat in x for cat in category))]
    return questions.random_question(filtered_df) # Fetch the question

@app.route("/grade-response", methods=["POST"])
def grade_response():
    return grader.grade_response(request, client)
    
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)