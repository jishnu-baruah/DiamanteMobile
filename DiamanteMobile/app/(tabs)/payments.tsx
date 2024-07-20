import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaymentsScreen() {
  const [senderSecret, setSenderSecret] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  const makePayment = async () => {
    console.log('Make Payment button clicked');
    try {
      const response = await fetch('https://diamantemobile.onrender.com/make-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderSecret, receiverPublicKey, amount }),
      });
      const data = await response.json();
      console.log('Payment made:', data);
      setPaymentMessage(data.message);
    } catch (error) {
      console.error('Error making payment:', error);
      setPaymentMessage('Error making payment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Sender Secret Key"
        value={senderSecret}
        onChangeText={setSenderSecret}
      />
      <TextInput
        style={styles.input}
        placeholder="Receiver Public Key"
        value={receiverPublicKey}
        onChangeText={setReceiverPublicKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={makePayment}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
      <Text>{paymentMessage}</Text>
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
