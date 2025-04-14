import React from 'react';
import "./HomePage.css";
import coffeeeGif from '../images/pepe_coffee.gif';


function HomePage() {
  return (
    <div class='homepage'>
        <div class='homepage-center'>
            get your coffee for the day <img src={coffeeeGif} alt="coffeee"></img>
        </div>
    </div>
  );
}

export default HomePage;
