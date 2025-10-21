import React, { useState } from 'react';
import './App.css';

function App() {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shopping Cart</h1>

        <div className="container">
          <div className="product-list">
            <h2>Products</h2>
            {products.map(product => (
              <div key={product.id} className="product-item">
                <span>{product.name} - ${product.price}</span>
                <button onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            ))}
          </div>

          <div className="shopping-cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
                <h3>Total: ${getTotal().toFixed(2)}</h3>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
