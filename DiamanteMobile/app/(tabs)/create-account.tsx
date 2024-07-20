import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CreateAccountScreen() {
  const [keypair, setKeypair] = useState({ publicKey: '', secret: '' });
  const [publicKeyToFund, setPublicKeyToFund] = useState('');
  const [fundingMessage, setFundingMessage] = useState('');

  const generateKeypair = async () => {
    console.log('Generate Keypair button clicked');
    try {
      const response = await fetch('http://localhost:3001/create-keypair', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Keypair generated:', data);
      setKeypair({
        publicKey: data.publicKey,
        secret: data.secret,
      });
      setPublicKeyToFund(data.publicKey); // Automatically set the generated public key for funding
    } catch (error) {
      console.error('Error generating keypair:', error);
    }
  };

  const fundAccount = async () => {
    console.log('Fund Account button clicked');
    try {
      const response = await fetch('http://localhost:3001/fund-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: publicKeyToFund }),
      });
      const data = await response.json();
      console.log('Account funded:', data);
      setFundingMessage(data.message);
    } catch (error) {
      console.error('Error funding account:', error);
      setFundingMessage('Error funding account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Keypair Generator</Text>
        <Text style={styles.description}>
          These keypairs can be used on the Diamante network where one is required. For example, it can be used as an account master key, account signer, and/or as a diamnet-core node key.
        </Text>
        <TouchableOpacity style={styles.button} onPress={generateKeypair}>
          <Text style={styles.buttonText}>Generate Keypair</Text>
        </TouchableOpacity>
        <View style={styles.keypair}>
          <Text><Text style={styles.bold}>Public Key:</Text> {keypair.publicKey}</Text>
          <Text><Text style={styles.bold}>Secret Key:</Text> {keypair.secret}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Fund Account</Text>
        <Text style={styles.description}>
          Fund this account on the test network using the friendbot tool below. Note down the wallet details for making transactions.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Public Key"
          value={publicKeyToFund}
          onChangeText={setPublicKeyToFund}
        />
        <TouchableOpacity style={styles.button} onPress={fundAccount}>
          <Text style={styles.buttonText}>Get Test DIAM</Text>
        </TouchableOpacity>
        <Text>{fundingMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  keypair: {
    marginTop: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
