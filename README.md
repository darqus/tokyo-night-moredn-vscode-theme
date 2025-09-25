# 🌆 Tokyo Night Modern

> A modern, meticulously balanced dark theme for VS Code — minimal base palette, declarative DSL mapping, full test guardrails.

![Tokyo Night Modern](static/ss_tokyo_night_modern.png)

## 🎨 Overview

- **12 base colors** → **406 workbench UI colors** (DSL‑generated)
- WCAG‑aware contrast targets (advisory tests)
- Zero hardcoded workbench colors – role‑driven interface layer
- Declarative token DSL (`modernInterfaceMapping.ts`)
- Partial snapshots for focused diffs
- Full unit + structural validation (token count guard, forbidden list, alpha policies)

---

### 🌎 Live Preview

🔮 [Open in vscode.dev](https://vscode.dev/theme/lod-inc.tokyo-night-modern)

---

### 🚀 Quick Start

1. Open VS Code Extensions (`Ctrl+Shift+X`)
2. Search “Tokyo Night Modern”
3. Install & select **Tokyo Night Modern**

---

### 🏗️ Architecture (DSL 2.0)

```text
12 base colors → 406 workbench colors → 13 syntax tokens
```

```text
src/
├── core/           # Base palette, interface roles, utilities
├── generators/     # DSL + theme builder + token assembly
├── types/          # Theme & palette types
└── build.ts        # Build entry point

Legacy engine + manual mapping removed in 2.0.0 (DSL is authoritative).
```

---

### 🛠️ Development

```bash
git clone https://github.com/darqus/tokyo-night-modern-vscode-theme.git
cd tokyo-night-modern-vscode-theme
npm install
npm run build         # Build theme
npm test              # Run test suite (unit + snapshots)
npm run validate:all  # Validate + tests
npm run docs:tokens   # Generate docs/TOKENS.md from DSL
npm run test:coverage # Coverage report
```

---

### 📊 Metrics (Guarded)

| Metric | Value | Status |
|--------|-------|--------|
| **Base colors** | 12 | ✅ |
| **Workbench colors** | 406 | ✅ |
| **Syntax tokens** | 13 | ✅ |
| **Tests** | 130 | ✅ |
| **Build time** | ~0.7–1.0s | ✅ |
| **Hardcoded colors** | 0 | ✅ |

---

### 📚 Documentation

- [Quick Start](docs/QUICK_START.md) - Installation and setup
- [Development](docs/DEVELOPMENT.md) - Build and contribute
- [Colors](docs/COLORS.md) - Color palette reference
- [Theme Analysis](docs/THEME_ANALYSIS.md) - Architecture deep dive
- [Tokens](docs/TOKENS.md) - Auto‑generated token table (DSL)
- [Color Engine (sRGB vs OKLCH)](docs/COLOR_ENGINE.md) - Rules for color operations and transparency
- [Release & Versioning](docs/RELEASE_VERSIONING.md) - Automated releases and version rules
- [Contributing](docs/CONTRIBUTING.md) - Guidelines for contributing

---

### 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

### 🔥 2.0.0 Breaking Changes

- Removed legacy files: `interfaceMapping.ts`, `themeEngine.ts`, related types
- Migration: import `createTokens` from `modernInterfaceMapping.ts`
- Added partial snapshots (core / lists_panels / terminal_widgets)
- Added token documentation generator (`docs:tokens`)

### 🌆 Tokyo Night Modern

Crafted with ❤️ for long coding sessions.

⭐ GitHub: <https://github.com/darqus/tokyo-night-modern-vscode-theme>
📦 Marketplace: <https://marketplace.visualstudio.com/items?itemName=lod-inc.tokyo-night-modern>
