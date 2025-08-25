# Contribution Guidelines

Thank you for your interest in contributing to Tokyo Night Lod! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/tokyo-night-vscode-theme-lod.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Test your changes: `npm test`
7. Commit and push your changes
8. Create a pull request

## Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Installation
```bash
git clone https://github.com/darqus/tokyo-night-vscode-theme-lod.git
cd tokyo-night-vscode-theme-lod
npm install
```

### Useful Commands
```bash
# Build the theme
npm run build

# Run all tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Validate theme files
npm run validate:all

# Generate coverage report
npm run test:coverage
```

## Code Structure

- `src/` - Source code
  - `palette.ts` - Color definitions
  - `build.ts` - Theme generation
  - `tokenColors.ts` - TextMate token colors
  - `semanticTokenColors.ts` - Semantic token colors
  - `theme/` - UI color definitions
  - `utils/` - Utility functions
  - `validation/` - Theme validation
- `themes/` - Generated theme files
- `tests/` - Test files
- `docs/` - Documentation

## Adding New Colors

1. Add base colors to `src/palette.base.ts` if needed
2. Add derived colors to `src/palette.core.ts`
3. Add semantic colors to `src/palette.ts`
4. Use the new colors in appropriate theme files

## Adding New Theme Properties

1. Add properties in the appropriate file in `src/theme/`
2. Follow the existing naming conventions
3. Add comments explaining the purpose of new properties
4. Update validation rules if necessary

## Testing

All changes should include appropriate tests:

1. Unit tests for utility functions in `tests/unit/`
2. Integration tests for theme generation
3. Visual tests for UI components (when applicable)

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Follow the commit message conventions
4. Include a clear description of changes
5. Reference any related issues

## Code Style

- Use TypeScript with strict typing
- Follow existing code patterns
- Add JSDoc comments for functions and interfaces
- Keep lines under 100 characters
- Use meaningful variable and function names

## Commit Message Convention

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

## Reporting Issues

When reporting issues, please include:

1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. VS Code version and OS information

## Questions?

If you have any questions, feel free to open an issue or contact the maintainers.