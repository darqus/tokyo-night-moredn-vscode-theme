# Система уровней доступа к свойствам

## Обзор

Реализована комплексная система цветовой подсветки для различных уровней доступа к свойствам объектов, массивов и JSON-структур. Система автоматически определяет глубину вложенности и применяет соответствующие цвета.

## Поддерживаемые типы доступа

### 1. Object Key Levels (Ключи объектов)

**Цель:** Различимость ключей объектов по уровню вложенности

**Генерируемые токены:**

- `objectKeyLevel1` - `#7cc6fd` (cyan-blue)
- `objectKeyLevel2` - `#91d287` (green-teal)
- `objectKeyLevel3` - `#7cc7fe` (azure light)
- `objectKeyLevel4` - `#b291ee` (magenta-purple)
- `objectKeyLevel5` - `#8399ef` (teal-cyan)
- `objectKeyLevel6` - `#ec7871` (blue-purple)
- `objectKeyLevel7` - `#92ce9e` (red-orange)
- `objectKeyLevel8` - `#7fddca` (green-cyan)

**Примеры кода:**

```javascript
const config = {
  database: {           // Level 1 - #7cc6fd
    host: 'localhost',
    settings: {         // Level 2 - #91d287
      timeout: 5000,
      pool: {           // Level 3 - #7cc7fe
        min: 2,
        max: {          // Level 4 - #b291ee
          connections: 10
        }
      }
    }
  }
}
```

### 2. Property Chain Access (Цепочки доступа)

**Цель:** Подсветка последовательных обращений к свойствам

**Генерируемые токены:**

- `propertyChain1` - `#7dc8fe` (cyan-blue light)
- `propertyChain2` - `#7ed7b2` (green-teal blend)
- `propertyChain3` - `#e6ac67` (orange-yellow)
- `propertyChain4` - `#b494ed` (purple-magenta)
- `propertyChain5` - `#7fddca` (blue-cyan)
- `propertyChain6` - `#db7b82` (magenta-red)

**Примеры кода:**

```javascript
// Цепочки доступа к свойствам
user.profile.settings.theme        // Level 1-3
window.document.body.style         // Level 1-3
app.config.database.connection     // Level 1-3

// TypeScript property access
interface.member.property          // Level 1-2
class.method.parameter.value       // Level 1-3
```

### 3. Array Access Levels (Доступ к массивам)

**Цель:** Подсветка обращений к элементам массивов

**Генерируемые токены:**

- `arrayAccess1` - `#fa9368` (orange-red)
- `arrayAccess2` - `#9387e1` (purple-blue)
- `arrayAccess3` - `#7ed5b0` (teal-green)
- `arrayAccess4` - `#e6d264` (yellow-cyan)

**Примеры кода:**

```javascript
// Доступ к элементам массивов
array[0]                          // Level 1 - #fa9368
matrix[i][j]                      // Level 1-2
users[0].roles[1].permissions     // Mixed levels
```

### 4. JSON Key Levels (JSON ключи)

**Цель:** Различимость ключей в JSON-структурах по глубине

**Расширено до 8 уровней:**

- Level 0-7 используют токены `objectKeyLevel1`-`objectKeyLevel8`

**Примеры JSON:**

```json
{
  "config": {           // Level 0 - #7cc6fd
    "database": {       // Level 1 - #91d287
      "connection": {   // Level 2 - #7cc7fe
        "pool": {       // Level 3 - #b291ee
          "settings": { // Level 4 - #8399ef
            "timeout": {// Level 5 - #ec7871
              "retry": {// Level 6 - #92ce9e
                "max": 3// Level 7 - #7fddca
              }
            }
          }
        }
      }
    }
  }
}
```

## Supported Scopes (Поддерживаемые области)

### Object Literal Keys

```
meta.objectliteral meta.object.member meta.object-literal.key
meta.field.declaration.ts variable.object.property
```

### Property Access Chains

```
meta.property.object variable.other.property
support.variable.property
variable.other.object.property
```

### Array Access

```
meta.brace.square.js
meta.array.literal variable.other.object.property
variable.other.property.ts
```

### JSON Structure

```
source.json meta.structure.dictionary.json support.type.property-name.json
(с различными уровнями meta.structure.dictionary.value.json)
```

## Алгоритм цветовой генерации

Все цвета генерируются с использованием утилит палитры:

```typescript
// Примеры генерации
objectKeyLevel1: () => toward(basePalette.cyan, basePalette.blue, 0.2)
propertyChain1: () => toward(basePalette.cyan, basePalette.blue, 0.15)
arrayAccess1: () => toward(basePalette.orange, basePalette.red, 0.2)
```

**Используемые функции:**

- `toward(color1, color2, intensity)` - смешивание с направлением
- `blend(color1, color2, ratio)` - равномерное смешивание
- Базовые цвета из `basePalette` (cyan, blue, green, teal, orange, etc.)

## Преимущества системы

1. **Автоматическая глубина** - VS Code автоматически определяет уровень вложенности
2. **Визуальная иерархия** - каждый уровень имеет уникальный цвет
3. **Консистентность** - цвета генерируются по единому алгоритму
4. **Расширяемость** - легко добавлять новые уровни и типы доступа
5. **Производительность** - минимальное влияние на производительность редактора

## Интеграция с существующей системой

Новая система дополняет существующие:

- **Brackets** - цвета скобок `()`, `[]`, `{}`, `<>`
- **Punctuation** - точки, запятые, двоеточия
- **Basic tokens** - переменные, функции, ключевые слова

Все системы работают согласованно и не конфликтуют друг с другом.

## Тестирование

Система полностью покрыта тестами:

- Unit тесты палитры
- Snapshot тесты темы
- Валидация цветовых токенов
- Проверка уникальности цветов

```bash
npm test                 # Полный набор тестов
npm run test:unit        # Unit тесты
npm run validate:all     # Валидация темы
```
