import React from 'react';
import {useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // React Router hook navigacijai

  return (
    <div>
      <header>
      <div class="image-logo">
        <img src="IMG_1664-2.PNG" alt="Logo" class="centered-image"/>
        <p>Welcome to Moonpadan Shop</p>
        </div>
        
      </header>

       {/* Pagrindinė reklaminė juosta */}
      <main>
      <div className="main-banner">
        <div class="fade-in-element">
          <h2>Moonpadan – Magic of Beauty</h2>
          
          <p>Discover the magic of professional lash extensions with our high-quality products and services.</p>
            <button onClick={() => navigate('/products')}>
              Shop Now      {/* Mygtukas nukreipia į /products */}
            </button> 
            </div>
        </div>
        <div class="image-container">
            <img src="background.webp" alt="perl" class="centered-image"/>
        </div>
      </main>
   
    </div>
  );
}

export default Home;

