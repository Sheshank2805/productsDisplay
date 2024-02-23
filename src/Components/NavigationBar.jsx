import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); 
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/home" className="text-white text-xl font-bold mb-4 md:mb-0">Home</Link>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center md:ml-6 md:flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange} 
            className="mr-2 px-4 py-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
        <div className="flex items-center">
          <Link to="/cart" className="text-white text-xl font-bold ml-4">Cart</Link>
          <button onClick={handleLogout} className="text-white text-xl font-bold ml-4 bg-gray-600 py-2 px-4 rounded-md mt-1">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
