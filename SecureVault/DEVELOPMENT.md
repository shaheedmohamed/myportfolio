# 👨‍💻 Development Guide - Secure Vault

## Project Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Initial Setup
```bash
cd SecureVault
npm install
npm start
```

## Project Structure

```
SecureVault/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab navigator setup
│   │   ├── index.tsx            # Vault screen (main)
│   │   ├── explore.tsx          # Gallery screen
│   │   └── settings.tsx         # Settings screen
│   ├── _layout.tsx              # Root layout
│   ├── lock.jsx                 # PIN lock screen
│   ├── vault.jsx                # Vault backup screen
│   └── settings.jsx             # Settings backup screen
├── utils/                        # Business logic
│   ├── encryption.js            # AES encryption
│   ├── fileManager.js           # File operations
│   └── pinLock.js               # PIN authentication
├── components/                   # Reusable components
├── constants/                    # App constants
├── hooks/                        # Custom hooks
├── assets/                       # Images, icons
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── VAULT_README.md              # User documentation
├── QUICKSTART.md                # Quick start guide
├── ARCHITECTURE.md              # Architecture docs
└── DEVELOPMENT.md               # This file
```

## Development Workflow

### 1. Starting Development Server
```bash
npm start
```

This starts the Expo development server. You'll see options to:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web
- Press `r` to reload
- Press `m` to toggle menu

### 2. Running on Android
```bash
npm run android
```

Or from the development server menu, press `a`.

### 3. Running on iOS
```bash
npm run ios
```

Requires macOS and Xcode installed.

### 4. Running on Web
```bash
npm run web
```

Opens in browser (limited functionality for mobile features).

## Code Style & Standards

### TypeScript
- Use TypeScript for type safety
- Define types for all function parameters
- Use `any` sparingly (only when necessary)
- Run linter: `npm run lint`

### React Native
- Use functional components with hooks
- Use `useFocusEffect` for screen refresh
- Avoid class components
- Use StyleSheet for styles

### File Naming
- Screens: PascalCase (e.g., `VaultScreen.tsx`)
- Utils: camelCase (e.g., `fileManager.js`)
- Components: PascalCase (e.g., `FileCard.tsx`)
- Styles: Inline with `StyleSheet.create()`

### Imports
- Absolute imports using `@/` alias
- Group imports: React, libraries, local
- Sort alphabetically within groups

## Key Files & Their Purpose

### `utils/encryption.js`
**Handles**: AES-256-CBC encryption/decryption
**Key Functions**:
- `generateEncryptionKey()` - Create new key
- `getEncryptionKey()` - Retrieve stored key
- `encryptFile()` - Encrypt and save file
- `decryptFile()` - Decrypt file content
- `ensureVaultDirectory()` - Create vault folder

**Testing**:
```javascript
// Test encryption
const result = await encryptFile(fileUri, fileName);
console.log('Encrypted:', result);

// Test decryption
const decrypted = await decryptFile(encryptedPath);
console.log('Decrypted:', decrypted);
```

### `utils/fileManager.js`
**Handles**: File import, deletion, metadata
**Key Functions**:
- `importFile()` - Select and import file
- `getVaultFiles()` - Get file list
- `deleteVaultFile()` - Delete encrypted file
- `addFileToMetadata()` - Add file entry
- `deleteOriginalFile()` - Remove source file

**Testing**:
```javascript
// Test import
const result = await importFile();
console.log('Imported:', result);

// Test metadata
const files = await getVaultFiles();
console.log('Files:', files);
```

### `utils/pinLock.js`
**Handles**: PIN authentication
**Key Functions**:
- `setPIN()` - Create PIN
- `verifyPIN()` - Verify PIN
- `isPINEnabled()` - Check status
- `changePIN()` - Change PIN
- `removePIN()` - Disable PIN

**Testing**:
```javascript
// Test PIN setup
await setPIN('1234');

// Test verification
const valid = await verifyPIN('1234');
console.log('Valid:', valid);

// Test change
await changePIN('1234', '5678');
```

## Common Development Tasks

### Add a New Screen
1. Create file in `app/` or `app/(tabs)/`
2. Add route to `_layout.tsx`
3. Import and use navigation

```typescript
// app/newscreen.tsx
import { useRouter } from 'expo-router';

export default function NewScreen() {
  const router = useRouter();
  
  return (
    <View>
      <Text>New Screen</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Add a New Utility Function
1. Create function in appropriate `utils/` file
2. Export the function
3. Import and use in screens

```javascript
// utils/newutil.js
export const newFunction = async (param) => {
  // Implementation
  return result;
};

