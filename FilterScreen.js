// screens/FilterScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function FilterScreen({ navigation }) {
  const { menu } = useMenu();
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All' ? menu : menu.filter((d) => d.course === selected);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <View style={styles.pickerWrap}>
        <Picker selectedValue={selected} onValueChange={(val) => setSelected(val)}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.course} - R {item.price}</Text>
          </View>
        )}
        ListEmptyComponent={() => <Text>No dishes found for {selected}</Text>}
      />

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 8 },
  dishName: { fontWeight: 'bold' },
  pickerWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 12, overflow: 'hidden' },
});
