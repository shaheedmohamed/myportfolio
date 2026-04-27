# 🏗️ Secure Vault - Architecture & Design

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                       │
│  ┌──────────────┬──────────────┬──────────────────┐    │
│  │ Vault Tab    │ Gallery Tab  │ Settings Tab     │    │
│  │ (Import)     │ (View Media) │ (PIN Setup)      │    │
│  └──────────────┴──────────────┴──────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Business Logic Layer                   │
│  ┌──────────────┬──────────────┬──────────────────┐    │
│  │ fileManager  │ encryption   │ pinLock          │    │
│  │ (Import/Del) │ (AES-256)    │ (PIN Auth)       │    │
│  └──────────────┴──────────────┴──────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Storage & Security Layer               │
│  ┌──────────────┬──────────────┬──────────────────┐    │
│  │ File System  │ Secure Store │ Crypto           │    │
│  │ (Encrypted)  │ (Keys)       │ (Hash/Encrypt)   │    │
│  └──────────────┴──────────────┴──────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Core Components

### 1. **Encryption Module** (`utils/encryption.js`)

**Responsibility**: Handle all cryptographic operations

**Key Functions**:
- `generateEncryptionKey()`: Creates AES-256 key + IV
- `getEncryptionKey()`: Retrieves or generates key
- `encryptFile()`: Encrypts file and stores in vault
- `decryptFile()`: Decrypts file for viewing
- `ensureVaultDirectory()`: Creates vault directory with `.nomedia`

**Data Flow**:
```
User File → Read as Base64 → AES Encrypt → Store as .enc
Encrypted File → Read → AES Decrypt → Return Base64
```

**Security Measures**:
- Keys stored in `expo-secure-store` (platform-native secure storage)
- 32-byte random key (256-bit)
- 16-byte random IV (128-bit)
- CBC mode for block encryption

### 2. **File Manager Module** (`utils/fileManager.js`)

**Responsibility**: Manage file lifecycle and metadata

**Key Functions**:
- `importFile()`: Select and encrypt file
- `getVaultFiles()`: Retrieve file list from metadata
- `addFileToMetadata()`: Add file entry to metadata.json
- `deleteVaultFile()`: Remove encrypted file
- `deleteOriginalFile()`: Delete source file after import

**File Structure**:
```
{DocumentDirectory}/vault/
├── metadata.json          # File list (JSON)
├── .nomedia              # Prevents gallery indexing
├── file1.jpg.enc         # Encrypted file 1
├── file2.mp4.enc         # Encrypted file 2
└── file3.mp3.enc         # Encrypted file 3
```

**Metadata Format**:
```json
[
  {
    "id": "1234567890",
    "originalName": "photo.jpg",
    "encryptedName": "photo.jpg.enc",
    "encryptedPath": "/path/to/vault/photo.jpg.enc",
    "type": "image/jpeg",
    "size": 2048576,
    "importedAt": "2024-04-26T17:30:00Z",
    "originalUri": "file:///storage/emulated/0/DCIM/photo.jpg"
  }
]
```

### 3. **PIN Lock Module** (`utils/pinLock.js`)

**Responsibility**: Handle authentication and PIN management

**Key Functions**:
- `setPIN()`: Create new PIN (4-8 digits)
- `verifyPIN()`: Verify PIN on app launch
- `isPINEnabled()`: Check if PIN protection is active
- `changePIN()`: Change existing PIN
- `removePIN()`: Disable PIN protection

**PIN Storage**:
- PIN never stored in plain text
- Hashed with SHA-256
- Stored in `expo-secure-store`
- Verification: Hash input → Compare with stored hash

**Security Flow**:
```
User PIN Input → SHA-256 Hash → Compare with Stored Hash
Match → Grant Access
No Match → Deny Access
```

## Data Flow Diagrams

### Import File Flow
```
1. User taps "Import File"
   ↓
2. DocumentPicker opens
   ↓
3. User selects file
   ↓
4. Read file as Base64
   ↓
5. Get encryption key from secure store
   ↓
6. Encrypt file (AES-256-CBC)
   ↓
7. Save encrypted file to vault/
   ↓
8. Add metadata entry to metadata.json
   ↓
9. Delete original file from device
   ↓
10. Show success alert
```

### Access File Flow
```
1. App launches
   ↓
2. Check if PIN enabled
   ↓
3. If yes → Show lock screen
   ↓
4. User enters PIN
   ↓
5. Verify PIN (SHA-256 comparison)
   ↓
6. If correct → Load vault
   ↓
7. Read metadata.json
   ↓
8. Display file list
```

### Delete File Flow
```
1. User taps delete on file
   ↓
2. Show confirmation alert
   ↓
3. User confirms
   ↓
4. Delete encrypted file from disk
   ↓
5. Remove metadata entry
   ↓
6. Save updated metadata.json
   ↓
7. Refresh file list
```

