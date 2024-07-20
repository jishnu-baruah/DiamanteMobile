import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderButton = (href: string, label: string) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.button} onPress={animateButton}>
        <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleValue }] }]}>
          {label}
        </Animated.Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diamante Network Operations</Text>
      <View style={styles.buttonRow}>
        {renderButton('/create-account', 'Create Account')}
        {renderButton('/payments', 'Make Payment')}
      </View>
      <View style={styles.buttonRow}>
        {renderButton('/manage-data', 'Manage Data')}
        {renderButton('/set-options', 'Set Options')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
