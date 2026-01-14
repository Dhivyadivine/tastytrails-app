import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartCheckout = ({ basket, increaseQty, decreaseQty }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const coupons = [
    { code: 'TRYNEW', discount: 100, desc: 'Flat ₹100 off on your first order' },
    { code: 'TASTY50', discount: 50, desc: 'Extra ₹50 off on orders above ₹200' },
    { code: 'FREEDEL', discount: 34, desc: 'Free Delivery (Save ₹34)' },
    { code: 'GOLD20', discount: 80, desc: 'Special ₹80 off for Gold Members' },
    { code: 'FESTIVE', discount: 120, desc: 'Grand ₹120 off on mega orders' }
  ];

  const subtotal = basket.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  const packaging = subtotal > 0 ? 10 : 0;
  const platform = subtotal > 0 ? 12.50 : 0;
  const deliveryFee = (selectedCoupon?.code === 'FREEDEL') ? 0 : (subtotal > 0 ? 34 : 0);
  const gst = subtotal * 0.05;
  const totalBeforeDiscount = subtotal + packaging + platform + deliveryFee + gst;
  const discountAmount = selectedCoupon ? selectedCoupon.discount : 0;
  const grandTotal = Math.max(0, totalBeforeDiscount - discountAmount);

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial' }}>
      <button onClick={() => navigate('/menu')} style={{ border: 'none', background: 'none', color: '#e23744', fontWeight: 'bold', cursor: 'pointer' }}>← ADD MORE ITEMS</button>
      <h2 style={{ margin: '20px 0' }}>Your Cart</h2>

      <div style={{ background: '#fff', padding: '15px', borderRadius: '15px', marginBottom: '20px' }}>
        {basket.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>₹{item.price} x {item.qty || 1}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #16a34a', borderRadius: '6px', padding: '4px 8px' }}>
              <button onClick={() => decreaseQty(item.id)} style={{ border: 'none', background: 'none', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold' }}>{item.qty || 1}</span>
              <button onClick={() => increaseQty(item.id)} style={{ border: 'none', background: 'none', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      <h4 style={{ marginBottom: '10px' }}>Available Coupons</h4>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {coupons.map(cpn => (
          <div key={cpn.code} onClick={() => setSelectedCoupon(cpn)}
            style={{ minWidth: '150px', background: selectedCoupon?.code === cpn.code ? '#fff5f6' : '#fff',
              padding: '12px', borderRadius: '12px', border: selectedCoupon?.code === cpn.code ? '2px solid #e23744' : '1px solid #ddd',
              cursor: 'pointer', flexShrink: 0
            }}>
            <div style={{ fontWeight: 'bold', color: '#e23744' }}>{cpn.code}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>{cpn.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '120px' }}>
        <div style={rowStyle}><span>Item Total</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div style={rowStyle}><span>Packaging Charges</span><span>₹{packaging.toFixed(2)}</span></div>
        <div style={rowStyle}><span>Platform Fee</span><span>₹{platform.toFixed(2)}</span></div>
        <div style={rowStyle}><span>GST and Taxes</span><span>₹{gst.toFixed(2)}</span></div>
        <div style={rowStyle}><span>Delivery Fee</span><span style={{ textDecoration: selectedCoupon?.code === 'FREEDEL' ? 'line-through' : 'none' }}>₹34.00</span></div>
        {selectedCoupon && (
          <div style={{ ...rowStyle, color: '#16a34a', fontWeight: 'bold' }}>
            <span>Coupon Discount ({selectedCoupon.code})</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <hr style={{ border: 'none', borderTop: '1px dashed #ddd', margin: '15px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
          <span>To Pay</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '20px', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
        <input type="number" placeholder="Enter 10-digit Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box' }} />
        <button onClick={() => {
          if(phone.length === 10){
            navigate('/success', { state: { totalAmount: grandTotal, address: '123 Main Street, City', basket } });
          } else { alert("Please enter a valid phone number"); }
        }}
          style={{ width: '100%', padding: '15px', background: '#e23744', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
          PROCEED TO PAY • ₹{grandTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

const rowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#555' };
export default CartCheckout;