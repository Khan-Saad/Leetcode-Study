from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import os
from openai import Client
import os
from dotenv import load_dotenv
import utils.question_generator as questions
import utils.question_grader as grader

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
    return grader.grade_response(request, client)
    
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)