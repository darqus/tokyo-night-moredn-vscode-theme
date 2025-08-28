# Visual Regression Testing

This project includes visual regression tests to ensure UI components maintain consistent appearance across theme updates.

## How it works

The visual regression testing system:

1. Generates screenshots of various UI components using the Tokyo Night theme
2. Compares these screenshots with baseline images
3. Reports any visual differences

## Running Tests

To run visual regression tests:

```bash
npm run test:visual
```

## Updating Baseline Screenshots

When intentional visual changes are made, update the baseline screenshots:

```bash
npm run test:visual --update
```

## Test Components

The following UI components are tested:

- Editor syntax highlighting (JavaScript, TypeScript, Python)
- Activity bar
- Sidebar
- Status bar
- Tabs
- Buttons (primary and secondary)
- Input fields
- List items
- Terminal

## Test Structure

- `tests/visual/baseline/` - Baseline screenshots for comparison
- `tests/visual/screenshots/` - Current screenshots generated during tests
- `tests/visual/diff/` - Diff images showing visual differences (when failures occur)