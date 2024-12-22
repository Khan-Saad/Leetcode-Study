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
filtered_df = questions.get_dataframe()
difficulty = ["All"]
@app.route("/random-question", methods=["GET"])
def random_question():
    #TODO This is messy

    given_difficulty = request.args.getlist('difficulty') 
    if given_difficulty != difficulty:
        filtered_df = questions_df if 'All' in difficulty or not difficulty else questions_df[questions_df['difficulty'].isin(difficulty)] # Fetch the question
    return questions.random_question(filtered_df) # Fetch the question


client = Client(api_key=key)

@app.route("/grade-response", methods=["POST"])
def grade_response():
    return grader.grade_response(request, client)
    
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)