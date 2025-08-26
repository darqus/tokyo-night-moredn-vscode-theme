# 🤝 Contributing Guide

> Guide for contributors to the Tokyo Night Lod theme project.

## 🚀 Getting Started

### How to Contribute

We welcome all forms of contributions! Here's how you can help:

- **Code contributions** - Bug fixes, new features, improvements
- **Documentation** - Improving guides, fixing typos, adding examples
- **Design** - Color suggestions, UI improvements, visual feedback
- **Testing** - Reporting bugs, testing new features, validation
- **Feedback** - Suggestions, ideas, user experience reports

### First Steps

1. **Read this guide** - Understand the contribution process
2. **Check existing issues** - See if your idea is already being discussed
3. **Set up development environment** - Follow the [Development Guide](DEVELOPMENT.md)
4. **Join the community** - Participate in discussions and issues

## 📋 Contribution Types

### 🐛 Bug Reports

#### Reporting Bugs

When reporting bugs, please include:

1. **Environment information**:
   - VS Code version
   - Operating system
   - Theme version
   - Other relevant extensions

2. **Bug description**:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable

3. **Example bug report**:

```markdown
## Bug: Syntax highlighting broken for TypeScript

### Environment
- VS Code: 1.85.0
- OS: Windows 11
- Theme: Tokyo Night Lod v1.2.0

### Description
TypeScript syntax highlighting is not working properly for generic types.

### Steps to Reproduce
1. Open a TypeScript file
2. Write code with generic types: `interface Generic<T> {}`
3. Observe syntax highlighting

### Expected Behavior
Generic types should be properly highlighted with syntax colors.

### Actual Behavior
Generic types are not highlighted or have incorrect colors.

### Screenshots
[Attach screenshot if applicable]
```

#### Bug Fix Guidelines

When fixing bugs:

1. **Create issue first** - Discuss the bug before implementing fix
2. **Write tests** - Add tests to prevent regression
3. **Document changes** - Update relevant documentation
4. **Follow code style** - Adhere to project conventions

### ✨ Feature Requests

#### Requesting Features

For feature requests, provide:

1. **Problem statement** - What problem are you trying to solve?
2. **Proposed solution** - How do you suggest solving it?
3. **Use cases** - When and how would this feature be used?
4. **Alternatives** - Have you considered other approaches?

#### Example feature request

```markdown
## Feature: Add light theme variant

### Problem
Users who work in bright environments need a light theme variant for better visibility.

### Proposed Solution
Create a Tokyo Night Light theme variant with inverted color scheme while maintaining the same aesthetic.

### Use Cases
- Working in bright offices or outdoor environments
- Users with light sensitivity preferences
- Alternative to the dark theme for variety

### Alternatives
- Users can create custom theme overrides
- Use other light themes (but lose Tokyo Night aesthetics)
```

#### Feature Implementation

When implementing features:

1. **Discuss first** - Get feedback on the proposal
2. **Break into small PRs** - Large features should be split
3. **Write comprehensive tests** - Cover edge cases
4. **Update documentation** - Include new features in docs
5. **Consider backwards compatibility** - Don't break existing functionality

### 📚 Documentation Contributions

#### Types of Documentation Changes

- **Fixing typos and grammar**
- **Improving clarity and readability**
- **Adding examples and screenshots**
- **Creating new guides or tutorials**
- **Updating outdated information**

#### Documentation Guidelines

1. **Follow the style guide**:
   - Use clear, concise language
   - Include code examples
   - Add screenshots where helpful
   - Use proper Markdown formatting

2. **Structure your changes**:
   - Update table of contents if needed
   - Ensure cross-references are correct
   - Test all links and examples

3. **Example documentation contribution**:

```markdown
## Documentation: Improve quick start guide

### Changes Made
- Added screenshots for theme activation
- Improved installation instructions
- Added troubleshooting section
- Fixed broken links

### Testing
- Verified all links work correctly
- Tested all instructions on Windows and macOS
- Screenshots display properly in Markdown
```

### 🎨 Design Contributions

#### Color Suggestions

When suggesting color changes:

1. **Provide rationale**:
   - Why the current colors are problematic
   - How the new colors improve the theme
   - Accessibility considerations (contrast ratios)

2. **Include specific values**:
   - Hex codes for suggested colors
   - Before/after comparisons
   - Impact on different UI elements

#### Example color suggestion

```markdown
## Design: Improve comment color contrast

### Current Issue
Comment color `#6272a4` has insufficient contrast (3.5:1) against background `#1a1b26`.

