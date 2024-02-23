import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/product/${id}`);
        const data = response.data;
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavigationBar/>
    <div className="container mx-auto">
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md hover:scale-110 transition-transform duration-300">
        <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover mb-4 " />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-red-900 font-semibold">${product.price}</p>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
