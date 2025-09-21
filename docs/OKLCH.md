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

## Try it: quick swatches

Use these hex values to preview the change in your editor:

- Peek match: `#86afff33` → `#85aeff2e`
- Peek selection: `#86afff33` → `#86afff33` (unchanged)
- Thin border: `#202230` → `#30344c`

Shadows:

- Scrollbar shadow: `#282d43` → `#272b40`
- Widget shadow: `#282d43` → `#282d43eb` (slightly translucent)

Example CSS to reproduce the chips locally (optional):

```css
.chip { width: 28px; height: 20px; border: 1px solid #202230; display: inline-block; }
.chip.old-match { background: #86afff33; }
.chip.new-match { background: #85aeff2e; }
.chip.border-old { background: #202230; border-color: #202230; }
.chip.border-new { background: #30344c; border-color: #30344c; }
```

## Thin borders

- `menu.separatorBackground` and `editorHoverWidget.border` already use an OKLCH-tinted neutral.
- Now `widget.border` and `editorWidget.border` follow the same separator tone for consistent thin borders.

## What’s next

- Continue translating small groups (e.g., additional thin borders or overlay accents)
- Add more advisory contrast hints in the token registry with brief notes
- Iterate with small tests and minimal visual delta

### Why cooler, slightly translucent overlay shadows?

On dark backgrounds, a cooler (blue-leaning) shadow with a touch of translucency increases edge legibility without appearing heavy. It helps separate floating widgets from the base surface while keeping the overall atmosphere calm and modern.
