# Semantic Token Style Guide

This guide explains how to use and extend semantic tokens in the Tokyo Night Lod theme.

## What are Semantic Tokens?

Semantic tokens provide a more meaningful way to define syntax highlighting compared to traditional TextMate scopes. They allow for better consistency and more precise control over how code elements are displayed.

## Token Categories

### Variables
- `variable` - General variables
- `variable.declaration` - Variable declarations
- `variable.readonly` - Read-only variables
- `variable.mutable` - Mutable variables
- `variable.static` - Static variables
- `variable.local` - Local variables
- `variable.global` - Global variables

### Functions and Methods
- `function` - General functions
- `function.declaration` - Function declarations
- `function.async` - Async functions
- `method` - General methods
- `method.declaration` - Method declarations
- `method.static` - Static methods

### Classes and Types
- `class` - General classes
- `class.declaration` - Class declarations
- `class.defaultLibrary` - Built-in classes
- `interface` - General interfaces
- `interface.declaration` - Interface declarations
- `enum` - General enums
- `enum.declaration` - Enum declarations
- `type` - General types
- `type.declaration` - Type declarations
- `typeParameter` - Generic type parameters

### Language-Specific Tokens

#### Rust
- `lifetime:rust` - Lifetime annotations
- `generic:rust` - Generic parameters
- `attribute:rust` - Attributes
- `selfKeyword:rust` - Self keyword
- `trait:rust` - Traits
- `union:rust` - Unions

#### Python
- `decorator:python` - Decorators
- `selfParameter:python` - Self parameters
- `clsParameter:python` - Class parameters
- `magicFunction:python` - Magic methods

#### TypeScript/JavaScript
- `interface:typescript` - TypeScript interfaces
- `type:typescript` - TypeScript types
- `enum:typescript` - TypeScript enums
- `enumMember:typescript` - TypeScript enum members
- `decorator:typescript` - TypeScript decorators

## Color Palette Mapping

Semantic tokens map to colors from our palette system:

| Token Category | Palette Color |
|----------------|---------------|
| Variables | `palette.accent.cyan` |
| Functions | `palette.accent.blue` |
| Classes | `palette.accent.orange` |
| Interfaces | `palette.accent.teal` |
| Types | `palette.accent.orange` |
| Enums | `palette.accent.yellow` |
| Constants | `palette.accent.yellow` |
| Keywords | `palette.accent.magenta` |

## Adding New Tokens

When adding new semantic tokens:

1. Follow the naming convention: `tokenName[:language]`
2. Use appropriate colors from the palette
3. Document the purpose in comments
4. Test with multiple languages

## Best Practices

1. Prefer semantic tokens over TextMate scopes when possible
2. Use language-specific tokens for language-unique features
3. Maintain consistency with existing token mappings
4. Consider accessibility when choosing colors
5. Test tokens with real code examples