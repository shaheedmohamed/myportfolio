import * as FileSystem from 'expo-file-system/legacy';
import * as DocumentPicker from 'expo-document-picker';
import { encryptFile, ensureVaultDirectory } from './encryption';

const VAULT_DIR = `${FileSystem.documentDirectory}vault/`;
const METADATA_FILE = `${VAULT_DIR}metadata.json`;

export const getVaultDirectory = () => VAULT_DIR;

export const initializeVault = async () => {
  try {
    await ensureVaultDirectory(VAULT_DIR);
    
    const metadataInfo = await FileSystem.getInfoAsync(METADATA_FILE);
    if (!metadataInfo.exists) {
      await FileSystem.writeAsStringAsync(METADATA_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing vault:', error);
    throw error;
  }
};

export const importFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'video/*', 'audio/*'],
    });
    
    if (result.canceled) {
      return null;
    }
    
    const asset = result.assets[0];
    const fileName = asset.name;
    
    const encryptResult = await encryptFile(asset.uri, fileName);
    
    await addFileToMetadata({
      originalName: fileName,
      encryptedName: encryptResult.fileName,
      encryptedPath: encryptResult.encryptedPath,
      type: asset.mimeType,
      size: asset.size,
      importedAt: new Date().toISOString(),
      originalUri: asset.uri,
    });
    
    await deleteOriginalFile(asset.uri);
    
    return encryptResult;
  } catch (error) {
    console.error('Error importing file:', error);
    throw error;
  }
};

export const deleteOriginalFile = async (fileUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
    }
  } catch (error) {
    console.error('Error deleting original file:', error);
  }
};

export const getVaultFiles = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(METADATA_FILE);
    if (!fileInfo.exists) {
      return [];
    }
    const metadataContent = await FileSystem.readAsStringAsync(METADATA_FILE);
    return JSON.parse(metadataContent);
  } catch (error) {
    console.error('Error reading vault files:', error);
    return [];
  }
};

export const addFileToMetadata = async (fileMetadata) => {
  try {
    const files = await getVaultFiles();
    files.push({
      id: Date.now().toString(),
      ...fileMetadata,
    });
    await FileSystem.writeAsStringAsync(METADATA_FILE, JSON.stringify(files, null, 2));
  } catch (error) {
    console.error('Error adding file to metadata:', error);
    throw error;
  }
};

export const deleteVaultFile = async (fileId) => {
  try {
    const files = await getVaultFiles();
    const fileIndex = files.findIndex(f => f.id === fileId);
    
    if (fileIndex === -1) {
      throw new Error('File not found');
    }
    
    const file = files[fileIndex];
    
    const fileInfo = await FileSystem.getInfoAsync(file.encryptedPath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(file.encryptedPath);
    }
    
    files.splice(fileIndex, 1);
    await FileSystem.writeAsStringAsync(METADATA_FILE, JSON.stringify(files, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error deleting vault file:', error);
    throw error;
  }
};

export const getFileById = async (fileId) => {
  try {
    const files = await getVaultFiles();
    return files.find(f => f.id === fileId);
  } catch (error) {
    console.error('Error getting file by id:', error);
    return null;
  }
};
