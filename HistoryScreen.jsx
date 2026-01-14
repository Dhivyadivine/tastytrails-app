import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryScreen = ({ orderHistory = [] }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial' }}>
      
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px',
          border: 'none',
          background: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ← Home
      </button>

      <h2 style={{ marginBottom: '20px' }}>My Orders</h2>

      {orderHistory.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
          No orders found.
        </p>
      ) : (
        orderHistory.map((order, index) => {
          const totalAmount = Number(order.total || 0);

          return (
            <div
              key={order.id || index}
              style={{
                background: '#fff',
                padding: '15px',
                borderRadius: '15px',
                marginBottom: '15px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                borderLeft: `5px solid ${order.color || '#e23744'}`
              }}
            >
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <h4 style={{ margin: 0 }}>{order.name || 'Food Order'}</h4>
                <span style={{ fontWeight: 'bold', color: '#16a34a' }}>
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>

              <p style={{ fontSize: '11px', color: '#777', margin: '0 0 10px 0' }}>
                {order.date || '—'} | ID: {order.id || 'N/A'}
              </p>

              {/* Ordered Items */}
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item, idx) => {
                    const itemPrice = Number(item.price || 0);
                    const itemQty = Number(item.qty || 1);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          marginBottom: '4px'
                        }}
                      >
                        <span>{itemQty} x {item.name}</span>
                        <span>₹{(itemPrice * itemQty).toFixed(2)}</span>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                    Items not listed
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <p style={{ fontSize: '11px', color: '#555', margin: 0 }}>
                <b>Delivery Address:</b> {order.address || '—'}
              </p>
            </div>
          );
        })
      )}

      {/* Reset History */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => { 
            localStorage.removeItem('orderHistory'); 
            window.location.reload(); 
          }}
          style={{
            fontSize: '12px',
            color: '#999',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Reset All History Data
        </button>
      </div>
    </div>
  );
};

export default HistoryScreen;