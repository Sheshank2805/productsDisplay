import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingCart } from 'react-icons/fi'; 
const NavigationBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); 

  const handleChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); 
    setSearchQuery('');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold mb-4 md:mb-0">Home</Link>
        
       
        <div className="block md:hidden">
          <button className="text-white focus:outline-none" onClick={() => setShowMenu(!showMenu)}>
            <FiMenu size={24} />
          </button>
        </div>

        
        {showMenu && (
          <div className="md:hidden w-full mt-4">
            <Link to="/register"><button onClick={() => setShowMenu(false)} className="block text-white bg-gray-600 py-2 px-4 rounded-md text-center w-full mb-2">Register</button></Link>
            <Link to="/login"><button onClick={() => setShowMenu(false)} className="block text-white bg-gray-600 py-2 px-4 rounded-md text-center w-full">Login</button></Link>
          </div>
        )}

        
        <div className="hidden md:flex md:ml-6 md:flex-grow">
          <Link to="/register"><button onClick={() => setShowMenu(false)} className="text-white bg-gray-600 py-2 px-4 rounded-md mr-4">Register</button></Link>
          <Link to="/login"><button onClick={() => setShowMenu(false)} className="text-white bg-gray-600 py-2 px-4 rounded-md">Login</button></Link>
        </div>

        
        <form onSubmit={handleSubmit} className="flex ml-4 md:ml-6 md:flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange} 
            className="mr-2 px-4 py-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="text-white bg-blue-500 px-4 py-2 rounded-md flex items-center justify-center"
          >
            <FiSearch size={20} />
          </button>
        </form>
        
        
        <div className="flex items-center">
          <Link to="/cart" className="text-white text-xl font-bold ml-4">
            <FiShoppingCart size={35} />Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
