# Tokyo Night Lod

> Enhanced version of Tokyo Night theme with improved contrast and modern TypeScript architecture.

![Tokyo Night Lod](static/ss_tokyo_night_dark.png)

## ✨ Features

- 🎨 **Optimized color palette** - Enhanced contrast and readability
- 🏗️ **Modern TypeScript architecture** - Type safety and modularity
- 🤖 **Automated build process** - Theme generation from source code
- 🧪 **Comprehensive testing** - Validation and visual testing
- 📚 **Complete documentation** - Detailed guides in English
- 🔧 **Smart versioning** - Automated releases based on conventional commits

## 🚀 Quick Start

### Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Tokyo Night Lod"
4. Click Install

### Activation

1. Open Command Palette (Ctrl+Shift+P)
2. Type "Preferences: Color Theme"
3. Select "Tokyo Night Lod"

## 📁 Project Structure

```
tokyo-night-vscode-theme-lod/
├── src/                    # Source code
│   ├── palette.ts          # Central color palette
│   ├── build.ts            # Theme generator
│   ├── tokenColors.ts      # Syntax colors
│   ├── semanticTokenColors.ts # Semantic colors
│   ├── theme/              # Theme components
│   ├── utils/              # Utilities
│   ├── types/              # TypeScript types
│   └── validation/         # Validation
├── themes/                 # Generated themes
├── docs/                   # Documentation
├── scripts/                # Automation scripts
├── tests/                  # Tests
└── analysis/               # Analysis and optimization
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- VS Code 1.74+
- TypeScript 5.9+

### Environment Setup

```bash
# Clone repository
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod

# Install dependencies
npm install

# Setup environment
npm run setup
```

### Main Commands

```bash
# Build theme
npm run build

# Validation
npm run validate

# Testing
npm run test

# Linting
npm run lint

# Publishing
npm run release
```

## 📚 Documentation

### Main Guides

- [🚀 Quick Start](docs/QUICK_START.md) - Getting started quickly
- [🏗️ Architecture](docs/ARCHITECTURE.md) - Structure and design principles
- [🎨 Color System](docs/COLOR_SYSTEM.md) - Color palette and system
- [🌈 Color Palette](docs/COLOR_PALETTE.md) - Complete color palette

### For Developers

- [💻 Development](docs/DEVELOPMENT.md) - Developer guide
- [🤝 Contributing](docs/CONTRIBUTING.md) - How to contribute
- [🧪 Validation](docs/VALIDATION.md) - Validation process
- [🎯 Semantic Tokens](docs/SEMANTIC_TOKENS.md) - Semantic highlighting

### Automation

- [🤖 Smart Versioning](docs/SMART_VERSIONING.md) - Versioning system
- [📝 Documentation Changes](docs/DOCUMENTATION_CHANGES.md) - Change history

## 🎨 Color System

### Core Principles

- **Single source of truth** - All colors defined in `src/palette.ts`
- **Type safety** - TypeScript for all color structures
- **Modularity** - Clear separation of color categories
- **Optimization** - Scientifically-based color selection

### Color Categories

- **Background** - Editor and interface backgrounds
- **Foreground** - Text colors with varying opacity
- **Accent** - Brand colors and highlights
- **Syntax** - Code syntax colors
- **Semantic** - Semantic tokens
- **UI** - VS Code interface elements

## 🧪 Testing

### Test Types

- **Unit tests** - Testing utilities and functions
- **Validation** - Theme structure verification
- **Visual testing** - Comparison with reference
- **Smoke testing** - Basic functionality

### Running Tests

```bash
# All tests
npm run test

# Unit tests only
npm run test:unit

# Visual testing
npm run test:visual

# With coverage
npm run test:coverage
```

## 🔄 Versioning

### Conventional Commits

The project uses conventional commits for automatic versioning:

```bash
# New feature
feat: add new color variant

# Bug fix
fix: correct contrast ratio

# Documentation
docs: update README

# Code style
style: format code
```

### Versioning Commands

```bash
# Automatic release
npm run release

# Dry run
npm run release:dry

# Force version update
npm run release:force
```

## 🤝 Contributing

We welcome contributions to the project! Please read the [contributing guide](docs/CONTRIBUTING.md).

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make changes following conventional commits
4. Test your changes
5. Submit a pull request

## 📄 License

The project is licensed under MIT. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Tokyo Night VSCode Theme](https://github.com/enkia/tokyo-night-vscode-theme) - Original theme
- [VS Code Theme Documentation](https://code.visualstudio.com/api/references/theme-color) - VS Code documentation
- [Contrast Ratio Checker](https://webaim.org/resources/contrastchecker/) - Contrast checking tool

## 📞 Contact

- **Author**: lod
- **Publisher**: lod-inc
- **GitHub**: [darqus/tokyo-night-vscode-theme-lod](https://github.com/darqus/tokyo-night-vscode-theme-lod)
- **Issues**: [Report an issue](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues)

---

**Tokyo Night Lod** - A theme crafted with love for code and attention to detail. ❤️
