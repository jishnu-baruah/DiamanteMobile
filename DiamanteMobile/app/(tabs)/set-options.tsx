import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SetOptionsScreen() {
  const [senderSecret, setSenderSecret] = useState('');
  const [inflationDest, setInflationDest] = useState('');
  const [weight, setWeight] = useState('');
  const [setOptionsMessage, setSetOptionsMessage] = useState('');

  const setOptions = async () => {
    console.log('Set Options button clicked');
    try {
      const response = await fetch('http://localhost:3001/set-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderSecret, inflationDest, weight }),
      });
      const data = await response.json();
      console.log('Options set:', data);
      setSetOptionsMessage(data.message);
    } catch (error) {
      console.error('Error setting options:', error);
      setSetOptionsMessage('Error setting options.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Options</Text>
      <TextInput
        style={styles.input}
        placeholder="Sender Secret Key"
        value={senderSecret}
        onChangeText={setSenderSecret}
      />
      <TextInput
        style={styles.input}
        placeholder="Inflation Destination"
        value={inflationDest}
        onChangeText={setInflationDest}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <TouchableOpacity style={styles.button} onPress={setOptions}>
        <Text style={styles.buttonText}>Set Options</Text>
      </TouchableOpacity>
      <Text>{setOptionsMessage}</Text>
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
