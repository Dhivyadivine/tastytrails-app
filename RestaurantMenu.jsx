import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantMenu = ({ activeResto, basket = [], addToBasket }) => {
  const navigate = useNavigate();

  // Full 100-Item Menu Data (10 items for each of the 10 Restaurants)
  const allMenus = {
    1: [ // Annapoorna Veg
      { id: 101, name: "Ghee Podi Idli", price: 140, type: "Veg", desc: "Mini idlis tossed in spicy podi and ghee." },
      { id: 102, name: "Special Ghee Roast", price: 180, type: "Veg", desc: "Crispy thin crepe roasted with pure ghee." },
      { id: 103, name: "Medhu Vada (2pcs)", price: 60, type: "Veg", desc: "Crispy fried lentil donuts." },
      { id: 104, name: "Poori Masala", price: 120, type: "Veg", desc: "Wheat bread served with potato curry." },
      { id: 105, name: "Mini Tiffin", price: 210, type: "Veg", desc: "Combo of Idli, Vada, and Pongal." },
      { id: 106, name: "Sambar Vadai", price: 75, type: "Veg", desc: "Vada soaked in aromatic sambar." },
      { id: 107, name: "Onion Uthappam", price: 145, type: "Veg", desc: "Thick pancake topped with onions." },
      { id: 108, name: "Filter Coffee", price: 45, type: "Veg", desc: "Traditional South Indian coffee." },
      { id: 109, name: "Rava Khichdi", price: 90, type: "Veg", desc: "Semolina cooked with vegetables." },
      { id: 110, name: "Parotta Kurma", price: 130, type: "Veg", desc: "Flatbread with vegetable gravy." }
    ],
    2: [ // Al Faisal Biryani
      { id: 201, name: "Mutton Biryani", price: 380, type: "Non-Veg", desc: "Traditional rice cooked with tender mutton." },
      { id: 202, name: "Chicken 65 (Boneless)", price: 210, type: "Non-Veg", desc: "Spicy deep fried chicken bites." },
      { id: 203, name: "Bread Halwa", price: 80, type: "Veg", desc: "Sweet dessert made with bread and ghee." },
      { id: 204, name: "Egg Masala", price: 120, type: "Non-Veg", desc: "Spicy curry with boiled eggs." },
      { id: 205, name: "Chicken Lollipop", price: 240, type: "Non-Veg", desc: "Crispy fried chicken drumettes." },
      { id: 206, name: "Mutton Chukka", price: 310, type: "Non-Veg", desc: "Dry spicy roasted mutton." },
      { id: 207, name: "Chicken Fried Rice", price: 190, type: "Non-Veg", desc: "Wok-tossed rice with chicken." },
      { id: 208, name: "Garlic Naan", price: 60, type: "Veg", desc: "Bread topped with minced garlic." },
      { id: 209, name: "Prawn Pepper Fry", price: 350, type: "Non-Veg", desc: "Spicy prawns with black pepper." },
      { id: 210, name: "Chicken Hyderabadi", price: 280, type: "Non-Veg", desc: "Chicken cooked in green spicy gravy." }
    ],
    3: [ // Cream Stone
      { id: 301, name: "Willy Wonka", price: 220, type: "Veg", desc: "Chocolate ice cream with brownies." },
      { id: 302, name: "Fruit Exotica", price: 240, type: "Veg", desc: "Mixed fruit ice cream with toppings." },
      { id: 303, name: "Death by Chocolate", price: 280, type: "Veg", desc: "Triple chocolate layer ice cream." },
      { id: 304, name: "Nutty Overload", price: 210, type: "Veg", desc: "Vanilla base with assorted nuts." },
      { id: 305, name: "Red Velvet Jar", price: 190, type: "Veg", desc: "Classic red velvet cake in a jar." },
      { id: 306, name: "Choco Lava Cake", price: 120, type: "Veg", desc: "Warm cake with molten chocolate." },
      { id: 307, name: "Mango Mania", price: 180, type: "Veg", desc: "Seasonal mango ice cream." },
      { id: 308, name: "Kulfi Falooda", price: 160, type: "Veg", desc: "Traditional kulfi with vermicelli." },
      { id: 309, name: "Caramel Popcorn Sundae", price: 230, type: "Veg", desc: "Sweet and salty sundae." },
      { id: 310, name: "Oreo Mud Pie", price: 200, type: "Veg", desc: "Crushed Oreos with chocolate cream." }
    ],
    4: [ // Burger King
      { id: 401, name: "Whopper Burger", price: 199, type: "Non-Veg", desc: "Flame-grilled signature burger." },
      { id: 402, name: "Crispy Veg Wrap", price: 129, type: "Veg", desc: "Veg patty wrapped in tortilla." },
      { id: 403, name: "Peri Peri Fries", price: 99, type: "Veg", desc: "French fries with spicy seasoning." },
      { id: 404, name: "Chicken Wings (6pc)", price: 249, type: "Non-Veg", desc: "Deep fried spicy wings." },
      { id: 405, name: "Veg Maggi Burger", price: 89, type: "Veg", desc: "Unique burger with noodle patty." },
      { id: 406, name: "Cheese Meltdown", price: 179, type: "Veg", desc: "Extra cheesy vegetable burger." },
      { id: 407, name: "Chocolate Shake", price: 149, type: "Veg", desc: "Creamy cocoa blended drink." },
      { id: 408, name: "Onion Rings", price: 110, type: "Veg", desc: "Crispy batter-fried onion circles." },
      { id: 409, name: "Chicken Nuggets", price: 160, type: "Non-Veg", desc: "Bite-sized breaded chicken." },
      { id: 410, name: "Paneer King", price: 189, type: "Veg", desc: "Grilled paneer steak burger." }
    ],
    5: [ // Sangeetha Veg
      { id: 501, name: "South Indian Meals", price: 220, type: "Veg", desc: "Complete balanced meal with rice." },
      { id: 502, name: "Masala Dosa", price: 95, type: "Veg", desc: "Dosa stuffed with potato masala." },
      { id: 503, name: "Rava Idli", price: 80, type: "Veg", desc: "Steamed semolina cakes." },
      { id: 504, name: "Veg Pulao", price: 160, type: "Veg", desc: "Mildly spiced vegetable rice." },
      { id: 505, name: "Paneer 65", price: 190, type: "Veg", desc: "Spicy fried paneer cubes." },
      { id: 506, name: "Gobi Manchurian", price: 170, type: "Veg", desc: "Indo-Chinese cauliflower snack." },
      { id: 507, name: "Chola Poori", price: 140, type: "Veg", desc: "Large poori with chickpea curry." },
      { id: 508, name: "Sweet Pongal", price: 70, type: "Veg", desc: "Traditional sweet jaggery rice." },
      { id: 509, name: "Curd Rice", price: 85, type: "Veg", desc: "Soothing rice with yogurt." },
      { id: 510, name: "Veg Biryani", price: 180, type: "Veg", desc: "Vegetable aromatic rice." }
    ],
    6: [ // KFC
      { id: 601, name: "Hot & Crispy Bucket", price: 550, type: "Non-Veg", desc: "8pc Signature fried chicken." },
      { id: 602, name: "Zinger Burger", price: 189, type: "Non-Veg", desc: "Crispy chicken fillet burger." },
      { id: 603, name: "Popcorn Chicken", price: 160, type: "Non-Veg", desc: "Bite-sized chicken nuggets." },
      { id: 604, name: "Chicken Strips", price: 210, type: "Non-Veg", desc: "Boneless crispy chicken strips." },
      { id: 605, name: "Veg Zinger", price: 159, type: "Veg", desc: "Crispy vegetable patty burger." },
      { id: 606, name: "Minnie Bucket", price: 320, type: "Non-Veg", desc: "Small bucket for snack time." },
      { id: 607, name: "KFC Smokey Grilled", price: 240, type: "Non-Veg", desc: "Grilled chicken with smoke flavor." },
      { id: 608, name: "French Fries (L)", price: 120, type: "Veg", desc: "Classic salted potato fries." },
      { id: 609, name: "Pepsi (500ml)", price: 60, type: "Veg", desc: "Chilled soft drink." },
      { id: 610, name: "Choco Mud Pie", price: 99, type: "Veg", desc: "Dark chocolate dessert." }
    ],
    7: [ // Pizza Hut
      { id: 701, name: "Margherita Pizza", price: 299, type: "Veg", desc: "Classic cheese pizza." },
      { id: 702, name: "Chicken Supreme", price: 499, type: "Non-Veg", desc: "Loaded with chicken and cheese." },
      { id: 703, name: "Veggie Feast", price: 380, type: "Veg", desc: "Mixed fresh vegetables." },
      { id: 704, name: "Garlic Bread", price: 120, type: "Veg", desc: "Buttery toasted bread." },
      { id: 705, name: "Tandoori Paneer", price: 420, type: "Veg", desc: "Paneer with Indian spices." },
      { id: 706, name: "Pepperoni Pizza", price: 550, type: "Non-Veg", desc: "Spicy chicken pepperoni." },
      { id: 707, name: "Pasta Italiano", price: 240, type: "Veg", desc: "Creamy white sauce pasta." },
      { id: 708, name: "Potato Wedges", price: 110, type: "Veg", desc: "Seasoned potato wedges." },
      { id: 709, name: "Mushroom Magic", price: 360, type: "Veg", desc: "Pizza with double mushroom." },
      { id: 710, name: "Choco Volcano", price: 150, type: "Veg", desc: "Molten chocolate cake." }
    ],
    8: [ // Madras Coffee
      { id: 801, name: "Strong Ginger Tea", price: 30, type: "Veg", desc: "Milk tea with fresh ginger." },
      { id: 802, name: "Madras Filter Coffee", price: 40, type: "Veg", desc: "Authentic decoction coffee." },
      { id: 803, name: "Osmania Biscuits", price: 20, type: "Veg", desc: "Salty-sweet butter biscuits." },
      { id: 804, name: "Samosa (2pc)", price: 40, type: "Veg", desc: "Fried pastry with potato filling." },
      { id: 805, name: "Onion Pakoda", price: 60, type: "Veg", desc: "Crispy onion fritters." },
      { id: 806, name: "Bajji Platter", price: 80, type: "Veg", desc: "Mixed vegetable fritters." },
      { id: 807, name: "Rose Milk", price: 50, type: "Veg", desc: "Chilled rose flavored milk." },
      { id: 808, name: "Bread Omelette", price: 70, type: "Non-Veg", desc: "Street style egg sandwich." },
      { id: 809, name: "Lemon Soda", price: 45, type: "Veg", desc: "Refreshing fizzy lemon drink." },
      { id: 810, name: "Banana Cake", price: 35, type: "Veg", desc: "Slice of fresh banana cake." }
    ],
    9: [ // Copper Chimney
      { id: 901, name: "Butter Chicken", price: 320, type: "Non-Veg", desc: "Creamy tomato chicken gravy." },
      { id: 902, name: "Paneer Tikka", price: 280, type: "Veg", desc: "Grilled marinated paneer." },
      { id: 903, name: "Dal Makhani", price: 240, type: "Veg", desc: "Slow cooked black lentils." },
      { id: 904, name: "Butter Naan", price: 50, type: "Veg", desc: "Leavened bread with butter." },
      { id: 905, name: "Mutton Rogan Josh", price: 420, type: "Non-Veg", desc: "Kashmiri style mutton curry." },
      { id: 906, name: "Veg Kadai", price: 210, type: "Veg", desc: "Mixed veggies in spicy gravy." },
      { id: 907, name: "Chicken Seekh Kebab", price: 340, type: "Non-Veg", desc: "Minced chicken skewers." },
      { id: 908, name: "Jeera Rice", price: 160, type: "Veg", desc: "Basmati rice with cumin." },
      { id: 909, name: "Malai Kofta", price: 290, type: "Veg", desc: "Fried potato-cheese balls." },
      { id: 910, name: "Gulab Jamun", price: 80, type: "Veg", desc: "Warm syrup soaked dumplings." }
    ],
    10: [ // Aasife Biryani
      { id: 1001, name: "Aasife Chicken Biryani", price: 280, type: "Non-Veg", desc: "Signature basmati biryani." },
      { id: 1002, name: "Chicken Tandoori (H)", price: 310, type: "Non-Veg", desc: "Half charcoal grilled chicken." },
      { id: 1003, name: "Fish Finger", price: 350, type: "Non-Veg", desc: "Crispy fried fish strips." },
      { id: 1004, name: "Mutton Paya", price: 290, type: "Non-Veg", desc: "Traditional mutton trotters soup." },
      { id: 1005, name: "Wheat Parotta", price: 45, type: "Veg", desc: "Healthy layered flatbread." },
      { id: 1006, name: "Chicken Tikka Masala", price: 330, type: "Non-Veg", desc: "Grilled chicken in spicy gravy." },
      { id: 1007, name: "Dragon Chicken", price: 260, type: "Non-Veg", desc: "Spicy Indo-Chinese chicken fry." },
      { id: 1008, name: "Egg Fried Rice", price: 180, type: "Non-Veg", desc: "Rice tossed with eggs and veggies." },
      { id: 1009, name: "Pineapple Juice", price: 90, type: "Veg", desc: "Fresh fruit extract." },
      { id: 1010, name: "Mango Pudding", price: 120, type: "Veg", desc: "Creamy seasonal mango dessert." }
    ]
  };

  const currentMenu = allMenus[activeResto?.id] || [];
  const cartTotal = basket.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial' }}>
      {/* Centered Restaurant Header */}
      <div style={{ background: activeResto?.color || '#333', color: '#fff', padding: '30px', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => navigate('/')} style={{ position: 'absolute', left: '20px', top: '35px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer' }}>← BACK</button>
        <h1 style={{ margin: '40px 0 5px' }}>{activeResto?.name}</h1>
        <p>⭐ {activeResto?.rating} • {activeResto?.type} • {activeResto?.time} Delivery</p>
      </div>

      <div style={{ padding: '20px 5%' }}>
        {/* Menu Items */}
        {currentMenu.length > 0 ? (
          currentMenu.map(item => (
            <div key={item.id} style={{ background: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '15px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ flex: 1 }}>
                <span style={{ color: item.type === 'Veg' ? '#16a34a' : '#ef4444', fontWeight: 'bold', fontSize: '11px' }}>{item.type === 'Veg' ? '⊡ VEG' : '⬔ NON-VEG'}</span>
                <h4 style={{ margin: '5px 0' }}>{item.name}</h4>
                <p style={{ fontWeight: 'bold', color: '#333', margin: '0' }}>₹{item.price}</p>
                <p style={{ fontSize: '12px', color: '#777', marginTop: '5px', maxWidth: '85%' }}>{item.desc}</p>
              </div>
              {/* ADD Functionality */}
              <button onClick={() => addToBasket(item)} style={{ background: '#fff', color: '#16a34a', border: '1px solid #16a34a', padding: '10px 25px', borderRadius: '10px', fontWeight: 'bold', height: 'fit-content', alignSelf: 'center', cursor: 'pointer' }}>ADD</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '50px' }}>Menu items coming soon...</p>
        )}
      </div>

      {/* Floating View Cart Bar */}
      {basket.length > 0 && (
        <div onClick={() => navigate('/cart')} style={{ position: 'fixed', bottom: '20px', left: '5%', right: '5%', background: '#16a34a', color: '#fff', padding: '18px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 5px 20px rgba(22, 163, 74, 0.4)' }}>
          <span style={{ fontWeight: 'bold' }}>{basket.length} Items | ₹{cartTotal}</span>
          <span style={{ fontWeight: 'bold' }}>View Cart →</span>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;