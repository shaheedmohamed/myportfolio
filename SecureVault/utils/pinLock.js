import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const PIN_KEY = 'vault_pin_hash';
const PIN_ENABLED = 'vault_pin_enabled';

export const setPIN = async (pin) => {
  try {
    if (pin.length < 4 || pin.length > 8) {
      throw new Error('PIN must be between 4 and 8 digits');
    }
    
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pin
    );
    
    await SecureStore.setItemAsync(PIN_KEY, hash);
    await SecureStore.setItemAsync(PIN_ENABLED, 'true');
    
    return true;
  } catch (error) {
    console.error('Error setting PIN:', error);
    throw error;
  }
};

export const verifyPIN = async (pin) => {
  try {
    const storedHash = await SecureStore.getItemAsync(PIN_KEY);
    
    if (!storedHash) {
      return false;
    }
    
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pin
    );
    
    return hash === storedHash;
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return false;
  }
};

export const isPINEnabled = async () => {
  try {
    const enabled = await SecureStore.getItemAsync(PIN_ENABLED);
    return enabled === 'true';
  } catch (error) {
    console.error('Error checking PIN status:', error);
    return false;
  }
};

export const removePIN = async () => {
  try {
    await SecureStore.deleteItemAsync(PIN_KEY);
    await SecureStore.deleteItemAsync(PIN_ENABLED);
    return true;
  } catch (error) {
    console.error('Error removing PIN:', error);
    throw error;
  }
};

export const changePIN = async (oldPin, newPin) => {
  try {
    const isValid = await verifyPIN(oldPin);
    if (!isValid) {
      throw new Error('Current PIN is incorrect');
    }
    
    await setPIN(newPin);
    return true;
  } catch (error) {
    console.error('Error changing PIN:', error);
    throw error;
  }
};
