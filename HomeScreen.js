// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen({ navigation }) {
  const { menu, deleteDish } = useMenu();

  // Total count
  const totalCount = menu.length;

  // Average price per course
  const courseStats = menu.reduce((acc, item) => {
    acc[item.course] = acc[item.course] || { sum: 0, count: 0 };
    acc[item.course].sum += Number(item.price) || 0;
    acc[item.course].count += 1;
    return acc;
  }, {});

  const avgPrice = (course) => {
    const s = courseStats[course];
    if (!s || s.count === 0) return '-';
    return (s.sum / s.count).toFixed(2);
  };

  const confirmDelete = (id) => {
    Alert.alert('Delete Dish', 'Are you sure you want to delete this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteDish(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Christoffel's Menu</Text>

      <View style={styles.statsRow}>
        <Text>Total items: {totalCount}</Text>
        <Text>Avg Starters: {avgPrice('Starters')}</Text>
        <Text>Avg Mains: {avgPrice('Mains')}</Text>
        <Text>Avg Desserts: {avgPrice('Desserts')}</Text>
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.price}>R {item.price}</Text>
            </View>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonRow}>
              <Button title="Edit" onPress={() => navigation.push('AddMenuItem', { dishToEdit: item })} />
              <Button title="Delete" color="red" onPress={() => confirmDelete(item.id)} />
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Button title="Add Dish" onPress={() => navigation.push('AddMenuItem')} />
        <Button title="Filter by Course" onPress={() => navigation.push('Filter')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 8, borderRadius: 8 },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  course: { fontStyle: 'italic', color: '#555' },
  description: { marginVertical: 4 },
  price: { fontWeight: '600' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});
