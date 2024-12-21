const axios = require("axios");

axios.get("http://127.0.0.1:5000/random-question", {
  headers: {
    "Origin": "http://localhost:3000",
  },
})
  .then(response => {
    console.log("Response:", response.data);
  })
  .catch(error => {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  });