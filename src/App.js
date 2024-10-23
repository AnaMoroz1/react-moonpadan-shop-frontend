import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page.components/Home';
import ShoppingCartController from './services/ShoppingCartController';
import Footer from './page.components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navmen from './page.components/Navmen';
import { CartProvider }  from './services/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/Moon.css'; 

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user?.roles?.includes("ROLE_MODERATOR") || false);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN") || false);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser({});
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
  };

return (
  <CartProvider>
  <Router>
  <div className="wrapper">
    <Navmen 
        currentUser={currentUser} 
        logOut={logOut}
        showModeratorBoard={showModeratorBoard}
        showAdminBoard={showAdminBoard}
        />
  
  <main className="content"> {/* We use the .content class */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ShoppingCartController show= "products"/>} /> 
            <Route path="/cart" element={<ShoppingCartController show="cart"/>}  />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
);
}

export default App;
