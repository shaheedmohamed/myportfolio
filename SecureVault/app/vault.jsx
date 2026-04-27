import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getVaultFiles, deleteVaultFile, importFile } from '@/utils/fileManager';

export default function VaultScreen() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadVaultFiles();
    }, [])
  );

  const loadVaultFiles = async () => {
    try {
      setLoading(true);
      const vaultFiles = await getVaultFiles();
      setFiles(vaultFiles);
    } catch (error) {
      Alert.alert('Error', 'Failed to load vault files');
      console.error('Error loading vault files:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVaultFiles();
    setRefreshing(false);
  };

  const handleImportFile = async () => {
    try {
      const result = await importFile();
      if (result) {
        Alert.alert('Success', 'File imported and encrypted successfully');
        await loadVaultFiles();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import file');
      console.error('Error importing file:', error);
    }
  };

  const handleDeleteFile = async (fileId, fileName) => {
    Alert.alert(
      'Delete File',
      `Are you sure you want to delete "${fileName}"?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteVaultFile(fileId);
              Alert.alert('Success', 'File deleted successfully');
              await loadVaultFiles();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete file');
              console.error('Error deleting file:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return '🖼️';
    if (type?.startsWith('video/')) return '🎬';
    if (type?.startsWith('audio/')) return '🎵';
    return '📄';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const renderFileItem = ({ item }) => (
    <View style={styles.fileCard}>
      <View style={styles.fileInfo}>
        <Text style={styles.fileIcon}>{getFileIcon(item.type)}</Text>
        <View style={styles.fileDetails}>
          <Text style={styles.fileName} numberOfLines={1}>
            {item.originalName}
          </Text>
          <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
          <Text style={styles.fileDate}>
            {new Date(item.importedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFile(item.id, item.originalName)}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔐 My Vault</Text>
        <Text style={styles.subtitle}>
          {files.length} file{files.length !== 1 ? 's' : ''} secured
        </Text>
      </View>

      <TouchableOpacity
        style={styles.importButton}
        onPress={handleImportFile}
        activeOpacity={0.7}
      >
        <Text style={styles.importIcon}>➕</Text>
        <Text style={styles.importText}>Import File</Text>
      </TouchableOpacity>

      {files.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyTitle}>No Files Yet</Text>
          <Text style={styles.emptySubtitle}>
            Import your first file to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={files}
          renderItem={renderFileItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  importButton: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: '#00d4ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  importIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  importText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fileCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  fileDate: {
    fontSize: 11,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
