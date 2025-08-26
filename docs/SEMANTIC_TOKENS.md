# 🎯 Semantic Tokens Guide

> Comprehensive guide to using and extending semantic tokens in Tokyo Night Lod theme.

## What are Semantic Tokens?

Semantic tokens provide a more meaningful way to define syntax highlighting compared to traditional TextMate scopes. They offer better consistency and more precise control over code element rendering.

### Key Benefits

- **Language-aware highlighting** - Understands code structure
- **Consistent styling** - Uniform appearance across languages
- **Precise control** - Fine-grained token categorization
- **Better tooling** - Improved IDE support
- **Accessibility** - Better contrast and readability

## Token Categories

### Variables

```typescript
// Variable tokens
variable: {
  foreground: palette.semantic.variable,
  fontStyle: ''
},

variable.declaration: {
  foreground: palette.semantic.variable,
  fontStyle: 'bold'
},

variable.readonly: {
  foreground: palette.semantic.constant,
  fontStyle: 'italic'
},

variable.mutable: {
  foreground: palette.semantic.variable,
  fontStyle: ''
},

variable.static: {
  foreground: palette.semantic.variable,
  fontStyle: 'underline'
},

variable.local: {
  foreground: palette.semantic.variable,
  fontStyle: ''
},

variable.global: {
  foreground: palette.semantic.variable,
  fontStyle: 'bold'
}
```

### Functions and Methods

```typescript
// Function tokens
function: {
  foreground: palette.semantic.function,
  fontStyle: ''
},

function.declaration: {
  foreground: palette.semantic.function,
  fontStyle: 'bold'
},

function.async: {
  foreground: palette.semantic.function,
  fontStyle: 'italic'
},

method: {
  foreground: palette.semantic.function,
  fontStyle: ''
},

method.declaration: {
  foreground: palette.semantic.function,
  fontStyle: 'bold'
},

method.static: {
  foreground: palette.semantic.function,
  fontStyle: 'underline'
}
```

### Classes and Types

```typescript
// Class and type tokens
class: {
  foreground: palette.semantic.type,
  fontStyle: ''
},

class.declaration: {
  foreground: palette.semantic.type,
  fontStyle: 'bold'
},

class.defaultLibrary: {
  foreground: palette.semantic.type,
  fontStyle: 'italic'
},

interface: {
  foreground: palette.semantic.interface,
  fontStyle: ''
},

interface.declaration: {
  foreground: palette.semantic.interface,
  fontStyle: 'bold'
},

enum: {
  foreground: palette.semantic.enum,
  fontStyle: ''
},

enum.declaration: {
  foreground: palette.semantic.enum,
  fontStyle: 'bold'
},

type: {
  foreground: palette.semantic.type,
  fontStyle: ''
},

type.declaration: {
  foreground: palette.semantic.type,
  fontStyle: 'bold'
},

typeParameter: {
  foreground: palette.semantic.parameter,
  fontStyle: 'italic'
}
```

### Constants and Properties

```typescript
// Constant tokens
constant: {
  foreground: palette.semantic.constant,
  fontStyle: ''
},

property: {
  foreground: palette.semantic.property,
  fontStyle: ''
},

property.readonly: {
  foreground: palette.semantic.constant,
  fontStyle: 'italic'
},

enumMember: {
  foreground: palette.semantic.constant,
  fontStyle: ''
}
```

### Modifiers and Keywords

```typescript
// Modifier tokens
modifier: {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

keyword: {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

operator: {
  foreground: palette.semantic.operator,
  fontStyle: ''
},

punctuation: {
  foreground: palette.semantic.punctuation,
  fontStyle: ''
}
```

## Language-Specific Tokens

### Rust

```typescript
// Rust-specific tokens
'lifetime:rust': {
  foreground: palette.semantic.keyword,
  fontStyle: 'italic'
},

'generic:rust': {
  foreground: palette.semantic.type,
  fontStyle: ''
},

'attribute:rust': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'selfKeyword:rust': {
  foreground: palette.semantic.keyword,
  fontStyle: 'bold'
},

'trait:rust': {
  foreground: palette.semantic.interface,
  fontStyle: ''
},

'union:rust': {
  foreground: palette.semantic.type,
  fontStyle: ''
}
```

### Python

```typescript
// Python-specific tokens
'decorator:python': {
  foreground: palette.semantic.function,
  fontStyle: ''
},

'selfParameter:python': {
  foreground: palette.semantic.parameter,
  fontStyle: 'italic'
},

'clsParameter:python': {
  foreground: palette.semantic.parameter,
  fontStyle: 'italic'
},

'magicFunction:python': {
  foreground: palette.semantic.function,
  fontStyle: 'italic'
}
```

### TypeScript/JavaScript

```typescript
// TypeScript/JavaScript-specific tokens
'interface:typescript': {
  foreground: palette.semantic.interface,
  fontStyle: ''
},

'type:typescript': {
  foreground: palette.semantic.type,
  fontStyle: ''
},

'enum:typescript': {
  foreground: palette.semantic.enum,
  fontStyle: ''
},

'enumMember:typescript': {
  foreground: palette.semantic.constant,
  fontStyle: ''
},

'decorator:typescript': {
  foreground: palette.semantic.function,
  fontStyle: ''
}
```

### Go

```typescript
// Go-specific tokens
'package:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'import:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'func:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'var:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'const:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'type:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'struct:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
},

'interface:go': {
  foreground: palette.semantic.keyword,
  fontStyle: ''
}
```

## Color Palette Mapping

Semantic tokens are mapped to colors from our palette system:

| Token Category | Palette Color | Usage |
|---------------|---------------|-------|
| Variables | `palette.semantic.variable` | General variables, parameters |
| Functions | `palette.semantic.function` | Functions, methods, decorators |
| Classes | `palette.semantic.type` | Classes, structs, types |
| Interfaces | `palette.semantic.interface` | Interfaces, traits, protocols |
| Enums | `palette.semantic.enum` | Enumerations, union types |
| Constants | `palette.semantic.constant` | Constants, literals, readonly |
| Keywords | `palette.semantic.keyword` | Language keywords, modifiers |
| Operators | `palette.semantic.operator` | Mathematical and logical operators |
| Punctuation | `palette.semantic.punctuation` | Brackets, commas, semicolons |
| Properties | `palette.semantic.property` | Object properties, fields |

## Adding New Tokens

When adding new semantic tokens:

### Naming Convention

```typescript
// Format: tokenName[:language]
// Examples:
'variable'           // General variable
'variable:rust'      // Rust-specific variable
'function.async'     // Async function
'method.static'      // Static method
'decorator:python'   // Python decorator
```

### Implementation Steps

1. **Define the token**:

   ```typescript
   // src/semanticTokenColors.ts
   export const semanticTokenColors: SemanticTokenColors = {
     enabled: true,
     rules: {
       // Add new token
       'newTokenType': {
         foreground: palette.semantic.variable,
         fontStyle: ''
       }
     }
   };
   ```

2. **Choose appropriate color**:

   ```typescript
   // Use palette colors
   'newTokenType': {
     foreground: palette.semantic.variable,  // Choose appropriate color
     fontStyle: ''                          // Optional styling
   }
   ```

3. **Document the token**:

   ```typescript
   /**
    * New token type for specific language feature
    * Used for: [explain usage]
    * Languages: [list supported languages]
    */
   ```

4. **Test with multiple languages**:

   ```bash
   # Test with different languages
   npm run test:semantic -- --language=typescript
   npm run test:semantic -- --language=python
   npm run test:semantic -- --language=rust
   ```

## Best Practices

### 1. Prefer Semantic Tokens Over TextMate Scopes

```typescript
// ✅ Good - Use semantic tokens
'semanticTokenColors': {
  'variable': { foreground: '#c0caf5' },
  'function': { foreground: '#7aa2f7' }
}

// ❌ Avoid - Rely only on TextMate scopes
'tokenColors': [
  {
    'scope': 'variable.other',
    'settings': { 'foreground': '#c0caf5' }
  }
]
```

### 2. Use Language-Specific Tokens for Unique Features

```typescript
// ✅ Good - Language-specific tokens
'lifetime:rust': { foreground: '#bb9af7' },
'decorator:python': { foreground: '#7aa2f7' },
'interface:typescript': { foreground: '#2ac3de' }

// ❌ Avoid - Generic tokens for language-specific features
'variable': { foreground: '#c0caf5' } // Too generic
```

### 3. Maintain Consistency with Existing Token Mappings

```typescript
// ✅ Good - Consistent with existing style
'variable.declaration': {
  foreground: palette.semantic.variable,
  fontStyle: 'bold'  // Consistent with other declarations
}

// ❌ Avoid - Inconsistent styling
'variable.declaration': {
  foreground: '#ff0000',  // Different color
  fontStyle: 'underline' // Inconsistent style
}
```

### 4. Consider Accessibility When Choosing Colors

```typescript
// ✅ Good - Good contrast ratios
'variable': {
  foreground: palette.semantic.variable,  // Good contrast
  fontStyle: ''
}

// ❌ Avoid - Poor contrast
'variable': {
  foreground: '#444444',  // Too dark, poor contrast
  fontStyle: ''
}
```

### 5. Test Tokens on Real Code Examples

```typescript
// Test with various code examples
const examples = {
  typescript: `
    interface User {
      name: string;
      age: number;
    }

    class UserService {
      private users: User[] = [];

      async getUser(id: number): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
      }
    }
  `,

  python: `
    class UserService:
        def __init__(self):
            self.users = []

        @property
        def user_count(self):
            return len(self.users)

        async def get_user(self, user_id):
            return next((u for u in self.users if u.id == user_id), None)
  `,

  rust: `
    struct User {
        name: String,
        age: u32,
    }

    impl User {
        fn new(name: String, age: u32) -> Self {
            User { name, age }
        }

        fn display(&self) {
            println!("User: {}, age: {}", self.name, self.age);
        }
    }
  `
};
```

## Testing Semantic Tokens

### Automated Testing

```typescript
// tests/unit/semanticTokens.test.ts
import { semanticTokenColors } from '../../src/semanticTokenColors';
import { palette } from '../../src/palette';

describe('Semantic Tokens', () => {
  test('all tokens use palette colors', () => {
    const paletteColors = Object.values(palette.semantic).flat();

    Object.entries(semanticTokenColors.rules).forEach(([token, rule]) => {
      if (rule.foreground) {
        expect(paletteColors).toContain(rule.foreground);
      }
    });
  });

  test('tokens follow naming convention', () => {
    Object.keys(semanticTokenColors.rules).forEach(token => {
      expect(token).toMatch(/^[a-z]+(\.[a-z]+)?(:[a-z]+)?$/);
    });
  });
});
```

### Manual Testing

```bash
# Run semantic token tests
npm run test:semantic

# Test with specific language
npm run test:semantic -- --language=typescript

# Visual testing
npm run test:visual
```

## Troubleshooting

### Common Issues

1. **Tokens not appearing**:
   - Check if semantic tokens are enabled in VS Code settings
   - Verify language server supports semantic tokens
   - Ensure token names are correct

2. **Inconsistent colors**:
   - Verify all tokens use palette colors
   - Check for conflicting TextMate scopes
   - Ensure proper token priority

3. **Performance issues**:
   - Limit number of custom tokens
   - Use generic tokens when possible
   - Avoid complex token scopes

### Debug Commands

```bash
# Check semantic token support
code --list-extensions | grep -i semantic

# Test theme with semantic tokens
code --extensionDevelopmentPath=. --disable-extensions

# View token information in VS Code
# Open Command Palette > "Developer: Inspect Editor Tokens and Scopes"
```

## Resources

- [VS Code Semantic Token Guide](https://code.visualstudio.com/api/language-support/semantic-highlight-guide)
- [Semantic Token Types](https://code.visualstudio.com/api/language-support/semantic-highlight-guide#semantic-token-types)
- [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [Accessibility Guidelines](https://webaccessibility.mit.edu/contrast/)
