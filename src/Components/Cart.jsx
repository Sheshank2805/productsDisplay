import React from 'react';
import NavigationBar from "./NavigationBar"

const Cart = ({ cartItems }) => {
  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
    <NavigationBar/>
    <div className="cart p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex flex-col md:flex-row items-center mb-4">
            <img src={item.thumbnail} alt={item.title} className="w-56 h-55 md:w-48 md:h-48 mr-4 md:mr-8 mb-4 md:mb-0 lg:w-96 h-96 rounded-lg hover:scale-90 transition-transform duration-300" />
            <div>
              <p className="font-semibold">{item.title}</p> 
              <p className="text-red-400">${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total Cost: ${totalCost.toFixed(2)}</p> {/* Display total cost */}
    </div>
    </>
  );
};

export default Cart;
