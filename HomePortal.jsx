import React, { useState, useEffect } from 'react'; // FIXED: Added useEffect import
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, LayersControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// All 10 Restaurants Restored
const restaurants = [
  { id: 1, name: "Annapoorna Veg", rating: 4.8, time: "20 min", color: "#4e45d5", type: "Veg" },
  { id: 2, name: "Al Faisal Biryani", rating: 4.5, time: "30 min", color: "#e23744", type: "Non-Veg" },
  { id: 3, name: "Cream Stone", rating: 4.7, time: "15 min", color: "#db2777", type: "Veg" },
  { id: 4, name: "Burger King", rating: 4.2, time: "25 min", color: "#f59e0b", type: "Non-Veg" },
  { id: 5, name: "Sangeetha", rating: 4.6, time: "20 min", color: "#10b981", type: "Veg" },
  { id: 6, name: "KFC", rating: 4.3, time: "35 min", color: "#ef4444", type: "Non-Veg" },
  { id: 7, name: "Pizza Hut", rating: 4.1, time: "35 min", color: "#b91c1c", type: "Non-Veg" },
  { id: 8, name: "Madras Coffee", rating: 4.9, time: "10 min", color: "#78350f", type: "Veg" },
  { id: 9, name: "Copper Chimney", rating: 4.4, time: "40 min", color: "#1e3a8a", type: "Non-Veg" },
  { id: 10, name: "Aasife Biryani", rating: 4.4, time: "30 min", color: "#431407", type: "Non-Veg" }
];

// Handles map flying and clicking to update address
function MapHandler({ center, setPosition, setAddress }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16, { animate: true, duration: 1.5 });
    }
  }, [center, map]);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`);
        const data = await res.json();
        if (data.display_name) setAddress(data.display_name); // Updates address on click
      } catch (err) { console.error("Location error:", err); }
    }
  });
  return null;
}

const HomePortal = ({ setActiveResto, basket = [], address, setAddress }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [position, setPosition] = useState([11.0168, 76.9558]); 
  const [searchInput, setSearchInput] = useState("");

  const filteredHotels = restaurants.filter(res => filter === 'All' || res.type === filter);

  // Accurate Search Logic (Kangeyam/Pincode Fix)
  const handleFinalSearch = async (e, query) => {
    if (e) e.preventDefault();
    if (!query || query.trim() === "") return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=1&countrycodes=in`);
      const data = await response.json();
      if (data && data.length > 0) {
        const newPos = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(newPos);
        setAddress(data[0].display_name); // Updates global address state
        setSearchInput(""); 
      } else { alert("Location not found. Try adding a landmark."); }
    } catch (error) { console.error("Search error:", error); }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <h2 style={{ color: '#e23744', margin: 0 }}>TASTY TRAILS</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
           <span onClick={() => navigate('/history')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>History</span>
           <span onClick={() => navigate('/cart')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#e23744' }}>Cart ({basket.length})</span>
        </div>
      </div>

      <div style={{ padding: '20px 5%' }}>
        {/* TOP SEARCH BAR */}
        <form onSubmit={(e) => handleFinalSearch(e, searchInput)} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Search Place or Landmark (e.g. Kangeyam)..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#333', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
        </form>

        {/* MAP WITH LAYERS */}
        <div style={{ height: '350px', borderRadius: '20px', overflow: 'hidden', marginBottom: '10px', border: '1px solid #eee' }}>
          <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
            <MapHandler center={position} setPosition={setPosition} setAddress={setAddress} />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Default View">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite View">
                <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Terrain View">
                <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
            </LayersControl>
            <Marker position={position} />
          </MapContainer>
        </div>

        {/* INTERACTIVE ADDRESS INPUT */}
        <div style={{ background: '#fff', padding: '15px', borderRadius: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px', border: '1px solid #eee' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: '#e23744', fontWeight: 'bold' }}>📍 Delivering to (Type to Re-correct):</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} // User can type here manually
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
                />
                <button 
                  onClick={(e) => handleFinalSearch(e, address)} 
                  style={{ padding: '10px 20px', background: '#e23744', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  UPDATE
                </button>
              </div>
           </div>
        </div>

        {/* Veg/Non-Veg Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {['All', 'Veg', 'Non-Veg'].map(type => (
            <button key={type} onClick={() => setFilter(type)} style={{ padding: '10px 25px', borderRadius: '25px', border: '1px solid #ddd', cursor: 'pointer', background: filter === type ? '#e23744' : '#fff', color: filter === type ? '#fff' : '#333', fontWeight: 'bold' }}>
              {type}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredHotels.map(res => (
            <div key={res.id} onClick={() => { setActiveResto(res); navigate('/menu'); }} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #eee' }}>
              <div style={{ background: res.color, height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{res.name}</div>
              <div style={{ padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: res.type === 'Veg' ? '#16a34a' : '#e23744', fontWeight: 'bold', fontSize: '12px' }}>● {res.type}</span>
                  <span style={{ fontWeight: 'bold' }}>⭐ {res.rating}</span>
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666' }}>{res.time} Delivery</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePortal;