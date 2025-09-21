/**
 * Кэширование цветовых операций с малым LRU для стабильной памяти
 */

// Простой LRU на базе Map: порядок вставки = порядок использования
const CAPACITY = 512
const colorCache = new Map<string, string>()

const touch = (key: string, value: string) => {
  // Перемещаем ключ в конец (самый свежий)
  if (colorCache.has(key)) colorCache.delete(key)
  colorCache.set(key, value)
  // Эвиктим самый старый, если превысили ёмкость
  if (colorCache.size > CAPACITY) {
    const oldestKey = colorCache.keys().next().value as string | undefined
    if (oldestKey !== undefined) colorCache.delete(oldestKey)
  }
}

/**
 * Получение кэшированного результата или вычисление нового (LRU)
 */
export const getCachedColor = <T extends any[]>(
  key: string,
  computeFn: (...args: T) => string,
  ...args: T
): string => {
  const hit = colorCache.get(key)
  if (hit !== undefined) {
    // Обновляем «свежесть»
    touch(key, hit)
    return hit
  }
  const result = computeFn(...args)
  touch(key, result)
  return result
}

/**
 * Очистка кэша (для тестов)
 */
export const clearColorCache = (): void => {
  colorCache.clear()
}

/**
 * Статистика кэша
 */
export const getCacheStats = () => ({
  size: colorCache.size,
  capacity: CAPACITY,
  keys: Array.from(colorCache.keys()),
})
