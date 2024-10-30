import React,  {createContext, useState, useContext}  from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [currentUser, setCurrentUser] =useState (AuthService.getCurrentUser());
    
    const login = async (username, password) => {
        const user = await AuthService.login(username, password);
        setCurrentUser(user);
};
 const logout = () => { 
    AuthService.logout();
    setCurrentUser(null);
 };

 return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
    { children}
    </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };  