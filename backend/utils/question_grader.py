from flask import jsonify


def grade_response(request, client):
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
            {"role": "user", "content": "Grade this approach and provide constructive feedback. Rate it on a scale of 1 to 10"},
        ]

        # Use the client to call the Chat API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Or "gpt-3.5-turbo" if using GPT-3.5
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