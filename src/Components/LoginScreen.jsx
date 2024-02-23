import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingImg from "../assets/shopping.jpg"

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin =async(event) => {
    event.preventDefault();
    console.log(formData.name,formData.password)

    try {
      
      const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.name,
        password: formData.password,
      })
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Invalid Username or password');
      navigate("/register");
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
      

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url(" + shoppingImg +")" }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Login Form</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

