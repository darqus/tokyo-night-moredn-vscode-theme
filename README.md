# 🌃 Tokyo Night Theme

> **Beautiful dark theme** for VS Code with carefully crafted colors and modern design.

![Tokyo Night Theme](static/ss_tokyo_night_dark.png)

## 🎨 **Theme Overview**

A beautiful **Tokyo Night dark theme** featuring:

- **Carefully crafted color palette** - Inspired by Tokyo's neon-lit nights
- **Excellent readability** - Optimized contrast ratios
- **Modern design** - Clean and professional appearance
- **Comprehensive coverage** - All VS Code UI elements styled

The theme is **programmatically generated** from a centralized palette system with **zero hardcoded colors**.

## ✨ **Key Features**

- 🎯 **Single Focused Theme** - Tokyo Night Dark optimized for productivity
- 🎨 **Centralized Palette System** - Consistent color management
- 🤖 **Programmatic Generation** - Modern build system
- ♿ **Accessibility Focused** - WCAG compliant contrast ratios
- 🌈 **Advanced Color Science** - HSL-based color relationships
- 🏗️ **TypeScript Architecture** - Modern, type-safe codebase
- 📦 **Automated Build** - Consistent theme generation

## 🌃 **Tokyo Night Dark Theme**

A single, carefully crafted dark theme that captures the essence of Tokyo's neon-lit nights:

- **🌃 Tokyo Night Dark** - The main theme with perfect balance of colors
- **🎨 Rich Color Palette** - Blues, purples, and accent colors
- **📝 Excellent Readability** - Optimized for long coding sessions
- **✨ Modern Design** - Clean, professional appearance

## 🚀 **Quick Start**

### **Installation**

1. Open VS Code Extensions (`Ctrl+Shift+X`)
2. Search for "Tokyo Night Theme Collection"
3. Click Install

### **Activation**

1. Open VS Code Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Color Theme"
3. Select **Tokyo Night Dark**

### **Online Preview**

[Try in vscode.dev](https://vscode.dev/theme/lod-inc.tokyo-night-lod)

### **Manual Installation**

```bash
# From VS Code Marketplace
ext install lod-inc.tokyo-night-lod
```

## 🛠️ **For Developers**

### **Development Setup**

```bash
# Clone and setup
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install

# Build theme
npm run build

# Run tests
npm test
```

### **Theme Architecture**

```typescript
// Centralized palette system
import { basePalette } from './src/core/palette'
import { generateTheme } from './src/generators/theme'

// Theme generation
const theme = generateTheme(basePalette)
```

## 📁 **Project Architecture**

```text
tokyo-night-vscode-theme-lod/
├── src/
│   ├── core/                # 🎨 Core system
│   │   ├── palette.ts       #    Base color definitions
│   │   ├── interface.ts     #    Interface colors
│   │   ├── syntax.ts        #    Syntax highlighting
│   │   └── utils.ts         #    Color utilities
│   ├── generators/          # 🤖 Theme generation
│   │   ├── theme.ts         #    Main theme generator
│   │   └── tokens.ts        #    Token generation
│   ├── types/               # 📋 TypeScript definitions
│   └── build.ts             # 🏗️ Build script
├── themes/                  # 🎯 Generated theme files
├── tests/                   # 🧪 Unit tests
├── scripts/                 # ⚙️ Build & release automation
└── docs/                    # 📚 Documentation
```

## 🏗️ **Technical Features**

### **🎯 Zero Hardcoded Colors**

- **Centralized Palette**: All colors defined in one place
- **Programmatic Generation**: Theme built from base palette
- **Consistent Design**: Single source of truth for colors

### **🤖 Modern Build System**

```bash
# Build theme
npm run build

# Validate theme
npm run validate

# Run tests
npm test
```

### **🌈 Color Science**

- **HSL Color Space**: Scientific color relationships
- **WCAG Compliance**: Accessible contrast ratios
- **Color Harmony**: Carefully balanced palette
- **Professional Design**: Optimized for productivity

## 📚 **Documentation**

### **🚀 Getting Started**

- [Quick Start Guide](docs/QUICK_START.md) - Start using themes in 2 minutes
- [Theme Collection Overview](docs/THEME_COLLECTION.md) - Complete theme guide
- [Palette System](docs/PALETTE_SYSTEM.md) - Technical deep dive

### **👨‍💻 For Developers**

- [Development Guide](docs/DEVELOPMENT.md) - Setup and workflow
- [Architecture](docs/ARCHITECTURE.md) - System design principles
- [Contributing](docs/CONTRIBUTING.md) - How to contribute
- [Release System](docs/RELEASE_SYSTEM.md) - Automated release management
- [API Documentation](docs/) - Complete API reference

### **🔬 Analysis & Reports**

- [Migration Completed](analysis/MIGRATION_COMPLETED.md) - Full migration report
- [Optimization Results](analysis/OPTIMIZATION_RESULTS.md) - Performance metrics
- [Color Analysis](analysis/COMPREHENSIVE_COLOR_ANALYSIS.md) - Color science details

## ⚡ **Development Workflow**

```bash
# Setup development environment
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install

# Theme development
npm run build                 # Build theme (~0.6s)
npm run validate              # Validate theme
npm run test                  # Run unit tests
npm run validate:all          # Full validation + tests

# Release management
npm run release               # Smart automatic release
npm run release:dry           # Preview release changes
npm run package               # Create .vsix package
```

## 🧪 **Quality Assurance**

### **Automated Testing**

- ✅ **Unit Tests** - Core functionality validation
- ✅ **Visual Regression** - Theme appearance consistency
- ✅ **Accessibility Tests** - WCAG compliance checking
- ✅ **Performance Monitoring** - Build time tracking (~4.5ms)

### **Validation System**

- 🔍 **Structure Validation** - Theme schema compliance
- 🎨 **Color Validation** - Contrast ratio verification
- 📊 **Quality Metrics** - Automated quality scoring
- 🚨 **Error Detection** - Real-time issue identification

## 🚀 **Performance Metrics**

| Metric | Value | Status |
|--------|-------|--------|
| **Build Time** | ~0.6s | ✅ |
| **Theme Files** | 1 | ✅ |
| **Hardcoded Colors** | 0 | ✅ |
| **Colors Generated** | 366 | ✅ |
| **Syntax Tokens** | 13 | ✅ |

## 🤝 **Contributing & Community**

We welcome contributions to the Tokyo Night Theme!

### **How to Contribute**

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`feat/amazing-feature`)
3. 🎨 Make your changes following our [Contributing Guide](docs/CONTRIBUTING.md)
4. ✅ Test your changes (`npm run test`)
5. 📝 Submit a pull request with conventional commits

