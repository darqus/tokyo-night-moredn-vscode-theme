# Tokyo Night Lod

[![Version](https://img.shields.io/visual-studio-marketplace/v/lod-inc.tokyo-night-lod.svg)](https://marketplace.visualstudio.com/items?itemName=lod-inc.tokyo-night-lod)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/lod-inc.tokyo-night-lod.svg)](https://marketplace.visualstudio.com/items?itemName=lod-inc.tokyo-night-lod&ssr=false#review-details)
[![Issues](https://img.shields.io/github/issues/darqus/tokyo-night-vscode-theme-lod)](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A refined dark theme for VS Code with improved contrast and modern TypeScript architecture.

![Tokyo Night Lod Theme](https://github.com/darqus/tokyo-night-vscode-theme-lod/blob/main/static/ss_tokyo_night_dark.png?raw=true)

## 🚀 Installation

**Via VS Code Marketplace:**

1. Open VS Code Extensions (`Ctrl+Shift+X`)
2. Search for "Tokyo Night Lod"
3. Click Install

**Via Command Line:**

```bash
code --install-extension lod-inc.tokyo-night-lod
```

## ✨ Features

- **Refined Colors** - Carefully balanced palette for optimal readability
- **Enhanced Accessibility** - Improved visibility for better accessibility
- **TypeScript Build** - Modern, maintainable theme generation
- **Smart Versioning** - Automated release management
- **Quality Assurance** - Comprehensive validation pipeline
- **Performance Monitoring** - Build time and resource usage tracking

## 🛠️ Development

### Quick Start

```bash
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install
npm run build
```

### Key Files

- `src/palette.ts` - Central color definitions
- `src/build.ts` - Theme generator
- `src/tokenColors.ts` - Syntax highlighting rules

### Commands

```bash
npm run build        # Build theme
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:visual  # Run visual regression tests
npm run analyze      # Analyze theme bundle
npm run debug        # Debug theme properties
npm run setup        # Set up development environment
```

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md) - Build and modify themes
- [Color System](./docs/COLOR_SYSTEM.md) - Comprehensive color system documentation
- [Semantic Tokens](./docs/SEMANTIC_TOKENS.md) - Semantic token style guide
- [Contribution Guidelines](./docs/CONTRIBUTING.md) - How to contribute to the project
- [Architecture](./docs/ARCHITECTURE.md) - Project structure
- [Color Playground](./docs/playground.html) - Interactive color combination testing

## 🎨 Color Highlights

| Element | Color | Usage |
|---------|-------|-------|
| Keywords | `#bb9af7` | `const`, `function`, `class` |
| Strings | `#9ece6a` | Text content |
| Functions | `#7aa2f7` | Function names |
| Comments | `#545c7e` | Code comments |

## ♿ Accessibility

The Tokyo Night Lod theme includes:

- **Enhanced Visibility** - Improved contrast for better readability
- **WCAG Compliance** - All color combinations meet accessibility standards
- **Color Blindness Support** - Tested for common forms of color vision deficiency

## 🧪 Testing

Our comprehensive testing suite includes:

- **Unit Tests** - For utility functions and color operations
- **Visual Regression Tests** - To ensure UI consistency
- **Theme Validation** - To verify theme properties and quality
- **Performance Benchmarks** - To monitor build times and resource usage

Based on the original [Tokyo Night theme](https://github.com/enkia/tokyo-night-vscode-theme).
