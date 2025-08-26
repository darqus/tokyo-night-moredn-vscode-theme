# 💻 Development Guide

> Complete guide for developers working on the Tokyo Night Lod theme project.

## 🚀 Getting Started

### Prerequisites

Before starting development, ensure you have:

- **Node.js** 18.0 or higher
- **npm** 8.0 or higher
- **VS Code** 1.74.0 or higher
- **TypeScript** 5.9+ (installed via npm)
- **Git** for version control

### Environment Setup

```bash
# Clone the repository
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod

# Install dependencies
npm install

# Setup development environment
npm run setup

# Verify installation
npm run validate
```

### VS Code Workspace Setup

1. **Open the project** in VS Code
2. **Install recommended extensions**:
   - **ESLint** - Code linting
   - **Prettier** - Code formatting
   - **TypeScript** - TypeScript support
3. **Configure workspace**:
   - Open Command Palette (Ctrl+Shift+P)
   - Select "TypeScript: Select TypeScript Version"
   - Choose "Use Workspace Version"

## 📁 Project Structure

```
tokyo-night-vscode-theme-lod/
├── src/                          # Source code
│   ├── palette.ts                # Central color palette
│   ├── build.ts                  # Theme generator
│   ├── tokenColors.ts            # Syntax colors
│   ├── semanticTokenColors.ts   # Semantic colors
│   ├── components/               # Theme components
│   ├── theme/                    # Theme modules
│   │   ├── activityBar.ts        # Activity bar colors
│   │   ├── editor.ts             # Editor colors
│   │   ├── sideBar.ts            # Sidebar colors
│   │   ├── statusBar.ts          # Status bar colors
│   │   ├── terminal.ts           # Terminal colors
│   │   └── ...                   # Other theme components
│   ├── utils/                    # Utility functions
│   │   ├── color.ts              # Color utilities
│   │   └── colorSystem.ts        # Color system utilities
│   ├── types/                    # TypeScript types
│   │   ├── palette.ts            # Color palette types
│   │   └── theme.ts              # Theme types
│   ├── validation/               # Validation utilities
│   │   ├── allowedProperties.ts  # Allowed theme properties
│   │   ├── propertyValidator.ts  # Property validation
│   │   └── themeValidator.ts     # Theme validation
│   ├── scripts/                  # Build scripts
│   │   └── validate-theme.ts     # Theme validation script
│   └── variants/                 # Theme variants
│       ├── index.ts              # Variant definitions
│       └── themeBuilder.ts       # Theme builder
├── themes/                       # Generated themes
│   └── tokyo-night-dark-color-theme.json
├── docs/                         # Documentation
├── scripts/                      # Automation scripts
│   ├── build-monitor.js          # Build monitoring
│   ├── bundle-analyzer.js        # Bundle analysis
│   ├── cli.ts                    # CLI interface
│   ├── lint-hex.ts               # Hex color linting
│   ├── release.ts                # Release management
│   ├── setup-dev.js              # Development setup
│   ├── smart-version.ts          # Smart versioning
│   ├── smoke-compare.ts          # Smoke testing
│   ├── test-smart-version.ts     # Version testing
│   ├── theme-debug.js            # Theme debugging
│   └── visual-test.js            # Visual testing
├── tests/                        # Test files
│   └── unit/                     # Unit tests
│       ├── colorUtils.test.ts    # Color utility tests
│       ├── palette.test.ts       # Palette tests
│       └── theme.test.ts         # Theme tests
├── analysis/                     # Analysis and optimization
├── static/                       # Static assets
└── configuration files           # Various config files
```

## 🛠️ Development Workflow

### 1. Making Changes

#### Color Changes

```bash
# Edit color palette
nano src/palette.ts

# Build theme
npm run build

# Test changes
npm run test
```

#### Theme Component Changes

```bash
# Edit specific theme component
nano src/theme/editor.ts

# Build and validate
npm run build
npm run validate
```

#### New Features

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... (your changes)

# Test thoroughly
npm run test
npm run validate

# Commit changes
git commit -m "feat: add new feature description"
```

### 2. Building and Testing

```bash
# Build theme from source
npm run build

# Run all tests
npm run test

# Run specific test types
npm run test:unit
npm run test:visual
npm run test:smoke

# Validate theme structure
npm run validate

# Lint code
npm run lint

# Format code
npm run format
```

### 3. Debugging

```bash
# Debug theme generation
npm run debug:theme

# Visual testing with comparison
npm run test:visual

# Theme validation with detailed output
npm run validate:verbose

# Check color contrast
npm run lint:colors
```

## 🎨 Working with Colors

### Color System Architecture

The project uses a centralized color system:

```typescript
// src/palette.ts
export const palette = {
  // Base colors
  base: {
    black: '#1a1b26',
    dark0: '#16161e',
    dark1: '#1f2336',
    // ... more base colors
  },

  // UI colors
  ui: {
    background: '#1a1b26',
    foreground: '#a9b1d6',
    // ... more UI colors
  },

  // Syntax colors
  syntax: {
    keyword: '#bb9af7',
    string: '#9ece6a',
    // ... more syntax colors
  }
};
```

### Adding New Colors

```typescript
// 1. Add to palette
export const palette = {
  // ... existing colors
  newColor: {
    primary: '#your-color',
    secondary: '#your-secondary-color'
  }
};

// 2. Update types
// src/types/palette.ts
export interface Palette {
  // ... existing properties
  newColor: {
    primary: string;
    secondary: string;
  };
}

// 3. Use in theme components
// src/theme/editor.ts
import { palette } from '../palette';

export const editor = {
  // ... existing colors
  newFeature: {
    background: palette.newColor.primary,
    foreground: palette.newColor.secondary
  }
};
```

### Color Validation

```bash
# Validate color contrast ratios
npm run lint:colors

# Check color consistency
npm run validate:colors

# Generate color analysis
npm run analyze:colors
```

## 🧪 Testing

### Unit Tests

```typescript
// tests/unit/colorUtils.test.ts
import { hexToRgb, rgbToHex } from '../../src/utils/color';

describe('Color Utilities', () => {
  test('hexToRgb converts hex to rgb', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  test('rgbToHex converts rgb to hex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });
});
```

### Integration Tests

```typescript
// tests/integration/theme.test.ts
import { buildTheme } from '../../src/build';
import { validateTheme } from '../../src/validation/themeValidator';

describe('Theme Integration', () => {
  test('builds valid theme', () => {
    const theme = buildTheme();
    const validation = validateTheme(theme);
    expect(validation.isValid).toBe(true);
  });
});
```

### Visual Tests

```typescript
// tests/visual/visual.test.ts
import { compareWithReference } from '../../scripts/visual-test';

describe('Visual Testing', () => {
  test('matches reference theme', async () => {
    const result = await compareWithReference();
    expect(result.matches).toBe(true);
  });
});
```

## 🔧 Scripts and Tools

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Build with watch mode
npm run build:watch

# Development setup
npm run setup

# Clean build artifacts
npm run clean
```

### Analysis Scripts

```bash
# Analyze bundle size
npm run analyze:bundle

# Analyze color usage
npm run analyze:colors

# Analyze theme structure
npm run analyze:structure

# Performance analysis
npm run analyze:performance
```

### Quality Assurance

```bash
# Full quality check
npm run qa

# Code quality check
npm run lint

# Type checking
npm run type-check

# Security audit
npm run audit

# Documentation generation
npm run docs:generate
```

## 🚀 Deployment and Release

### Preparing for Release

```bash
# Update version (automatic)
npm run version

#
