import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system/legacy';
import * as Crypto from 'expo-crypto';

const VAULT_KEY = 'vault_encryption_key';
const VAULT_IV = 'vault_encryption_iv';

const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateEncryptionKey = async () => {
  try {
    const key = generateRandomString(32);
    const iv = generateRandomString(16);
    
    await SecureStore.setItemAsync(VAULT_KEY, key);
    await SecureStore.setItemAsync(VAULT_IV, iv);
    
    return { key, iv };
  } catch (error) {
    console.error('Error generating encryption key:', error);
    throw error;
  }
};

export const getEncryptionKey = async () => {
  try {
    let key = await SecureStore.getItemAsync(VAULT_KEY);
    let iv = await SecureStore.getItemAsync(VAULT_IV);
    
    if (!key || !iv) {
      const generated = await generateEncryptionKey();
      return generated;
    }
    
    return { key, iv };
  } catch (error) {
    console.error('Error retrieving encryption key:', error);
    throw error;
  }
};

const simpleEncrypt = (text, key) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode ^ keyCharCode);
  }
  return btoa(result);
};

const simpleDecrypt = (encrypted, key) => {
  const text = atob(encrypted);
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode ^ keyCharCode);
  }
  return result;
};

export const encryptFile = async (sourceUri, fileName) => {
  try {
    const { key } = await getEncryptionKey();
    
    const fileContent = await FileSystem.readAsStringAsync(sourceUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    const encrypted = simpleEncrypt(fileContent, key);
    
    const vaultDir = `${FileSystem.documentDirectory}vault/`;
    await ensureVaultDirectory(vaultDir);
    
    const encryptedFileName = `${fileName}.enc`;
    const encryptedFilePath = `${vaultDir}${encryptedFileName}`;
    
    await FileSystem.writeAsStringAsync(encryptedFilePath, encrypted, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    return {
      success: true,
      encryptedPath: encryptedFilePath,
      fileName: encryptedFileName,
    };
  } catch (error) {
    console.error('Error encrypting file:', error);
    throw error;
  }
};

export const decryptFile = async (encryptedFilePath) => {
  try {
    const { key } = await getEncryptionKey();
    
    const encryptedContent = await FileSystem.readAsStringAsync(encryptedFilePath, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    const decrypted = simpleDecrypt(encryptedContent, key);
    
    return decrypted;
  } catch (error) {
    console.error('Error decrypting file:', error);
    throw error;
  }
};

export const ensureVaultDirectory = async (dirPath) => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirPath);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
      
      const nomediaPath = `${dirPath}.nomedia`;
      await FileSystem.writeAsStringAsync(nomediaPath, '');
    }
  } catch (error) {
    console.error('Error ensuring vault directory:', error);
    throw error;
  }
};
