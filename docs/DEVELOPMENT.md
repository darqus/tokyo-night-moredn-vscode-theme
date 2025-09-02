# 👨💻 Development Guide

## Setup

```bash
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install
```

## Commands

```bash
npm run build         # Build main theme
npm run generate:all  # Generate all 17 variants
npm run test         # Run tests
npm run theme-cli    # CLI for custom themes
```

## Working with Palettes

### Adding Colors
```typescript
// src/palette/extended.ts
export const extendedPalette = {
  myNewColor: hsl(240, 50, 60) // HSL format
}
```

### Creating Variants
```typescript
const autumnPalette = createAdaptedPalette('autumn', {
  hueShift: -30,
  saturationMultiplier: 0.8,
  lightnessOffset: -5
})
```

## Theme Generation

### Custom Themes
```bash
npm run theme-cli -- custom --name=my-theme --hue=60 --saturation=1.3
```

### Programmatic Generation
```typescript
import { generateTheme } from './src/generators/theme'
import { createAdaptedPalette } from './src/palette/adapters'

const customPalette = createAdaptedPalette('custom', {
  hueShift: 45,
  saturationMultiplier: 1.2
})

const theme = generateTheme(customPalette)
```

## Testing

```bash
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
npm run validate     # Validate theme structure
```

## Build & Publish

```bash
npm run build    # Build theme
npm run package  # Create .vsix package
npm run publish  # Publish to Marketplace
```

## Code Structure

### Main Modules
- `src/palette/` - Color palette system
- `src/generators/` - Theme generators
- `src/core/` - Core components
- `src/types/` - TypeScript definitions

### Guidelines
- Use HSL format for colors
- Follow semantic naming
- Add tests for new functionality
- Update documentation for changes

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open Pull Request