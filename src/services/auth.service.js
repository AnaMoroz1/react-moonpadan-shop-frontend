import axios from "axios";

// Set the API URL from environment variables or use a default value
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/auth/";

// Registration function
const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}signup`, { username,  email, password,});
   return response.data;   // Assuming response.data contains success confirmation or message
  }catch (error) {
    console.error ("Registartion error:", error.response ? error.response.data : error);
    throw error;  // Propagate error to be caught in calling component
  }
};

// Login function
const login = async (username, password) => {
  try {
        const response = await axios.post(`${API_URL}signin`, {username, password});
           
         // Ensure that the response contains an access token  
        if (response.data.accessToken) {
         localStorage.setItem("user", JSON.stringify(response.data));  // Store user data in localStorage
         return response.data;  // Return the entire response data for further use
        }else{
          throw new Error("Login failed: No access token returned.");
        }
      } catch(error) {
        console.error("Login error: ", error.response ? error.response.data : error);
        throw error;  // Propagate the error for handling in the component
      
      }};
// User logout
  const logout = () => {
    localStorage.removeItem("user");  // Remove user data from localStorage
  };
// Get the current user function
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
  };

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!getCurrentUser();  // Return true if user data exists
};

// Export an object with methods
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
  };

  export default AuthService;
