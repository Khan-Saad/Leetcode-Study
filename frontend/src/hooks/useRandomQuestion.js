import { useState, useEffect } from 'react';
import axios from 'axios';

export function useRandomQuestion() {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  const fetchQuestion = async (difficulty = []) => {
    try {
      const query = difficulty.length ? `?difficulty=${difficulty.join('&difficulty=')}` : '';
      const response = await axios.get(`http://127.0.0.1:5000/random-question${query}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setQuestion(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch question.");
      console.error("Error fetching question:", err.message);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return { question, error, refetch: fetchQuestion };
}