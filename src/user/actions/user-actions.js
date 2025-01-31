import axios from "axios";

// Axios instance for API calls (modify baseURL as needed)
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post("register", userData);
  return response.data; // Return user data or token
};

// Login an existing user
export const loginUser = async (credentials) => {
  const response = await api.post("login", credentials);
  return response.data; // Return user data or token
};
