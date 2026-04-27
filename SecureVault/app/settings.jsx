import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { isPINEnabled, setPIN, removePIN, changePIN } from '@/utils/pinLock';

export default function SettingsScreen() {
  const [pinEnabled, setPinEnabled] = useState(false);
  const [showPINSetup, setShowPINSetup] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPINStatus();
  }, []);

  const checkPINStatus = async () => {
    try {
      const enabled = await isPINEnabled();
      setPinEnabled(enabled);
      setLoading(false);
    } catch (error) {
      console.error('Error checking PIN status:', error);
      setLoading(false);
    }
  };

  const handleEnablePIN = async () => {
    if (!newPin || !confirmPin) {
      Alert.alert('Error', 'Please enter PIN in both fields');
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    if (newPin.length < 4 || newPin.length > 8) {
      Alert.alert('Error', 'PIN must be between 4 and 8 digits');
      return;
    }

    try {
      await setPIN(newPin);
      Alert.alert('Success', 'PIN has been set successfully');
      setNewPin('');
      setConfirmPin('');
      setShowPINSetup(false);
      await checkPINStatus();
    } catch (error) {
      Alert.alert('Error', 'Failed to set PIN');
      console.error('Error setting PIN:', error);
    }
  };

  const handleDisablePIN = () => {
    Alert.alert(
      'Disable PIN',
      'Are you sure you want to disable PIN protection?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Disable',
          onPress: async () => {
            try {
              await removePIN();
              Alert.alert('Success', 'PIN protection has been disabled');
              await checkPINStatus();
            } catch (error) {
              Alert.alert('Error', 'Failed to disable PIN');
              console.error('Error disabling PIN:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleChangePIN = async () => {
    if (!currentPin || !newPin || !confirmPin) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert('Error', 'New PINs do not match');
      return;
    }

    if (newPin.length < 4 || newPin.length > 8) {
      Alert.alert('Error', 'PIN must be between 4 and 8 digits');
      return;
    }

    try {
      await changePIN(currentPin, newPin);
      Alert.alert('Success', 'PIN has been changed successfully');
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setShowPINSetup(false);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to change PIN');
      console.error('Error changing PIN:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Settings</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Security</Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingName}>🔐 PIN Protection</Text>
            <Text style={styles.settingDescription}>
              {pinEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <Switch
            value={pinEnabled}
            onValueChange={(value) => {
              if (value) {
                setShowPINSetup(true);
              } else {
                handleDisablePIN();
              }
            }}
            trackColor={{ false: '#444', true: '#00d4ff' }}
            thumbColor={pinEnabled ? '#fff' : '#999'}
          />
        </View>
      </View>

      {showPINSetup && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {pinEnabled ? 'Change PIN' : 'Set PIN'}
            </Text>
          </View>

          {pinEnabled && (
            <TextInput
              style={styles.input}
              placeholder="Current PIN"
              secureTextEntry
              keyboardType="numeric"
              maxLength={8}
              value={currentPin}
              onChangeText={setCurrentPin}
              placeholderTextColor="#666"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder={pinEnabled ? 'New PIN' : 'PIN (4-8 digits)'}
            secureTextEntry
            keyboardType="numeric"
            maxLength={8}
            value={newPin}
            onChangeText={setNewPin}
            placeholderTextColor="#666"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={8}
            value={confirmPin}
            onChangeText={setConfirmPin}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={pinEnabled ? handleChangePIN : handleEnablePIN}
          >
            <Text style={styles.buttonText}>
              {pinEnabled ? 'Change PIN' : 'Set PIN'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setShowPINSetup(false);
              setCurrentPin('');
              setNewPin('');
              setConfirmPin('');
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Encryption</Text>
          <Text style={styles.infoValue}>AES-256-CBC</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Storage</Text>
          <Text style={styles.infoValue}>App Private Directory</Text>
        </View>
      </View>
    </ScrollView>
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
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d4ff',
  },
  settingItem: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    flex: 1,
  },
  settingName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  },
  input: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#00d4ff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 15,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  infoItem: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00d4ff',
  },
});
