# 🚀 Quick Start Guide

> Fast and simple installation and setup guide for Tokyo Night Lod theme.

## 📥 Installation

### From VS Code Marketplace (Recommended)

1. **Open VS Code**
2. **Go to Extensions** (Ctrl+Shift+X)
3. **Search for** "Tokyo Night Lod"
4. **Click Install**
5. **Wait for installation** to complete

### From VSIX File

1. **Download the latest VSIX** from [Releases](https://github.com/darqus/tokyo-night-vscode-theme-lod/releases)
2. **Open VS Code**
3. **Go to Extensions** (Ctrl+Shift+X)
4. **Click "..."** (More Actions)
5. **Select "Install from VSIX..."**
6. **Choose the downloaded VSIX file**

### Manual Installation

1. **Download the theme file** from the repository
2. **Place it in your VS Code themes directory**:
   - **Windows**: `%USERPROFILE%\.vscode\extensions`
   - **macOS**: `~/.vscode/extensions`
   - **Linux**: `~/.vscode/extensions`
3. **Restart VS Code**

## 🎨 Theme Activation

### Method 1: Command Palette

1. **Open Command Palette** (Ctrl+Shift+P)
2. **Type** "Preferences: Color Theme"
3. **Select** "Tokyo Night Lod"
4. **Theme will be applied immediately**

### Method 2: Settings

1. **Open Settings** (Ctrl+,)
2. **Search for** "color theme"
3. **In "Workbench" > "Color Theme"**
4. **Select** "Tokyo Night Lod"
5. **Settings are saved automatically**

### Method 3: settings.json

1. **Open settings.json** (Ctrl+Shift+P > "Preferences: Open Settings (JSON)")
2. **Add or update** the theme setting:

```json
{
  "workbench.colorTheme": "Tokyo Night Lod"
}
```

## ✅ Verification

### Check Theme is Applied

1. **Look at the editor** - Colors should change immediately
2. **Check the status bar** - Should have dark theme colors
3. **Verify syntax highlighting** - Code should be properly colored

### Test Different File Types

Open files with different extensions to test syntax highlighting:

```bash
# JavaScript/TypeScript
index.js
app.ts

# HTML/CSS
index.html
styles.css

# Configuration
package.json
tsconfig.json

# Markdown
README.md
```

## ⚙️ Basic Customization

### Font Settings

For the best experience with Tokyo Night Lod, recommended font settings:

```json
{
  "editor.fontFamily": "Fira Code, 'Courier New', monospace",
  "editor.fontSize": 14,
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.6
}
```

### Editor Settings

Recommended editor settings for optimal appearance:

```json
{
  "editor.minimap.enabled": true,
  "editor.renderLineHighlight": "all",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "workbench.activityBar.visible": true,
  "workbench.sideBar.location": "left"
}
```

### Terminal Settings

For consistent terminal appearance:

```json
{
  "terminal.integrated.fontFamily": "Fira Code, monospace",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.lineHeight": 1.4
}
```

## 🔧 Troubleshooting

### Theme Not Applied

**Problem**: Theme is installed but not visible.

**Solutions**:

1. **Restart VS Code** - Sometimes a restart is required
2. **Check theme selection** - Verify "Tokyo Night Lod" is selected
3. **Check for conflicts** - Disable other theme extensions
4. **Reinstall theme** - Uninstall and install again

### Syntax Highlighting Issues

**Problem**: Code is not properly colored.

**Solutions**:

1. **Check file association** - Ensure file type is recognized
2. **Reload VS Code window** (Ctrl+Shift+P > "Developer: Reload Window")
3. **Check for syntax extensions** - Install language-specific extensions
4. **Verify theme compatibility** - Ensure theme supports the language

### Performance Issues

**Problem**: VS Code is slow after theme installation.

**Solutions**:

1. **Disable unnecessary extensions**
2. **Reduce editor settings complexity**
3. **Clear VS Code cache**
4. **Check system resources**

## 🎯 Next Steps

### Explore Theme Features

- **Color Palette**: See all available colors in [Color Palette](COLOR_PALETTE.md)
- **Customization**: Learn about advanced customization in [Color System](COLOR_SYSTEM.md)
- **Semantic Tokens**: Understand semantic highlighting in [Semantic Tokens](SEMANTIC_TOKENS.md)

### For Developers

- **Development Setup**: See [Development Guide](DEVELOPMENT.md)
- **Contributing**: Learn how to contribute in [Contributing](CONTRIBUTING.md)
- **Architecture**: Understand project structure in [Architecture](ARCHITECTURE.md)

### Stay Updated

- **Watch Repository**: Get notified about updates
- **Check Releases**: See new features and bug fixes
- **Report Issues**: Help improve the theme

## 📞 Support

### Getting Help

- **Documentation**: Browse all documentation in [docs/](./)
- **Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas

### Common Questions

**Q: Is this theme free?**
A: Yes, Tokyo Night Lod is completely free and open source.

**Q: Does it work with other extensions?**
A: Yes, it's compatible with most VS Code extensions.

**Q: Can I customize the colors?**
A: Yes, you can override colors in your VS Code settings.

**Q: How often is it updated?**
A: Regularly updated with bug fixes and improvements.

---

## 🎉 You're Ready

Congratulations! You've successfully installed and set up Tokyo Night Lod theme. Enjoy coding with beautiful colors and excellent readability!

**Happy coding with Tokyo Night Lod!** 🎨✨