// In screen
import { newFunction } from '@/utils/newutil';

const result = await newFunction(param);
```

### Add Styling
Use `StyleSheet.create()` for performance:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
```

### Handle Errors
Always use try-catch and show user feedback:

```javascript
try {
  const result = await someOperation();
  Alert.alert('Success', 'Operation completed');
} catch (error) {
  Alert.alert('Error', error.message || 'Something went wrong');
  console.error('Error:', error);
}
```

## Debugging

### Console Logging
```javascript
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Warning:', message);
```

### React Native Debugger
1. Install: `npm install -g react-native-debugger`
2. Open debugger
3. Run app with debugger enabled
4. Inspect state and props

### Expo DevTools
- Press `d` in terminal to open DevTools
- View console logs
- Inspect network requests
- View performance metrics

### Testing on Device
```bash
# Get device IP
ipconfig getifaddr en0  # macOS
ipconfig              # Windows

# Connect to development server
# Scan QR code in Expo app
```

## Performance Optimization

### Lazy Loading
```javascript
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  useCallback(() => {
    loadData();
  }, [])
);
```

### Memoization
```javascript
import { useMemo, useCallback } from 'react';

const memoizedValue = useMemo(() => {
  return expensiveOperation();
}, [dependency]);

const memoizedCallback = useCallback(() => {
  doSomething();
}, [dependency]);
```

### Image Optimization
- Use `expo-image` for better performance
- Compress images before import
- Use appropriate image formats

## Testing

### Unit Tests
```bash
npm test
```

### Manual Testing Checklist
- [ ] Import various file types
- [ ] Verify encryption
- [ ] Test PIN setup
- [ ] Test PIN verification
- [ ] Test file deletion
- [ ] Test original file removal
- [ ] Test metadata updates
- [ ] Test on actual device

### Test Scenarios

**Scenario 1: Import and Encrypt**
1. Launch app
2. Tap "Import File"
3. Select image
4. Verify file appears in vault
5. Verify original file deleted

**Scenario 2: PIN Protection**
1. Go to Settings
2. Enable PIN (1234)
3. Close app
4. Reopen app
5. Should show lock screen
6. Enter PIN
7. Should access vault

**Scenario 3: File Management**
1. Import multiple files
2. Verify all appear in list
3. Delete one file
4. Verify it's removed
5. Verify metadata updated

## Troubleshooting Development Issues

### App Won't Start
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart development server
npm start
```

### Module Not Found
```bash
# Check import paths use @/ alias
# Verify file exists
# Check tsconfig.json paths
```

### Permission Errors
```bash
# Android: Grant permissions in app settings
# iOS: Check Info.plist permissions
# Emulator: Reset permissions
```

### Encryption Errors
- Check if file is readable
- Verify encryption key exists
- Check storage permissions
- Try with smaller file

### PIN Issues
- Ensure numeric input only
- Check PIN length (4-8)
- Verify secure store working
- Clear app data to reset

## Building for Production

### Android Build
```bash
eas build --platform android
```

### iOS Build
```bash
eas build --platform ios
```

### Configuration
Update `app.json`:
```json
{
  "expo": {
    "name": "Secure Vault",
    "slug": "secure-vault",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.securevault"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.securevault"
    }
  }
}
```

## Release Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Performance acceptable
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Build tested on device
- [ ] App store metadata ready
- [ ] Privacy policy updated

## Resources

### Documentation
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://expo.github.io/router)
- [React Navigation](https://reactnavigation.org)

### Libraries
- [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [react-native-aes-crypto](https://github.com/tectiv3/react-native-aes-crypto)

### Tools
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

## Contributing

### Code Review Checklist
- [ ] Follows code style
- [ ] Has error handling
- [ ] Includes comments for complex logic
- [ ] No console.log in production
- [ ] Tested on device
- [ ] No breaking changes

### Commit Messages
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
```

## FAQ

**Q: How do I reset the app?**
A: Settings → Clear App Data (deletes all files)

**Q: Can I recover a deleted file?**
A: No, files are permanently encrypted and deleted

**Q: How do I backup files?**
A: Export encrypted files (future feature)

**Q: Is the encryption secure?**
A: Yes, AES-256-CBC is military-grade encryption

**Q: Can I use the app offline?**
A: Yes, everything works offline

---

**Happy coding! 🚀**
