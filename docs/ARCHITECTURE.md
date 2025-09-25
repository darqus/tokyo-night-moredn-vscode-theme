# Color System Architecture

Updated after simplification (DSL mapping, stable token count guard, legacy removal in 2.0.0). This document describes the layered color model, design principles, and quality guarantees. Goal: predictable change surface, consistency and accessibility (contrast + transparency) with minimal duplication.

## Layered Model

- Base Palette (`src/core/palette.ts`)
  - Static neutral + accent colors.
  - Only validated 6‑digit hex (`Hex` type), no operations.

- Color Utilities (`src/core/utils.ts`)
  - `mix`, `lighten`, `darken`, `withAlpha` (+ perceptual variants behind a flag).
  - Cached; prefer usage inside the interface palette layer only.

- Interface Palette (`src/core/interface.ts`)
  - Single source of truth for UI roles.
  - Groups:
    - `bg` – surfaces (base, elevated, overlay, hover/active/selection, etc.)
    - `text` – text roles (primary/inverse/muted/subtle/inactive, lineNumber*)
    - `border` – default/focus/separatorBackground
    - `button` – primary / secondary button set (bg/fg/hover/border/separator)
    - `state` – semantic (info/success/warning/error + hover variants)
    - `diff`, `git`, `minimap`, `dropdown`, `scmGraph` – specialized clusters
    - `derived` – composite roles: `link`, `terminal`, `overlays.dropBackground`, `findMatch`, `inlineChat`, `blockquote`
    - `charts` – dedicated chart palette (previously pulled raw base colors)
  - Theme generation never imports `basePalette` directly—only roles.

- Generators (`src/generators/`)
  - `modernInterfaceMapping.ts` – declarative DSL (`tokenConfig`) + `createTokens()` – the ONLY mapping source UI → VS Code color tokens.
  - (Legacy files removed in 2.0.0.)
  - `theme.ts` – assembles final theme (interface colors via DSL + syntax/semantic tokens).
  - `tokens.ts` – TextMate + semantic token colors derived from `syntaxPalette`.
  - No direct `basePalette` imports outside `interface.ts` (enforced by test `generator.no-basepalette`).

## Policies & Invariants

- Transparency: all `*dropBackground`, `*hoverHighlight`, `rangeHighlight`, `findMatchHighlight` remain semi‑transparent (covered by tests).
- Contrast: key pairs (activity bar inactive, tabs unfocused inactive, buttons, primary overlays) have advisory thresholds (see `contrast.basic.test.ts`).
- Link / Terminal coherence: `derived.link` aligns with terminal ANSI blue/cyan so links and paths don't look “dual‑toned”.
- Layer isolation: color additions/changes flow only through the interface palette. Generators never stitch raw base colors.

## Why `charts` and ANSI moved into roles

Previously `charts.*` and `terminal.ansi*` siphoned colors directly from `basePalette`, fragmenting responsibility. Now:

- `interfacePalette.charts` carries all chart colors.
- `interfacePalette.derived.terminal` carries full ANSI + bright set.
Centralization simplifies global tone/contrast adjustments.

## Quality Test Mesh

1. Structural stability – snapshot of full theme + `theme.count.test.ts` (fails on accidental color token removal/addition).
2. Schema + denylist validation – unified `forbidden.and.allowed.tokens.test.ts`.
3. Transparency / alpha policies – `tokenRegistry.test.ts` + `transparencyRules.test.ts`.
4. Contrast advisory – `contrast.basic` & `contrast.alphaAware` reduce regressions.
5. Layer rule – `generator.no-basepalette` forbids raw base usage.
6. Perceptual (OKLCH) targets – `shadows.oklch`, `border.*`, `peekView.*` ensure subtle correctness.
7. Quiet CI – `QUIET=1 npm run build` or test setup suppresses noisy logs.

## Current Status / Improvements

| Item | Status | Notes |
|------|--------|-------|
| TOKENS.md auto-generation | done | `npm run docs:tokens` from DSL |
| Partial snapshots | done | 3 suites: core / lists_panels / terminal_widgets |
| Legacy removal (`interfaceMapping`, `themeEngine`) | done (2.0.0) | Breaking change |
| OKLCH default for mix/lighten/darken | staged flag | Enabled via `USE_PERCEPTUAL=1` env |
| Diff script for CHANGELOG | done | `scripts/diff-theme.ts` |
| Expanded perceptual checks | planned | Broader semi‑transparent sets |

## Making Changes

1. Add / adjust a role in `interfacePalette` (new subgroup if needed; derived logic → `derived`).
2. Add VS Code token in `tokenConfig` (group in `modernInterfaceMapping.ts`) + meaningful `description` (docs generation).
3. Run `npm test` – token count guard or alpha/forbidden tests will catch omissions.
4. For intentional visual changes: update snapshot via `npm run test:update`.
5. Manually spot‑check critical surfaces (menus, tabs, terminal, hover/selection) & contrast edge cases.
6. CI noise‑free builds: `QUIET=1 npm run build`.

Result: low cognitive load (single DSL), guarded refactors (count + validators), fast evolution with explicit intent.

---
**Legacy**: As of 2.0.0 deprecated files (`interfaceMapping.ts`, `themeEngine.ts` + related types) are removed. The DSL (`modernInterfaceMapping.ts`) is the sole mapping source.
