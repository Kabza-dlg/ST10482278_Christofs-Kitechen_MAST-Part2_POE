import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../context/MenuContext';

export default function AddMenuItemScreen({ navigation }) {
  const { addDish } = useContext(MenuContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !price) return;
    addDish({ name, description, course, price });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>

      <TextInput placeholder="Dish Name" placeholderTextColor="#ccc" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Description" placeholderTextColor="#ccc" style={styles.input} value={description} onChangeText={setDescription} />
      <Picker selectedValue={course} onValueChange={setCourse} style={styles.picker}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <TextInput placeholder="Price" placeholderTextColor="#ccc" style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <View style={styles.buttonRow}>
        <Button title="Cancel" color="#444" onPress={() => navigation.goBack()} />
        <Button title="Add" color="#FFD700" onPress={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#FFD700', fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#111', color: '#FFD700', borderRadius: 8, marginVertical: 10, padding: 10 },
  picker: { backgroundColor: '#111', color: '#FFD700', marginVertical: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
