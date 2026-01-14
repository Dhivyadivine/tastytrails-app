import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FinalSuccess = ({ saveOrderToHistory, clearBasket }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const address = location.state?.address || 'Address not available';
  const basket = location.state?.basket || [];

  const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString();

  useEffect(() => {
    if(!totalAmount) return;
    saveOrderToHistory?.({
      id: orderId,
      name: "Tasty Trails",
      total: totalAmount,
      address,
      date: orderDate,
      items: basket,
      status: "Paid",
      color: "#e23744"
    });
    clearBasket && clearBasket();
  }, []);

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f4f4f4', fontFamily:'Arial' }}>
      <div style={{ background:'#fff', width:'100%', maxWidth:420, borderRadius:18, padding:24, boxShadow:'0 10px 30px rgba(0,0,0,0.1)' }}>
        <div className="tick-circle">✓</div>
        <h2 style={{ textAlign:'center', marginTop:12 }}>Order Successful</h2>
        <p style={{ textAlign:'center', color:'#16a34a', fontWeight:'bold' }}>Thank you for ordering with us!</p>

        <div style={{ borderTop:'1px dashed #ddd', borderBottom:'1px dashed #ddd', padding:'16px 0', margin:'20px 0' }}>
          <p><b>Order ID:</b> {orderId}</p>
          <p><b>Date:</b> {orderDate}</p>
          <p style={{ marginTop:10, fontSize:16 }}><b>Total Paid:</b> ₹{totalAmount}</p>
        </div>

        <p style={{ color:'#e23744', fontWeight:'bold', fontSize:13 }}>DELIVERING TO</p>
        <p style={{ color:'#555', lineHeight:1.6 }}>{address}</p>

        <button onClick={() => navigate('/')} style={{ marginTop:24, width:'100%', padding:'14px', background:'#e23744', color:'#fff', border:'none', borderRadius:14, fontWeight:'bold', cursor:'pointer' }}>Go Home</button>

        <style>{`
          .tick-circle {
            width:80px; height:80px; background:#16a34a; border-radius:50%;
            margin:0 auto; display:flex; align-items:center; justify-content:center;
            color:#fff; font-size:40px; animation:pop 0.6s ease-out;
          }
          @keyframes pop {
            0% { transform: scale(0); }
            80% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FinalSuccess;