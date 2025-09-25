# 🛠️ Development (v2.0 DSL)

## Setup

```bash
git clone https://github.com/darqus/tokyo-night-modern-vscode-theme.git
cd tokyo-night-modern-vscode-theme
npm install
```

## Commands

```bash
npm run build         # Build theme
npm run validate      # Validate schema & structural constraints
npm test              # Full test suite (unit + snapshots)
npm run validate:all  # Validate + tests
npm run docs:colors   # Generate color documentation
npm run docs:tokens   # Generate docs/TOKENS.md from DSL
```

## Architecture

```text
src/
├── core/           # base palette + interface roles + utils
├── generators/     # DSL + theme + tokens
├── types/          # palette/theme types
└── build.ts        # build entry

Legacy `themeEngine` and `interfaceMapping.ts` removed in 2.0.0.
```

## Color System (layers)

1. **Base Palette** (12 colors) → `core/palette.ts`
2. **Interface Colors** (role based) → `core/interface.ts`
3. **Syntax Colors** (13 tokens) → `core/syntax.ts`
4. **Theme Generation** → `generators/theme.ts`

### Color Engine / OKLCH

Centralized facade decides when to use perceptual OKLCH vs sRGB mixing. See [COLOR_ENGINE.md](./COLOR_ENGINE.md) for rationale and transparency rules.

## Adding Colors / Tokens

```typescript
// 1. Add to base palette (if a new physical color is required)
export const basePalette = {
  newColor: createHex('#123456')
}

// 2. Use in interface/syntax
someProperty: basePalette.newColor

// 3. Add token mapping in tokenConfig (modernInterfaceMapping)
// 4. Rebuild
npm run build

### Partial Snapshots

Faster diffs via smaller scopes:
- `theme.snapshot.core.test.ts` – fundamental surfaces & structural tokens
- `theme.snapshot.lists_panels.test.ts` – lists / trees / panels / inputs / buttons
- `theme.snapshot.terminal_widgets.test.ts` – terminal / debug / widgets / notifications

Only snapshots for modified scope need updating.

### Token Count Guard

`theme.count.test.ts` locks the color token cardinality. Add tokens intentionally (bump expected count only with conscious design change).
```
