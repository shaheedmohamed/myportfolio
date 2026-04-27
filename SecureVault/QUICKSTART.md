# 🚀 Quick Start Guide - Secure Vault

## 5-Minute Setup

### Step 1: Start the App
```bash
cd SecureVault
npm start
```

### Step 2: Run on Your Device
**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

### Step 3: First Launch
1. App opens with lock screen (if PIN is enabled)
2. No PIN set yet → goes directly to Vault tab
3. You'll see "No Files Yet" message

### Step 4: Set Up PIN Protection
1. Tap the **Settings** tab (⚙️)
2. Toggle **PIN Protection** ON
3. Enter a 4-8 digit PIN (e.g., `1234`)
4. Confirm the PIN
5. Tap **Set PIN**

### Step 5: Import Your First File
1. Go to **Vault** tab (🔐)
2. Tap **➕ Import File**
3. Select a photo, video, or audio file
4. File is encrypted and stored securely
5. Original file is deleted from device

### Step 6: Manage Files
- **View**: See all encrypted files with details
- **Delete**: Tap trash icon to remove a file
- **Refresh**: Pull down to refresh the list

## Key Features at a Glance

| Feature | Location | What It Does |
|---------|----------|--------------|
| 🔐 Vault | Main Tab | View and manage encrypted files |
| 📸 Gallery | Gallery Tab | Browse imported media |
| ⚙️ Settings | Settings Tab | PIN setup and app info |
| 🔒 PIN Lock | On App Launch | Protects vault access |
| ➕ Import | Vault Tab | Add new files |
| 🗑️ Delete | File Card | Remove encrypted files |

## File Types Supported

✅ **Images**: JPG, PNG, GIF, WebP, BMP, HEIC, HEIF, TIFF, ICO
✅ **Videos**: MP4, MKV, WebM, MOV, AVI, FLV, WMV
✅ **Audio**: MP3, WAV, M4A, AAC, FLAC, OGG, WMA

## Security Highlights

🔐 **AES-256-CBC Encryption** - Military-grade encryption
🔒 **PIN Protection** - 4-8 digit access control
📁 **Hidden Storage** - Files not visible in gallery
🗑️ **Auto-Delete** - Original files removed after import
🔑 **Secure Keys** - Encryption keys stored securely

## Common Tasks

### Change Your PIN
1. Settings → PIN Protection (toggle ON)
2. Enter current PIN
3. Enter new PIN twice
4. Tap **Change PIN**

### Disable PIN
1. Settings → PIN Protection (toggle OFF)
2. Confirm deletion

### Delete All Files
1. Vault → Delete each file individually
2. Or: Settings → Clear App Data (⚠️ permanent)

## Troubleshooting

**App won't start?**
- Restart the development server: `npm start`
- Clear cache: `npm cache clean --force`

**Can't import files?**
- Check Android/iOS permissions
- Ensure file is not corrupted
- Try a smaller file first

**Forgot PIN?**
- No recovery option (by design)
- Clear app data to reset (deletes all files)

**Files not showing?**
- Pull down to refresh
- Restart the app
- Check if vault directory exists

## Next Steps

1. ✅ Set up PIN protection
2. ✅ Import some test files
3. ✅ Verify files are encrypted
4. ✅ Test PIN lock on app restart
5. ✅ Explore settings

## Tips & Tricks

💡 **Use memorable PIN**: Something you won't forget
💡 **Regular backups**: Export important files periodically
💡 **Test deletion**: Verify original files are deleted
💡 **Check storage**: Monitor app storage usage in settings
💡 **Keep updated**: Check for app updates regularly

## Need Help?

- 📖 Read `VAULT_README.md` for detailed documentation
- 🔍 Check code comments in `/utils` folder
- 🐛 Review error messages in console
- 📱 Test on actual device (emulator may have issues)

---

**Happy securing! 🔐**
