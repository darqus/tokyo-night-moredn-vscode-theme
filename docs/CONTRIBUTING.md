# 🤝 Contributing

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/tokyo-night-vscode-theme-lod.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feat/your-feature`

## Development

### Build and Test
```bash
npm run build     # Build theme
npm run test      # Run tests
```

### Adding Colors
```typescript
// src/palette/extended.ts
export const extendedPalette = {
  // Add new semantic color
  myNewColor: hsl(240, 50, 60)
}
```

### Creating Theme Variants
```typescript
// Use adaptive system
const myVariant = createAdaptedPalette('my-variant', {
  hueShift: 30,
  saturationMultiplier: 1.1
})
```

## Guidelines

- Use HSL format for colors
- Follow semantic naming conventions
- Add tests for new functionality
- Update documentation
- Use conventional commits: `feat:`, `fix:`, `docs:`

## Pull Request Process

1. Ensure tests pass: `npm test`
2. Update documentation if needed
3. Create descriptive PR title and description
4. Link related issues

## Code Style

- TypeScript for all code
- Semantic color names
- No hardcoded hex values
- Comprehensive type definitions