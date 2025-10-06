import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  const addDish = (dish) => setMenu([...menu, dish]);
  const clearMenu = () => setMenu([]);

  return (
    <MenuContext.Provider value={{ menu, addDish, clearMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
