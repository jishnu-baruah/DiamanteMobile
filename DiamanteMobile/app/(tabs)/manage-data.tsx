import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ManageDataScreen() {
  const [senderSecret, setSenderSecret] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [manageDataMessage, setManageDataMessage] = useState('');

  const manageData = async () => {
    console.log('Manage Data button clicked');
    try {
      const response = await fetch('https://diamantemobile.onrender.com/manage-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderSecret, key, value }),
      });
      const data = await response.json();
      console.log('Data managed:', data);
      setManageDataMessage(data.message);
    } catch (error) {
      console.error('Error managing data:', error);
      setManageDataMessage('Error managing data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Sender Secret Key"
        value={senderSecret}
        onChangeText={setSenderSecret}
      />
      <TextInput
        style={styles.input}
        placeholder="Key"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={styles.button} onPress={manageData}>
        <Text style={styles.buttonText}>Manage Data</Text>
      </TouchableOpacity>
      <Text>{manageDataMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
