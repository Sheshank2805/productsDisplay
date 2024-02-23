import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from "./NavigationBar"
import axios from 'axios';

function ProductsListing({ cartItems, setCartItems, filteredProducts, handleSearch }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filteredProducts]);

  const fetchProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products?limit=100`);
    const data = response.data;

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    if (filteredProducts.length === 0) {
      navigate('/no-products-found');
    }
  }, [filteredProducts, navigate]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= (filteredProducts.length || products.length) / 10 && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    switch (option) {
      case 'nameAZ':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameZA':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'priceLowHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    console.log("Sorted Products: ", sortedProducts); // Log sorted products
    return sortedProducts;
  };

  useEffect(() => {
    if (sortOption) {
      console.log("Sorting option selected: ", sortOption); // Log sorting option
      setProducts(sortProducts(sortOption));
    }
  }, [sortOption, filteredProducts]);

  return (
    <>
      <NavigationBar onSearch={handleSearch} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <select
            className="px-2 py-1 border border-gray-300 rounded-md mr-4"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="nameAZ">Name (A-Z)</option>
            <option value="nameZA">Name (Z-A)</option>
            <option value="priceLowHigh">Price (Low-High)</option>
            <option value="priceHighLow">Price (High-Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {(products.length > 0 ? products : filteredProducts).slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div key={prod.id} className="bg-white p-4 shadow-md rounded-lg">
                <Link to={`/product/${prod.id}`}>
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-full h-48 object-cover mb-4 cursor-pointer rounded-t-lg hover:scale-110 transition-transform duration-300"
                  />
                </Link>
                <div className="text-center">
                  <span className="font-semibold">{prod.title}</span>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 0L13.09 6.463 20 7.363l-3.75 6.802.718 7.067L10 16.545l-6.968 4.688.718-7.067L0 7.363l6.91-0.9L10 0z"/>
                    </svg>
                    <span className="ml-1">{prod.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-red-900 font-semibold">${prod.price}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300 focus:outline-none"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => selectPageHandler(page - 1)}
            disabled={page === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 focus:outline-none ${
              page === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ◀ Prev
          </button>
          {[...Array(Math.ceil((products.length || filteredProducts.length) / 10))].map((_, i) => {
            return (
              <button
                key={i}
                onClick={() => selectPageHandler(i + 1)}
                className={`px-4 py-2 ${page === i + 1 ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            onClick={() => selectPageHandler(page + 1)}
            disabled={page >= (products.length || filteredProducts.length) / 10}
            className={`bg-blue-500 text-white px-3 py-1 rounded-r-md text-sm md:px-4 md:py-2 md:text-base hover:bg-blue-600 focus:outline-none ${
              page >= (products.length || filteredProducts.length) / 10 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next ▶
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductsListing;
