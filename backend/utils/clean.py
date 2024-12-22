import pandas as pd

def clean_dataset(input_csv, output_csv):
    """
    Cleans the dataset by removing rows with null values in
    the 'description', 'difficulty', or 'title' columns.

    Args:
        input_csv (str): Path to the input CSV file.
        output_csv (str): Path to save the cleaned CSV file.
    """
    try:
        # Load the dataset
        df = pd.read_csv(input_csv)

        # Display initial dataset information
        print("Initial Dataset Info:")
        print(df.info())

        # Remove rows with null values in the specified columns
        cleaned_df = df.dropna(subset=['problem_description', 'difficulty', 'title'])

        # Display cleaned dataset information
        print("\nCleaned Dataset Info:")
        print(cleaned_df.info())

        # Save the cleaned dataset to a new CSV file
        cleaned_df.to_csv(output_csv, index=False)
        print(f"\nCleaned dataset saved to: {output_csv}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Paths to input and output CSV files
input_csv_path = "leetcode.csv"       # Replace with the path to your dataset
output_csv_path = "leetcode_cleaned.csv"  # Path to save the cleaned dataset

# Call the function
clean_dataset(input_csv_path, output_csv_path)