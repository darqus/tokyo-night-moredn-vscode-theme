# Release & Versioning

We ship via automated scripts with conventional commit analysis.

## Rules

- Auto-detect release type: breaking → MAJOR, feat → MINOR, else PATCH
- Version bump also accounts for the number of commits since the last tag:
  - patch: patch += commitsCount (min 1)
  - minor: minor += 1; patch = commitsCount (min 1)
  - major: major += 1; minor = 0; patch = commitsCount (min 1)
- Prerelease adds suffix: `-beta.<commitsCount>`

The pure version calculation lives in `scripts/versioning.ts` (`computeVersion`).

## Commands

- `npm run release` — Release via TypeScript script
- `npm run release:dry` — Dry-run (no changes)
- `npm run release:patch|minor|major` — Force type
- `npm run release:bash` — Bash alternative

## Outputs

Bumps `package.json`, updates THEME_VERSION in `src/generators/theme.ts`, creates tag/GitHub release (if CLI available), and packages the extension.
