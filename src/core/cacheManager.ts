/**
 * CacheManager - расширенный менеджер кэширования с LRU стратегией
 */
import {
  ICacheManager,
  CacheConfig,
  CacheEvent,
  ICacheObserver,
} from './interfaces/ICacheManager'

export class CacheManager implements ICacheManager {
  private cache: Map<string, { value: any; ttl?: number; timestamp: number }>
  private capacity: number
  private hits: number = 0
  private misses: number = 0
  private observers: ICacheObserver[] = []
  private config: CacheConfig

  constructor(capacity: number = 512) {
    this.cache = new Map()
    this.capacity = capacity
    this.config = {
      maxSize: capacity,
      defaultTTL: 0,
      enableCompression: false,
      enablePersistence: false,
      cleanupInterval: 60000,
      strategy: 'lru',
    }
  }

  /**
   * Получение значения из кэша
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key)

    if (entry !== undefined) {
      // Проверяем TTL
      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
        this.misses++
        this.notifyObservers({ type: 'expire', key, timestamp: new Date() })
        return undefined
      }

      this.hits++
      // Перемещаем ключ в конец (самый свежий)
      this.cache.delete(key)
      this.cache.set(key, entry)
      this.notifyObservers({ type: 'hit', key, timestamp: new Date() })
      return entry.value
    }

    this.misses++
    this.notifyObservers({ type: 'miss', key, timestamp: new Date() })
    return undefined
  }

  /**
   * Установка значения в кэш
   */
  set<T>(key: string, value: T, ttl?: number): void {
    // Если ключ уже существует, удаляем его для обновления позиции
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    const entry = {
      value,
      ttl: ttl || this.config.defaultTTL,
      timestamp: Date.now(),
    }

    this.cache.set(key, entry)
    this.notifyObservers({ type: 'set', key, timestamp: new Date() })

    // Эвиктим самый старый, если превысили ёмкость
    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey)
      }
    }
  }

  /**
   * Проверка наличия ключа в кэше
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (entry && entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }
    return this.cache.has(key)
  }

  /**
   * Удаление ключа из кэша
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key)
    if (deleted) {
      this.notifyObservers({ type: 'delete', key, timestamp: new Date() })
    }
    return deleted
  }

  /**
   * Очистка кэша
   */
  clear(): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
    this.notifyObservers({ type: 'clear', key: '', timestamp: new Date() })
  }

  /**
   * Пакетные операции
   */
  getMany<T>(keys: string[]): Map<string, T | undefined> {
    const result = new Map<string, T | undefined>()
    for (const key of keys) {
      result.set(key, this.get<T>(key))
    }
    return result
  }

  setMany<T>(entries: Map<string, T>, ttl?: number): void {
    for (const [key, value] of entries) {
      this.set(key, value, ttl)
    }
  }

  deleteMany(keys: string[]): number {
    let deleted = 0
    for (const key of keys) {
      if (this.delete(key)) {
        deleted++
      }
    }
    return deleted
  }

  /**
   * Управление временем жизни
   */
  setTTL(key: string, ttl: number): boolean {
    const entry = this.cache.get(key)
    if (entry) {
      entry.ttl = ttl
      return true
    }
    return false
  }

  getTTL(key: string): number | undefined {
    const entry = this.cache.get(key)
    return entry?.ttl
  }

  expire(key: string): boolean {
    return this.delete(key)
  }

  /**
   * Статистика и мониторинг
   */
  getStats() {
    const total = this.hits + this.misses
    const hitRate = total > 0 ? (this.hits / total) * 100 : 0

    return {
      size: this.cache.size,
      capacity: this.capacity,
      hits: this.hits,
      misses: this.misses,
      hitRate: `${hitRate.toFixed(2)}%`,
      keys: Array.from(this.cache.keys()),
    }
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys())
  }

  getSize(): number {
    return this.cache.size
  }

  /**
   * Очистка по шаблону
   */
  clearPattern(pattern: string): number {
    const regex = new RegExp(pattern)
    const keysToDelete = Array.from(this.cache.keys()).filter((key) =>
      regex.test(key)
    )
    let deleted = 0

    for (const key of keysToDelete) {
      if (this.delete(key)) {
        deleted++
      }
    }

    return deleted
  }

  clearExpired(): number {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key)
      }
    }

    let deleted = 0
    for (const key of keysToDelete) {
      if (this.delete(key)) {
        deleted++
      }
    }

    return deleted
  }

  /**
   * Персистентность
   */
  async saveToDisk(path: string): Promise<void> {
    if (!this.config.enablePersistence) {
      throw new Error('Persistence is not enabled')
    }

    const data = {
      cache: Array.from(this.cache.entries()),
      config: this.config,
      hits: this.hits,
      misses: this.misses,
    }

    // В реальной реализации здесь была бы запись в файл
    console.log(`Saving cache to ${path}`, data)
  }

  async loadFromDisk(path: string): Promise<void> {
    if (!this.config.enablePersistence) {
      throw new Error('Persistence is not enabled')
    }

    // В реальной реализации здесь было бы чтение из файла
    console.log(`Loading cache from ${path}`)
  }

  /**
   * Конфигурация
   */
  setConfig(config: CacheConfig): void {
    this.config = { ...this.config, ...config }
    if (config.maxSize !== undefined) {
      this.capacity = config.maxSize
    }
  }

  getConfig(): CacheConfig {
    return { ...this.config }
  }

  /**
   * Наблюдатели
   */
  addObserver(observer: ICacheObserver): void {
    this.observers.push(observer)
  }

  removeObserver(observer: ICacheObserver): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  private notifyObservers(event: CacheEvent): void {
    for (const observer of this.observers) {
      try {
        observer.onCacheEvent(event)
      } catch (error) {
        console.error('Error in cache observer:', error)
      }
    }
  }

  /**
   * Дополнительные полезные методы
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  values(): any[] {
    return Array.from(this.cache.values()).map((entry) => entry.value)
  }

  entries(): [string, any][] {
    return Array.from(this.cache.entries()).map(([key, entry]) => [
      key,
      entry.value,
    ])
  }
}
