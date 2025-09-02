# 🌈 Theme Collection

## 17 Theme Variants

### Core Themes (3)
- **Tokyo Night Dark** - Original dark theme
- **Tokyo Night Storm** - Cooler storm variant  
- **Tokyo Night Moon** - Muted lunar variant

### Seasonal Collection (4)
- **Tokyo Night Spring** - Fresh spring palette (+15° hue)
- **Tokyo Night Summer** - Bright summer colors (+30° hue)
- **Tokyo Night Autumn** - Warm autumn tones (-30° hue)
- **Tokyo Night Winter** - Cool winter atmosphere (-15° hue)

### Accessibility Themes (4)
- **Tokyo Night High Contrast** - Enhanced contrast (2.0×)
- **Tokyo Night Low Contrast** - Reduced contrast (0.5×)
- **Tokyo Night Protanopia Friendly** - Red-green color blind support
- **Tokyo Night Deuteranopia Friendly** - Green-red color blind support

### Creative Variants (3)
- **Tokyo Night Pastel** - Soft pastel tones (0.3× saturation)
- **Tokyo Night Retro** - Nostalgic retro palette

### Gradient Collection (3)
- **Tokyo Night Gradient 1-3** - Smooth color transitions

## Generation

All themes are generated programmatically:

```bash
npm run generate:all    # Generate all 17 variants
```

## Customization

Create your own variant:

```bash
npm run theme-cli -- custom --name=my-theme --hue=60 --saturation=1.3
```