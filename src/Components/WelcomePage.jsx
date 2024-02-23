import React from 'react';
import { Link } from 'react-router-dom';
import shoppingImg from "../assets/shopping.jpg";
import shoppingCartImg from "../assets/shoppingcart.jpg";

function WelcomePage() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{backgroundImage: `url(${shoppingImg})`}}>
      <div className="absolute top-0 left-0 w-full h-20 bg-slate-900 flex items-center justify-between px-4">
        <span className="text-white flex items-center">
          <img src={shoppingCartImg} alt="Shopping Cart" className="w-30 h-14 mr-1 rounded-full" />
          <span className="text-2xl font-bold">ShoppersStore</span>
        </span>
        <Link to="/register" className="text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none">Sign Up</Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to ShoppersStore</h1>
        <p className="text-white mb-4">Still not registered?</p>
        <p className="text-black font-bold mb-4">You are Missing out on fantastic deals, Click below to register and grab the deals!</p>
        <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Register</Link>
      </div>
    </div>
  );
}

export default WelcomePage;