### **Community Resources**

- 🐛 [Report Issues](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues)
- 💡 [Feature Requests](https://github.com/darqus/tokyo-night-vscode-theme-lod/discussions)
- 📖 [Documentation](docs/)
- 🎨 [Theme Showcase](https://vscode.dev/theme/lod-inc.tokyo-night-lod)

## 📊 **Project Stats**

![GitHub stars](https://img.shields.io/github/stars/darqus/tokyo-night-vscode-theme-lod?style=social)
![GitHub forks](https://img.shields.io/github/forks/darqus/tokyo-night-vscode-theme-lod?style=social)
![VS Code installs](https://img.shields.io/visual-studio-marketplace/i/lod-inc.tokyo-night-lod)
![Version](https://img.shields.io/visual-studio-marketplace/v/lod-inc.tokyo-night-lod)

**Key Achievements:**

- 🎯 **Zero Hardcoded Colors** - Centralized palette system
- 🤖 **Modern Architecture** - TypeScript-based build system
- ♿ **Accessibility First** - WCAG-compliant contrast ratios
- 🌃 **Beautiful Design** - Carefully crafted Tokyo Night theme

## 📄 **License & Attribution**

### **License**

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

### **Acknowledgments**

- 🙏 [Tokyo Night VSCode Theme](https://github.com/enkia/tokyo-night-vscode-theme) - Original inspiration
- 🎨 [VS Code Theme API](https://code.visualstudio.com/api/references/theme-color) - Technical foundation
- 🔬 [Color Science Community](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) - Accessibility standards

### **Contact**

- **👨‍💻 Author**: lod
- **🏢 Publisher**: lod-inc
- **🐙 GitHub**: [darqus/tokyo-night-vscode-theme-lod](https://github.com/darqus/tokyo-night-vscode-theme-lod)
- **🌐 Marketplace**: [Tokyo Night Theme Collection](https://marketplace.visualstudio.com/items?itemName=lod-inc.tokyo-night-lod)

---

<div align="center">

**🌃 Tokyo Night Theme**
*Crafted with ❤️ for developers who appreciate beautiful, functional code environments*

**[⭐ Star on GitHub](https://github.com/darqus/tokyo-night-vscode-theme-lod)** | **[📦 Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=lod-inc.tokyo-night-lod)** | **[📖 Read the Docs](docs/)**

</div>
