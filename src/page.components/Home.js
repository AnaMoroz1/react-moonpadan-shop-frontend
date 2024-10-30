import React from 'react';
import {useNavigate } from 'react-router-dom';
import '../styles/Moon.css'
function Home() {
  const navigate = useNavigate(); // React Router hook navigacijai

  return (
    <div>
      <header>
        <div className="welcome-banner">
          <h1>Welcome to Moonpadan Shop</h1>
        </div>
        <div className="image-logo">
          <img src="logo.webp" alt="Logo" className="centered-image" />
        </div>
      </header>
      
      <main>
        <div className="main-banner">
          <div className="image-container">
            <img src="background.webp" alt="perl" className="background-image" />
          </div>
          <div className="text-overlay">
            <h2>Beauty is everywhere a welcome guest.</h2>
            <p>Johann Wolfgang von Goethe</p>
            <p>Discover the magic of professional lash extensions with our high-quality products and services.</p>
            <button onClick={() => navigate('/products')}>
              Shop Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;

