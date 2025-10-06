import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function HomeScreen({ navigation }) {
  const { menu } = useContext(MenuContext);

  const averagePrice = menu.length
    ? (menu.reduce((acc, item) => acc + parseFloat(item.price || 0), 0) / menu.length).toFixed(2)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Menu</Text>

      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.info}>Total Dishes: {menu.length}</Text>
      <Text style={styles.info}>Average Price: R{averagePrice}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenuItem')}>
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter')}>
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  card: { backgroundColor: '#111', padding: 15, marginVertical: 8, borderRadius: 10, borderColor: '#FFD700', borderWidth: 1 },
  dish: { fontSize: 20, color: '#FFD700', fontWeight: 'bold' },
  desc: { color: '#ccc', fontSize: 14, marginTop: 4 },
  price: { color: '#FFD700', fontSize: 16, marginTop: 6 },
  info: { color: '#FFD700', marginTop: 8 },
  buttons: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: '#FFD700', padding: 12, borderRadius: 10, width: '48%' },
  buttonText: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
});
