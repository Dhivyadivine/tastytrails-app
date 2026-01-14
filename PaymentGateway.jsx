import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = ({ basket, address }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('UPI');
  const [selectedApp, setSelectedApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const totalAmount = basket.reduce((s, i) => s + i.price, 0) + 30;

  const upiApps = [
    { id: 'gpay', name: 'Google Pay'},
    { id: 'phonepe', name: 'PhonePe' },
    { id: 'paytm', name: 'Paytm' },
    { id: 'bhim', name: 'BHIM' }
  ];

  const walletApps = [
    { id: 'paytm', name: 'Paytm' },
    { id: 'mobikwik', name: 'Mobikwik' },
    { id: 'freecharge', name: 'FreeCharge' },
    { id: 'ola', name: 'Ola Money' },
    { id: 'amazon', name: 'Amazon Pay' }
  ];

  const handleConfirmPayment = () => {
    // ❗ FIXED: Passing totalAmount and address to success screen
    const navigationState = { state: { totalAmount, address } };

    if (method === 'UPI' && (selectedApp || upiId)) {
      alert(`Redirecting to ${selectedApp || 'UPI'} for payment of ₹${totalAmount}${upiId ? ` with UPI ID: ${upiId}` : ''}`);
      navigate('/success', navigationState);
    } else if (method === 'CARD' && cardNumber && expiry && cvv && cardHolderName) {
      alert(`Processing card payment for ₹${totalAmount}`);
      navigate('/success', navigationState);
    } else if (method === 'Wallets' && selectedWallet) {
      alert(`Redirecting to ${selectedWallet} wallet for payment of ₹${totalAmount}`);
      navigate('/success', navigationState);
    } else if (method === 'Cash on Delivery') {
      navigate('/success', navigationState);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div style={{ background: '#f4f7fa', minHeight: '100vh', fontFamily: 'Roboto, sans-serif', padding: '20px 5%', color: '#333' }}>
      <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'none', fontWeight: 'bold', color: '#007bff', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h2 style={{ margin: '20px 0', textAlign: 'center', color: '#2c3e50' }}>Secure Payment Gateway</h2>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#27ae60', margin: '0 0 30px 0', textAlign: 'center', fontSize: '24px' }}>Total Payable: ₹{totalAmount}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ border: '1px solid #e1e8ed', borderRadius: '12px', padding: '20px', background: '#fafbfc' }}>
            <label onClick={() => setMethod('UPI')} style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}>
              <input type="radio" checked={method === 'UPI'} readOnly style={{ marginRight: '10px' }} /> UPI Payment
            </label>
            {method === 'UPI' && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
                  {upiApps.map(app => (
                    <div key={app.id} onClick={() => setSelectedApp(app.id)} style={{ textAlign: 'center', cursor: 'pointer', padding: '15px', border: selectedApp === app.id ? '2px solid #007bff' : '1px solid #e1e8ed', borderRadius: '10px', transition: 'border 0.3s' }}>
                      <div style={{ fontSize: '28px' }}>{app.icon}</div>
                      <div style={{ fontSize: '12px', marginTop: '8px', fontWeight: '500' }}>{app.name}</div>
                    </div>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Enter UPI ID (e.g., name@okaxis)" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)} 
                  style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} 
                />
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e1e8ed', borderRadius: '12px', padding: '20px', background: '#fafbfc' }}>
            <label onClick={() => setMethod('CARD')} style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}>
              <input type="radio" checked={method === 'CARD'} readOnly style={{ marginRight: '10px' }} /> Debit / Credit Card
            </label>
            {method === 'CARD' && (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Card Holder Name" 
                  value={cardHolderName} 
                  onChange={(e) => setCardHolderName(e.target.value)} 
                  style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} 
                />
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                  style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} 
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={expiry} 
                    onChange={(e) => setExpiry(e.target.value)} 
                    style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} 
                  />
                  <input 
                    type="password" 
                    placeholder="CVV" 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} 
                  />
                </div>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e1e8ed', borderRadius: '12px', padding: '20px', background: '#fafbfc' }}>
            <label onClick={() => setMethod('Wallets')} style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}>
              <input type="radio" checked={method === 'Wallets'} readOnly style={{ marginRight: '10px' }} /> Digital Wallets
            </label>
            {method === 'Wallets' && (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {walletApps.map(wallet => (
                  <label key={wallet.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: selectedWallet === wallet.id ? '2px solid #007bff' : '1px solid #e1e8ed', borderRadius: '8px', transition: 'border 0.3s' }}>
                    <input 
                      type="radio" 
                      name="wallet" 
                      value={wallet.id} 
                      checked={selectedWallet === wallet.id} 
                      onChange={() => setSelectedWallet(wallet.id)} 
                      style={{ marginRight: '10px' }} 
                    />
                    {wallet.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e1e8ed', borderRadius: '12px', padding: '20px', background: '#fafbfc' }}>
            <label onClick={() => setMethod('Cash on Delivery')} style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}>
              <input type="radio" checked={method === 'Cash on Delivery'} readOnly style={{ marginRight: '10px' }} /> Cash on Delivery
            </label>
          </div>
        </div>

        <button 
          onClick={handleConfirmPayment} 
          style={{ width: '100%', padding: '20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', marginTop: '30px', fontSize: '18px', cursor: 'pointer', transition: 'background 0.3s' }}
          onMouseOver={(e) => e.target.style.background = '#0056b3'}
          onMouseOut={(e) => e.target.style.background = '#007bff'}
        >
          Confirm & Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;