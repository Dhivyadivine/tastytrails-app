import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePortal from './components/HomePortal';
import RestaurantMenu from './components/RestaurantMenu';
import CartCheckout from './components/CartCheckout';
import PaymentGateway from './components/PaymentGateway';
import FinalSuccess from './components/FinalSuccess';
import HistoryScreen from './components/HistoryScreen';

function App() {
  const [activeResto, setActiveResto] = useState(null);
  const [basket, setBasket] = useState([]);
  const [address, setAddress] = useState("Search or Click Map for Address");
  
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const addToBasket = (item) => {
    setBasket((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, cartId: Date.now() }];
    });
  };

  const saveOrderToHistory = (newOrder) => {
    setOrderHistory((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('orderHistory', JSON.stringify(updated));
      return updated;
    });
  };

  // Ensure you pass the function as a prop to the component
<Route 
  path="/menu" 
  element={<RestaurantMenu activeResto={activeResto} basket={basket} addToBasket={addToBasket} />} 
/>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePortal setActiveResto={setActiveResto} basket={basket} address={address} setAddress={setAddress} />} />
        <Route path="/menu" element={<RestaurantMenu activeResto={activeResto} basket={basket} addToBasket={addToBasket} />} />
        <Route path="/cart" element={<CartCheckout basket={basket} setBasket={setBasket} address={address} setAddress={setAddress} />} />
        <Route path="/payment" element={<PaymentGateway basket={basket} address={address} />} />
        <Route path="/success" element={<FinalSuccess address={address} activeResto={activeResto} basket={basket} saveOrderToHistory={saveOrderToHistory} clearBasket={() => setBasket([])} />} />
        <Route path="/history" element={<HistoryScreen orderHistory={orderHistory} />} />
      </Routes>
    </Router>
  );
}
export default App;