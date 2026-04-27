import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { verifyPIN, isPINEnabled } from '@/utils/pinLock';

export default function LockScreen() {
  const [pin, setPin] = useState('');
  const [pinEnabled, setPinEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkPINStatus();
  }, []);

  const checkPINStatus = async () => {
    try {
      const enabled = await isPINEnabled();
      setPinEnabled(enabled);
      if (!enabled) {
        router.replace('/(tabs)');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking PIN status:', error);
      setLoading(false);
    }
  };

  const handleVerifyPIN = async () => {
    if (pin.length === 0) {
      Alert.alert('Error', 'Please enter your PIN');
      return;
    }

    try {
      const isValid = await verifyPIN(pin);
      if (isValid) {
        setPin('');
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Incorrect PIN');
        setPin('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify PIN');
      console.error('Error verifying PIN:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!pinEnabled) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>🔐 Secure Vault</Text>
        <Text style={styles.subtitle}>Enter your PIN to unlock</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          secureTextEntry
          keyboardType="numeric"
          maxLength={8}
          value={pin}
          onChangeText={setPin}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyPIN}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#00d4ff',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    backgroundColor: '#0f3460',
    textAlign: 'center',
    letterSpacing: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#00d4ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: 16,
  },
});
