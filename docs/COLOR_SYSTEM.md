# Color System Documentation

The Tokyo Night Lod theme uses a comprehensive color system designed for optimal readability and aesthetics.

## Color Palette Structure

### Base Palette
The base palette contains fundamental colors that form the foundation of the theme:

- `black` - Darkest background
- `white` - Primary text color
- `blue` - Primary accent color
- `cyan` - Secondary accent color
- `teal` - Tertiary accent color
- `purple` - Additional accent color
- `magenta` - Additional accent color
- `red` - Error and warning color
- `green` - Success color
- `yellow` - Warning and highlight color
- `orange` - Additional accent color

### Core Palette
The core palette derives colors from the base palette with specific purposes:

- Background colors (`bg`)
- Text colors (`text`)
- Accent colors (`accent`)
- Brand colors (`brand`)
- UI colors (`ui`)

### Full Palette
The full palette extends the core with semantic and contextual colors:

- Background colors (`bg`)
- Line colors (`line`)
- Foreground colors (`fg`)
- Brand colors (`brand`)
- Accent colors (`accent`)
- Token colors (`token`) - Syntax highlighting
- ANSI colors (`ansi`) - Terminal colors
- UI colors (`ui`) - Interface elements
- Bracket colors (`brackets`) - Bracket highlighting
- Punctuation colors (`punctuation`) - Punctuation highlighting

## Color Relationships

Colors in the palette are carefully chosen to maintain:

1. **Contrast ratios** - Minimum 4.5:1 for normal text (WCAG AA)
2. **Color harmony** - Harmonious relationships between hues
3. **Accessibility** - Consideration for color blindness
4. **Consistency** - Consistent semantic meaning across contexts

## Color Generation Functions

### withAlpha(hex, alpha)
Adds transparency to a color:
```typescript
withAlpha('#ff0000', 0.5) // '#ff000080'
```

### mix(colorA, colorB, weight)
Mixes two colors with a weight (0-1):
```typescript
mix('#ff0000', '#0000ff', 0.5) // '#800080'
```

### lightenToward(color, toward, amount)
Lightens a color toward another color:
```typescript
lightenToward('#808080', '#ffffff', 0.5) // '#bfbfbf'
```

### darkenToward(color, toward, amount)
Darkens a color toward another color:
```typescript
darkenToward('#808080', '#000000', 0.5) // '#404040'
```

## Accessibility Considerations

All color combinations are checked for:

1. **Contrast ratios** - Ensuring readability
2. **Color blindness** - Simulating deuteranopia, protanopia, and tritanopia
3. **Focus states** - Clear focus indicators
4. **High contrast mode** - Compatibility with system high contrast settings

## Customization

To customize colors:

1. Modify values in `src/palette.base.ts` for fundamental changes
2. Adjust derived colors in `src/palette.core.ts`
3. Update semantic mappings in `src/palette.ts`
4. Rebuild the theme: `npm run build`

## Color Usage Guidelines

1. **Text colors** should maintain minimum contrast ratios
2. **Accent colors** should be used sparingly for emphasis
3. **Background colors** should provide good contrast with text
4. **Semantic colors** should be consistent across contexts
5. **UI colors** should be subtle to avoid distraction

## Validation

The color system includes automated validation for:

1. Hex color format correctness
2. Contrast ratio compliance
3. Duplicate color detection
4. Accessibility for color blindness