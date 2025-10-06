// context/MenuContext.js
import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  // Preload 2 dishes per category
  const initialMenu = [
    // Starters
    { id: '1', name: 'Springbok Carpaccio', description: 'Thinly sliced springbok with lemon aioli', course: 'Starters', price: '95.00' },
    { id: '2', name: 'Calamari Rings', description: 'Deep-fried with tartar sauce', course: 'Starters', price: '85.00' },
    // Mains
    { id: '3', name: 'Braaied Lamb Shank', description: 'Slow-cooked with herbs', course: 'Mains', price: '160.00' },
    { id: '4', name: 'Grilled Kingklip', description: 'Served with lemon butter', course: 'Mains', price: '145.00' },
    // Desserts
    { id: '5', name: 'Malva Pudding', description: 'Traditional sweet pudding', course: 'Desserts', price: '55.00' },
    { id: '6', name: 'Chocolate Fondant', description: 'Molten chocolate cake', course: 'Desserts', price: '60.00' },
  ];

  const [menu, setMenu] = useState(initialMenu);

  const addDish = (dish) => {
    const id = String(Date.now());
    setMenu((prev) => [...prev, { ...dish, id }]);
  };

  const updateDish = (id, updatedDish) => {
    setMenu((prev) => prev.map((dish) => (dish.id === id ? { ...dish, ...updatedDish } : dish)));
  };

  const deleteDish = (id) => {
    setMenu((prev) => prev.filter((dish) => dish.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, addDish, updateDish, deleteDish }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