### Suggested Solution
Change comment color to `#7a8bb8` for better contrast (4.5:1).

### Impact
- Better readability for comments
- Maintains aesthetic consistency
- Improves accessibility
- Affects all file types with comments
```

## 🛠️ Development Workflow

### Setting Up

1. **Fork the repository**:

   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/tokyo-night-vscode-theme-lod.git
   cd tokyo-night-vscode-theme-lod
   ```

2. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/darqus/tokyo-night-vscode-theme-lod.git
   ```

3. **Setup development environment**:

   ```bash
   npm install
   npm run setup
   ```

### Creating Changes

1. **Create feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   ```bash
   # Edit files
   nano src/palette.ts

   # Test changes
   npm run test
   npm run validate
   ```

3. **Commit with conventional commits**:

   ```bash
   # Feature commit
   git commit -m "feat: add new color variant"

   # Bug fix commit
   git commit -m "fix: correct syntax highlighting for generics"

   # Documentation commit
   git commit -m "docs: update installation guide"
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting Pull Requests

1. **Create Pull Request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Compare to `main` branch
   - Fill out the PR template

2. **PR Requirements**:
   - Clear title and description
   - Links to related issues
   - Testing instructions
   - Documentation updates if needed
   - Screenshots for visual changes

3. **Example PR description**:

```markdown
## Changes
- Fixed syntax highlighting for TypeScript generic types
- Updated color definitions in `src/palette.ts`
- Added unit tests for new color scheme
- Updated documentation in `docs/COLOR_PALETTE.md`

## Related Issues
Fixes #123

## Testing
- [x] Unit tests pass
- [x] Theme builds successfully
- [x] Visual testing completed
- [x] Tested with TypeScript files
- [x] No regression in other languages

## Screenshots
Before: [screenshot]
After: [screenshot]
```

### Code Review Process

1. **Initial review** - Maintainers will review your PR
2. **Feedback and changes** - Address review comments
3. **Final approval** - PR is approved and merged
4. **Release** - Changes included in next release

## 📝 Code Standards

### TypeScript Guidelines

- **Use TypeScript features**:
  - Type annotations for all variables and functions
  - Interfaces for object shapes
  - Enums for constants where appropriate
  - Generics for reusable code

- **Code organization**:
  - One export per file when possible
  - Clear file and function names
  - Proper module structure
  - Avoid circular dependencies

#### Example TypeScript code

```typescript
// Good ✅
interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

const createTheme = (palette: ColorPalette): Theme => {
  return {
    colors: palette,
    // ... other properties
  };
};

// Bad ❌
var theme = {
  primary: '#ff0000',
  secondary: '#00ff00'
};
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
feat: add new color variant
feat(theme): implement syntax highlighting for Python

# Bug fixes
fix: correct contrast ratio for comments
fix(build): resolve theme generation error

# Documentation
docs: update installation guide
docs(readme): add feature list

# Style changes
style: format code with Prettier
style: fix indentation

# Refactoring
refactor: improve color system architecture
refactor(utils): optimize color conversion functions

# Tests
test: add unit tests for color utilities
test(integration): add theme validation tests

# Build and CI
build: update TypeScript configuration
ci: add GitHub Actions workflow
```

### Testing Requirements

#### Unit Tests

- **Test coverage**: Aim for 80%+ coverage
- **Test structure**: Use Jest framework
- **Test naming**: Describe what is being tested
- **Test isolation**: Each test should be independent

#### Example unit test

```typescript
// tests/unit/colorUtils.test.ts
import { hexToRgb, rgbToHex } from '../../src/utils/color';

describe('Color Utilities', () => {
  describe('hexToRgb', () => {
    test('converts hex to rgb object', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    test('handles invalid hex codes', () => {
      expect(() => hexToRgb('invalid')).toThrow();
    });
  });

  describe('rgbToHex', () => {
    test('converts rgb to hex string', () => {
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });

    test('handles out of range values', () => {
      expect(rgbToHex(300, -10, 128)).toBe('#ff0080');
    });
  });
});
```

#### Integration Tests

- **Theme building**: Test complete theme generation
- **Validation**: Test theme structure validation
- **Compatibility**: Test VS Code compatibility

#### Visual Tests

- **Regression testing**: Compare with reference theme
- **Screenshot testing**: Visual comparison
- **Cross-platform testing**: Test on different platforms

## 🎯 Quality Assurance

### Pre-Submission Checklist

Before submitting your contribution:

- [ ] **Code quality**:
  - [ ] Code follows project style guide
  - [ ] No ESLint or TypeScript errors
  -
