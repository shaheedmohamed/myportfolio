# 🔐 Secure Vault - Personal Media Protection App

A React Native mobile application that allows users to securely store and protect their personal media (photos, videos, audio) with encryption and PIN protection.

## Features

### ✅ Core Functionality
- **File Import**: Select and import media files from device storage
- **Encryption**: AES-256-CBC encryption for all stored files
- **Hidden Storage**: Files stored in app-private directory with `.nomedia` file to prevent gallery access
- **File Management**: View, organize, and delete encrypted files
- **Original File Deletion**: Automatically removes original files after import

### 🔒 Security Features
- **PIN Protection**: 4-8 digit PIN lock for app access
- **Secure Key Storage**: Encryption keys stored in secure storage (expo-secure-store)
- **Encrypted Metadata**: File information stored securely
- **No Public Access**: Files only accessible within the app

### 🎨 User Interface
- **Modern Dark Theme**: Clean, professional interface with cyan accent color
- **Tab Navigation**: Easy access to Vault, Gallery, and Settings
- **File Cards**: Display file type, size, and import date
- **Empty States**: Helpful prompts when no files are stored
- **Responsive Design**: Works on various screen sizes

## Project Structure

```
SecureVault/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation setup
│   │   ├── index.tsx            # Vault screen (main)
│   │   ├── explore.tsx          # Gallery screen
│   │   └── settings.tsx         # Settings screen
│   ├── _layout.tsx              # Root layout with lock screen
│   ├── lock.jsx                 # PIN lock screen
│   ├── vault.jsx                # Vault screen (backup)
│   └── settings.jsx             # Settings screen (backup)
├── utils/
│   ├── encryption.js            # AES encryption utilities
│   ├── fileManager.js           # File import/management
│   └── pinLock.js               # PIN authentication
├── app.json                     # Expo configuration
└── package.json                 # Dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Android device/emulator or iOS simulator

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd SecureVault
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

5. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## Usage Guide

### First Time Setup
1. Launch the app
2. Go to Settings tab
3. Enable PIN Protection
4. Enter a 4-8 digit PIN
5. Confirm the PIN

### Importing Files
1. Tap the "➕ Import File" button on the Vault tab
2. Select media from your device
3. File is automatically encrypted and moved to vault
4. Original file is deleted from device

### Managing Files
- **View Files**: Browse encrypted files in the vault
- **File Info**: See file type, size, and import date
- **Delete Files**: Tap the trash icon to permanently delete

### Settings
- **PIN Management**: Set, change, or disable PIN protection
- **App Info**: View encryption method and storage location

## Technical Details

### Encryption
- **Algorithm**: AES-256-CBC
- **Key Storage**: Expo Secure Store (platform-native secure storage)
- **Key Generation**: 32-byte random key + 16-byte IV
- **File Format**: `.enc` extension for encrypted files

### File Storage
- **Location**: `{DocumentDirectory}/vault/`
- **Metadata**: `vault/metadata.json` (encrypted file list)
- **Hidden**: `.nomedia` file prevents gallery indexing
- **Permissions**: App-private, not accessible to other apps

### Security Measures
- PIN hashed with SHA-256
- Encryption keys never stored in plain text
- Files encrypted before storage
- Original files deleted after import
- Metadata stored separately from encrypted data

## Dependencies

### Core Libraries
- **react-native**: Mobile app framework
- **expo**: Development platform
- **expo-router**: Navigation and routing

### Security
- **expo-secure-store**: Secure key storage
- **react-native-aes-crypto**: AES encryption
- **expo-crypto**: Cryptographic hashing

### File Management
- **expo-file-system**: File operations
- **expo-document-picker**: File selection
- **expo-media-library**: Media access

### UI
- **react-native-gesture-handler**: Gesture support
- **react-native-reanimated**: Animations

## Android Permissions

The app requests the following permissions:
- `READ_EXTERNAL_STORAGE`: Read files for import
- `WRITE_EXTERNAL_STORAGE`: Write encrypted files
- `READ_MEDIA_IMAGES`: Access image files
- `READ_MEDIA_VIDEO`: Access video files
- `READ_MEDIA_AUDIO`: Access audio files

## Roadmap

### ✅ Completed
- [x] Core file encryption (AES-256-CBC)
- [x] File import and management
- [x] PIN protection
- [x] Settings screen
- [x] Modern UI with dark theme
- [x] Metadata management

### 🚀 Future Enhancements
- [ ] Fake calculator stealth mode
- [ ] Biometric authentication (fingerprint/face)
- [ ] Cloud backup (encrypted)
- [ ] File preview (images/videos)
- [ ] Media player for audio/video
- [ ] File search and filtering
- [ ] Batch operations
- [ ] Export encrypted files
- [ ] App lock timeout
- [ ] Decoy PIN feature

## Troubleshooting

### Files Not Appearing
- Ensure you have file permissions enabled
- Check if `.nomedia` file exists in vault directory
- Restart the app

### PIN Issues
- PIN must be 4-8 digits
- PIN is case-sensitive (numeric only)
- Clear app data to reset PIN (will delete all files)

### Encryption Errors
- Ensure sufficient storage space
- Check if file is corrupted before import
- Try importing a smaller file first

## Security Notes

⚠️ **Important**:
- This app provides encryption but is not a substitute for professional security solutions
- PIN should be memorable but not obvious
- Backup important files before using this app
- Clearing app data will permanently delete all encrypted files
- The encryption key is stored on the device; if the device is compromised, files may be at risk

## Development

### Building for Production
```bash
eas build --platform android
eas build --platform ios
```

### Running Tests
```bash
npm test
```

### Code Quality
- Uses TypeScript for type safety
- ESLint for code linting
- Follows React Native best practices

## License

MIT License - Feel free to use and modify

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Expo documentation
4. Open an issue on GitHub

## Version History

### v1.0.0 (Current)
- Initial release
- Core encryption and file management
- PIN protection
- Settings management

---

**Built with ❤️ using React Native and Expo**
