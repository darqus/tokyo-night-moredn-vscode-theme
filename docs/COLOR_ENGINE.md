# Color Engine (sRGB vs OKLCH)

Этот проект использует централизованный фасад цветовых операций `src/core/colorEngine.ts`.

Основные принципы (TL;DR):

- Используем OKLCH для перцептуально устойчивых операций:
  - hover/active/selection тона
  - прозрачные подсветки (findMatch, word/range highlight, peekView)
  - тени (widget.shadow, scrollbar.shadow)
- Используем sRGB для нейтральных/структурных операций:
  - серые/нейтральные миксы, бордеры, базовые затемнения/осветления
  - простые миксы с белым/чёрным для вспомогательных тонов
- Прозрачность — только `withAlpha(hex6, alpha)` → hex8.

API фасада:

- sRGB: `mixSrgb(a,b,t)`, `lightenSrgb(c, amt)`, `darkenSrgb(c, amt)`, `withAlpha(c, a)`
- OKLCH: `mixPerceptual(a,b,t)`, `lightenPerceptual(c, amt)`, `darkenPerceptual(c, amt)`

Где применять:

- Интерфейсные состояния (hover/selection) и подсветки → OKLCH
- Разделители/границы и нейтральные фоны → sRGB
- Если сомневаетесь: см. `src/core/interface.ts` как эталон применения.

Почему так:

- OKLCH даёт более предсказуемые изменения светлоты/хромы: меньше «грязи» при полупрозрачных наложениях и подсветках.
- sRGB проще и дешевле для строгих нейтральных тонов (границы/серые), где перцептуальная точность менее критична.
