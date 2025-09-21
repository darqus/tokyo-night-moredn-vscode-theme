# OKLCH rollout notes

This theme is transitioning select color derivations to OKLCH to gently improve perceptual readability and consistency. Changes ship in tiny, verifiable batches with unit tests and constrained deltas.

## Principles

- Small deltas: keep perceived brightness/chroma changes subtle (ΔL/ΔC small)
- Transparency-first: overlays that sit above content stay transparent when appropriate
- Test-coupled: every change is locked by a local unit test; snapshots are updated intentionally
- Surface-aware: keep tones coherent across base, elevated, overlay surfaces

## Peek View – before/after

Peek view highlights now derive from OKLCH-lightened blue tones with slight differences between match and selection to reduce visual merging.

Swatches (hex):

- Match highlight
  - Before: `#86afff33`
  - After:  `#85aeff2e` (slightly reduced alpha and brightness)
- Selection
  - Before: `#86afff33`
  - After:  `#86afff33` (unchanged; aligned with global selection tone)

Rationale: distinguish matches from selection subtly while keeping both transparent and cool-toned.

## Thin borders

- `menu.separatorBackground` and `editorHoverWidget.border` already use an OKLCH-tinted neutral.
- Now `widget.border` and `editorWidget.border` follow the same separator tone for consistent thin borders.

## What’s next

- Continue translating small groups (e.g., additional thin borders or overlay accents)
- Add more advisory contrast hints in the token registry with brief notes
- Iterate with small tests and minimal visual delta
