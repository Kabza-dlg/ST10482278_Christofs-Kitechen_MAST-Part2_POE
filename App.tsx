import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from './context/MenuContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
}
