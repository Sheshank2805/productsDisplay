import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ProductsListing from './Components/ProductsListing';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import axios from 'axios';
import Registration from './Components/Registration';
import LoginScreen from './Components/LoginScreen';
import WelcomePage from './Components/WelcomePage';
import NoProductsFound from './Components/NoProducts';

function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=100');
      const data = response.data;
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path='/register' element={<Registration/>}/>
        <Route path="/login" element={<LoginScreen/>} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} handleSearch={handleSearch} />}
        />
        <Route
          path="/home"
          element={<ProductsListing cartItems={cartItems} setCartItems={setCartItems} filteredProducts={filteredProducts} handleSearch={handleSearch}/>}
        />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/no-products-found" element={<NoProductsFound />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;