## Screen Architecture

### Lock Screen (`app/lock.jsx`)
- **Purpose**: PIN authentication on app launch
- **State**: PIN input, loading state
- **Actions**: Verify PIN, navigate to vault
- **Conditional**: Only shows if PIN enabled

### Vault Screen (`app/(tabs)/index.tsx`)
- **Purpose**: Main file management interface
- **State**: Files list, loading, refreshing
- **Actions**: Import file, delete file, refresh
- **Components**: File cards, empty state, import button

### Settings Screen (`app/(tabs)/settings.tsx`)
- **Purpose**: App configuration and security
- **State**: PIN enabled, setup form
- **Actions**: Set PIN, change PIN, disable PIN
- **Components**: Toggle switch, input fields, info items

### Gallery Screen (`app/(tabs)/explore.tsx`)
- **Purpose**: Browse imported media (future enhancement)
- **State**: Media list, preview
- **Actions**: View media, share (encrypted)

## State Management

### Global State
- **PIN Enabled**: Stored in secure store
- **Encryption Key**: Stored in secure store
- **File List**: Stored in metadata.json

### Component State
- **Vault Screen**: Files, loading, refreshing
- **Settings Screen**: PIN enabled, form inputs
- **Lock Screen**: PIN input, loading

### State Persistence
- Secure store: PIN hash, encryption key
- File system: Encrypted files, metadata
- Component state: UI state only (temporary)

## Security Architecture

### Layers of Protection

**Layer 1: Access Control**
- PIN-based authentication
- SHA-256 hashing
- Secure storage of PIN hash

**Layer 2: Data Encryption**
- AES-256-CBC encryption
- Random key generation
- Secure IV management

**Layer 3: Storage Security**
- App-private directory
- `.nomedia` file (prevents indexing)
- File permissions (app-only access)

**Layer 4: Key Management**
- Keys never in plain text
- Stored in platform-native secure storage
- Generated on first use
- Never transmitted

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| Unauthorized access | PIN protection + SHA-256 |
| File theft | AES-256-CBC encryption |
| Key exposure | Secure store (platform-native) |
| Gallery discovery | `.nomedia` file + app-private dir |
| Original file recovery | Automatic deletion after import |
| Metadata exposure | Stored with encrypted files |
| Brute force PIN | No rate limiting (design choice) |

## Performance Considerations

### File Operations
- **Import**: O(n) where n = file size
- **Encryption**: Depends on file size (AES-256)
- **Decryption**: Depends on file size (AES-256)
- **Metadata**: O(m) where m = number of files

### Optimization Strategies
- Lazy loading of file list
- Async file operations (non-blocking UI)
- Efficient metadata storage (JSON)
- No in-memory caching of encrypted data

### Storage Limits
- No built-in size limit
- Limited by device storage
- Metadata grows linearly with files
- Each file adds ~200 bytes to metadata

## Scalability

### Current Limitations
- Metadata stored as single JSON file
- No pagination of file list
- No search/filtering
- No cloud sync

### Future Improvements
- Database instead of JSON (SQLite)
- Pagination for large file lists
- Search and filtering
- Cloud backup (encrypted)
- Batch operations

## Testing Strategy

### Unit Tests
- Encryption/decryption
- PIN hashing/verification
- File metadata operations

### Integration Tests
- Full import flow
- PIN setup and verification
- File deletion

### Manual Testing
- Import various file types
- Test on actual device
- Verify original file deletion
- Test PIN lock on restart

## Deployment

### Build Process
```bash
eas build --platform android
eas build --platform ios
```

### Release Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] PIN protection working
- [ ] File encryption verified
- [ ] Original files deleted
- [ ] Metadata correct
- [ ] Performance acceptable
- [ ] Security review passed

## Future Enhancements

### Phase 2
- [ ] Biometric authentication
- [ ] File preview (images/videos)
- [ ] Media player
- [ ] Search and filtering

### Phase 3
- [ ] Cloud backup (encrypted)
- [ ] File sharing (encrypted)
- [ ] Batch operations
- [ ] Advanced encryption options

### Phase 4
- [ ] Fake calculator stealth mode
- [ ] Decoy PIN feature
- [ ] App lock timeout
- [ ] Advanced analytics

## Dependencies & Versions

| Package | Version | Purpose |
|---------|---------|---------|
| react-native | 0.81.5 | Mobile framework |
| expo | ~54.0.33 | Development platform |
| expo-router | ~6.0.23 | Navigation |
| expo-file-system | ^55.0.17 | File operations |
| expo-secure-store | ^55.0.13 | Key storage |
| react-native-aes-crypto | ^3.3.0 | AES encryption |
| expo-crypto | ^12.0.0 | Hashing |
| expo-document-picker | ^55.0.13 | File selection |

---

**Architecture Version**: 1.0.0
**Last Updated**: April 2026
**Status**: Production Ready
