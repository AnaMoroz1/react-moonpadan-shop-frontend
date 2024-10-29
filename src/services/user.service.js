import axios from "axios";
import authHeader from "./auth-header";



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/test/";

// User service with board access methods
const getPublicContent = () => {
    return axios.get(`${API_URL}all`);
};

const getUserBoard = () => {
    return axios.get(`${API_URL}user`, { headers: authHeader() });
};

const getModeratorBoard = () => {

    //localhost:8080/api/test/mod
    return axios.get(`${API_URL}mod`, {headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(`${API_URL}admin`, {headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard, 
    getAdminBoard,
};

export default UserService;