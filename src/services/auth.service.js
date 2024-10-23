import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_URL + "signup", {
  
        username, 
        email, 
        password,
   });
   return response.data;
  }catch (error) {
    console.error ("Registartion error:", error);
    throw error;
  }
};

const login = async (username, password) => {
  try {
const response = await axios.post(API_URL + "signin", {
              username,
              password,
            });
      
        console.log("We got Response: ", response );
        if (response.data.accessToken) {
         
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      } catch(error) {
        console.error("Login error: ", error);
        throw error;  // Error handling
      
      }};
// User logout
  const logout = () => {
    localStorage.removeItem("user");
  };
// Get the current user
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
// Export an object with methods
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  };

  export default AuthService;
