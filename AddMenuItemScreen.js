// screens/AddMenuItemScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

export default function AddMenuItemScreen({ navigation, route }) {
  const { addDish, updateDish } = useMenu();
  const dishToEdit = route.params?.dishToEdit;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (dishToEdit) {
      setName(dishToEdit.name);
      setDescription(dishToEdit.description);
      setCourse(dishToEdit.course);
      setPrice(dishToEdit.price);
    }
  }, [dishToEdit]);

  const onSave = () => {
    if (!name.trim()) return Alert.alert('Validation', 'Please enter a dish name');
    if (!price || isNaN(Number(price))) return Alert.alert('Validation', 'Enter valid price');

    if (dishToEdit) {
      updateDish(dishToEdit.id, { name, description, course, price });
    } else {
      addDish({ name, description, course, price });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 80 }]} value={description} onChangeText={setDescription} multiline />

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrap}>
        <Picker selectedValue={course} onValueChange={(val) => setCourse(val)}>
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <Text style={styles.label}>Price (ZAR)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <View style={styles.buttonRow}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title={dishToEdit ? 'Update' : 'Add'} onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginTop: 4 },
  pickerWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginTop: 4 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
