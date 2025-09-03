# 🛠️ Development

## Setup

```bash
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install
```

## Commands

```bash
npm run build        # Build theme (~0.6s)
npm run validate     # Validate theme
npm test             # Run tests (13 tests)
npm run docs:colors  # Generate color docs
```

## Architecture

```
src/
├── core/           # 12 base colors + utilities
├── generators/     # Theme + token generation
├── types/          # TypeScript definitions
└── build.ts        # Main build script
```

## Color System

1. **Base Palette** (12 colors) → `core/palette.ts`
2. **Interface Colors** (366 colors) → `core/interface.ts`
3. **Syntax Colors** (13 tokens) → `core/syntax.ts`
4. **Theme Generation** → `generators/theme.ts`

## Adding Colors

```typescript
// 1. Add to base palette
export const basePalette = {
  newColor: createHex('#123456')
}

// 2. Use in interface/syntax
someProperty: basePalette.newColor

// 3. Rebuild
npm run build
```