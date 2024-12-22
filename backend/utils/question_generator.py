from flask import jsonify
import pandas as pd
import random
import os

def get_dataframe():
    csv_path = os.path.join(os.path.dirname(__file__), "leetcode_formatted.csv")
    return pd.read_csv(csv_path)

def _get_random_question(questions_df):    
    # Select a random question from the DataFrame
    random_index = random.randint(0, len(questions_df) - 1)
    # random_index = 2
    question = questions_df.iloc[random_index]
    return {
        "id": int(question["id"]),  # Add an ID for reference
        "title": question["title"],
        "difficulty": question["difficulty"],
        "description": question["formatted_description"],
        "examples": question["examples_constraints"],
    }

def random_question(questions_df):
    question = _get_random_question(questions_df)
    response = jsonify(question)
    return response