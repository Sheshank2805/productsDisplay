import React from 'react';
import { Link } from 'react-router-dom';

const NoProductsFound = () => {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">No products found</h1>
      <Link to="/home">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go to Home
      </button>
      </Link>
    </div>
  );
};

export default NoProductsFound;

