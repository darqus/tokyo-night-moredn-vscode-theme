# Legacy Components (2.0.0 Reference)

As of 2.0.0 all previously deprecated files are removed. This document remains for historical reference and migration help.

## Removed Files

| File | Status | Deprecation Reason | Replacement |
|------|--------|--------------------|-------------|
| `src/generators/interfaceMapping.ts` | removed in 2.0.0 | Manual duplicate mapping logic | `modernInterfaceMapping.ts` (DSL) |
| `src/core/themeEngine.ts` | removed in 2.0.0 | Unused abstraction (plugins/factory) | Direct `generateTheme` + DSL |
| `src/types/themeEngine.ts` | removed in 2.0.0 | Types only served removed engine | Native theme types (`VSCodeTheme`) |

## Policy (Post 2.0.0)

- Legacy artifacts must not reappear.
- DSL (`modernInterfaceMapping.ts`) is the sole mapping layer.
- No backward shims; imports must be updated.

## Migration (1.x → 2.0.0)

If you imported `colorMappings` from the legacy file:

```ts
// Old (removed)
import { colorMappings } from '.../interfaceMapping'

// New
import { createTokens } from '.../modernInterfaceMapping'
const colors = createTokens(interfacePalette)
```

## Removal Criteria

- No internal references for > 1 minor iteration.
- No demonstrated plugin extension need.
- DSL clarity + tests fully covered previous logic.

## Roadmap After Removal

1. Expand OKLCH operations default (env‑flagged → stable).
2. Enhance diff script (group / hue deltas).
3. Broaden perceptual tests for layered semi‑transparent overlays.
