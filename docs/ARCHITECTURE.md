# 🏗️ Architecture

## Project Structure

```
src/
├── palette/          # Color system
│   ├── core.ts       # Base colors
│   ├── extended.ts   # Semantic colors
│   └── adapters.ts   # HSL transformations
├── generators/       # Theme generators
├── core/            # UI components
├── types/           # TypeScript definitions
├── utils/           # Utilities
└── cli/             # CLI tools
```

## Color System

### Zero Hardcoded Colors

- All colors generated programmatically
- 80+ semantic colors covering VS Code API
- HSL transformations for variants

### Palette Hierarchy

1. **Core** - Base Tokyo Night colors
2. **Extended** - Semantic interface colors
3. **Adaptive** - Seasonal and accessibility variants

## Theme Generation

### Programmatic Generation

```typescript
const springPalette = createAdaptedPalette('spring', {
  hueShift: 15,
  saturationMultiplier: 1.2
})

const theme = generateTheme(springPalette)
```

### Supported Variants

- **Seasonal**: Spring, Summer, Autumn, Winter
- **Accessibility**: High/Low Contrast, Color-blind friendly
- **Creative**: Pastel, Retro, Gradient

## Development Tools

### CLI Commands

```bash
npm run build         # Build main theme
npm run theme-cli     # CLI for custom themes
npm run test         # Run tests
```

### Quality Assurance

- **Structure validation**: VS Code schema compliance
- **Color validation**: WCAG contrast ratios
- **Unit tests**: Core functionality coverage

## Performance

| Metric | Value | Status |
|--------|-------|--------|
| Build time | ~4.5ms | ✅ |
| Hardcoded colors | 0 | ✅ |
| Semantic colors | 80+ | ✅ |
