# 🧪 Validation Guide

> Comprehensive guide to theme validation and quality assurance for Tokyo Night Lod.

## 🎯 Validation Overview

Validation is a critical part of the Tokyo Night Lod theme development process. It ensures:

- **Theme correctness** - Proper structure and format
- **Color consistency** - Consistent color usage across components
- **Accessibility** - Proper contrast ratios and readability
- **Performance** - Optimized theme performance
- **Compatibility** - VS Code compatibility and standards compliance

### Validation Types

1. **Structural Validation** - Theme file structure and format
2. **Color Validation** - Color definitions and usage
3. **Accessibility Validation** - Contrast ratios and readability
4. **Performance Validation** - Theme performance optimization
5. **Compatibility Validation** - VS Code standards compliance

## 🔍 Structural Validation

### Theme Structure Validation

The theme must follow VS Code's theme structure:

```typescript
interface VSCodeTheme {
  name: string;
  type: 'dark' | 'light' | 'hc';
  colors: Record<string, string>;
  tokenColors: TokenColor[];
  semanticTokenColors?: SemanticTokenColors;
}
```

### Validation Rules

#### Required Properties

```typescript
// Required theme properties
const requiredProperties = [
  'name',
  'type',
  'colors',
  'tokenColors'
];

// Required color properties
const requiredColors = [
  'activityBar.background',
  'activityBar.foreground',
  'editor.background',
  'editor.foreground',
  'editor.lineHighlightBackground',
  'editor.selectionBackground',
  'sideBar.background',
  'sideBar.foreground',
  'statusBar.background',
  'statusBar.foreground'
];
```

#### Token Color Validation

```typescript
interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
}

// Validation rules
const tokenColorRules = {
  required: ['scope', 'settings'],
  optional: ['name'],
  settingsRequired: ['foreground', 'background', 'fontStyle']
};
```

#### Semantic Token Validation

```typescript
interface SemanticTokenColors {
  enabled: boolean;
  rules: Record<string, SemanticTokenRule>;
}

interface SemanticTokenRule {
  foreground?: string;
  background?: string;
  fontStyle?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}
```

### Validation Implementation

```typescript
// src/validation/themeValidator.ts
import { VSCodeTheme } from '../types/theme';
import { allowedProperties } from './allowedProperties';

export function validateTheme(theme: VSCodeTheme): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate required properties
  validateRequiredProperties(theme, errors);

  // Validate color properties
  validateColorProperties(theme, errors);

  // Validate token colors
  validateTokenColors(theme, errors);

  // Validate semantic tokens
  validateSemanticTokens(theme, errors);

  // Validate property values
  validatePropertyValues(theme, errors);

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateRequiredProperties(theme: VSCodeTheme, errors: ValidationError[]) {
  const required = ['name', 'type', 'colors', 'tokenColors'];

  for (const prop of required) {
    if (!(prop in theme)) {
      errors.push({
        type: 'missing_property',
        property: prop,
        message: `Missing required property: ${prop}`
      });
    }
  }
}
```

## 🎨 Color Validation

### Color Format Validation

All colors must be valid hex color codes:

```typescript
function validateHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

// Examples of valid colors
const validColors = [
  '#1a1b26',  // 6-digit hex
  '#abc',     // 3-digit hex
  '#FFFFFF',  // uppercase
  '#000000'   // lowercase
];

// Examples of invalid colors
const invalidColors = [
  '1a1b26',   // missing #
  '#1a1b2',   // wrong length
