import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function FilterScreen({ navigation }) {
  const { menu } = useContext(MenuContext);
  const [selectedCourse, setSelectedCourse] = useState('All');

  const filteredMenu =
    selectedCourse === 'All' ? menu : menu.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      <View style={styles.filters}>
        {['All', 'Starters', 'Mains', 'Desserts'].map(course => (
          <TouchableOpacity key={course} style={[styles.filterButton, selectedCourse === course && styles.active]} onPress={() => setSelectedCourse(course)}>
            <Text style={[styles.filterText, selectedCourse === course && styles.activeText]}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#FFD700', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  filterButton: { borderWidth: 1, borderColor: '#FFD700', borderRadius: 8, padding: 8, width: 90, alignItems: 'center' },
  active: { backgroundColor: '#FFD700' },
  filterText: { color: '#FFD700', fontWeight: 'bold' },
  activeText: { color: '#000' },
  card: { backgroundColor: '#111', padding: 15, marginVertical: 8, borderRadius: 10, borderColor: '#FFD700', borderWidth: 1 },
  dish: { color: '#FFD700', fontSize: 18 },
  price: { color: '#FFD700', marginTop: 5 },
});
