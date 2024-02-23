import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); 
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <Link to="/home" className="text-white text-xl font-bold mb-2 md:mb-0">Home</Link>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange} 
            className="mr-4 px-4 py-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
        <Link to="/cart" className="text-white text-xl font-bold ml-4">Cart</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
