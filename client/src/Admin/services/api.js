// src/services/api.js

import axios from "axios";

// Create an Axios instance with a base URL for all requests
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: This runs before any request is sent.
// It attaches the JWT to the Authorization header if it exists.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Add the token to the headers for every authenticated request
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle any errors that occur during request setup
    return Promise.reject(error);
  }
);

// Response Interceptor: This runs after a response is received.
// It checks for a 401 Unauthorized error, which indicates an expired token.
api.interceptors.response.use(
  (response) => {
    // If the request was successful (status 2xx), just return the response
    return response;
  },
  (error) => {
    // Check if the server responded with a 401 status code
    if (error.response && error.response.status === 401) {
      // This is the core logic for handling token expiration:

      // 1. Immediately remove the expired token from local storage.
      localStorage.removeItem("token");

      // 2. Redirect the user to the login page.
      // Using window.location.href ensures a full page reload, clearing any stale state.
      window.location.href = "/login";
    }

    // For any other errors, pass them along to be handled by the component's catch block.
    return Promise.reject(error);
  }
);

export default api;
