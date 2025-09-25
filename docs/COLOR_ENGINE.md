# Color Engine (sRGB vs OKLCH)

Central facade coordinates color derivations. Two paths:

| Path | Use Cases | Rationale |
|------|-----------|-----------|
| OKLCH (perceptual) | hover / active / selection overlays, transparent highlights (findMatch, range/word, peekView), shadows | Maintains chroma/lightness predictably; reduces muddy desaturation |
| sRGB (linear mix) | neutral mixes (grays), borders, simple lighten/darken with black/white | Faster, adequate for low‑chroma structural tones |

Transparency always applied via `withAlpha(#rrggbb, alpha)` → `#rrggbbaa`.

## API

- sRGB: `mix(a,b,t)`, `lighten(c, amt)`, `darken(c, amt)` (fallback path)
- Perceptual: `mixPerceptual(a,b,t)`, `lightenPerceptual(c, amt)`, `darkenPerceptual(c, amt)`
- Runtime flag `USE_PERCEPTUAL=1` transparently routes default `mix/lighten/darken` to perceptual variants.

## Guidance

- Use OKLCH for interactive emphasis & layered transparency.
- Keep borders / separators on sRGB unless hue shift is desirable.
- Review `src/core/interface.ts` for canonical role usage.

## Why OKLCH

OKLCH preserves hue and relative chroma changes when adjusting lightness; sRGB interpolation can flatten cool blues and cyans (critical in this palette). Perceptual blending keeps subtle differentiation between similar overlays without overshooting brightness.

## Safety / Fallback

Perceptual functions wrap conversion in guarded try/catch and fall back to sRGB if conversion fails or yields out‑of‑range values. Cache keys prevent redundant computations.

## Future Work

- Expand perceptual path as default (remove flag after stability window).
- Add optional delta‑E assertions in advisory tests.
- Provide a hue‑preserving darken variant for very high chroma accents if needed.
