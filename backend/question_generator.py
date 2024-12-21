import pandas as pd
import random

def get_random_question(questions_df):
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