/**
 * Интерфейс для менеджера кэширования
 */
import type { getCacheStats } from '../cache'

export interface ICacheManager {
  // Основные операции
  get<T>(key: string): T | undefined
  set<T>(key: string, value: T, ttl?: number): void
  delete(key: string): boolean
  clear(): void

  // Пакетные операции
  getMany<T>(keys: string[]): Map<string, T | undefined>
  setMany<T>(entries: Map<string, T>, ttl?: number): void
  deleteMany(keys: string[]): number

  // Управление временем жизни
  setTTL(key: string, ttl: number): boolean
  getTTL(key: string): number | undefined
  expire(key: string): boolean

  // Статистика и мониторинг
  getStats(): ReturnType<typeof getCacheStats>
  getKeys(): string[]
  has(key: string): boolean
  getSize(): number

  // Очистка по шаблону
  clearPattern(pattern: string): number
  clearExpired(): number

  // Персистентность
  saveToDisk(path: string): Promise<void>
  loadFromDisk(path: string): Promise<void>

  // Конфигурация
  setConfig(config: CacheConfig): void
  getConfig(): CacheConfig
}

export interface CacheConfig {
  maxSize?: number
  defaultTTL?: number
  enableCompression?: boolean
  enablePersistence?: boolean
  cleanupInterval?: number
  strategy?: 'lru' | 'fifo' | 'lfu' | 'random'
}

export interface CacheEvent {
  type: 'hit' | 'miss' | 'set' | 'delete' | 'expire' | 'clear'
  key: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface ICacheObserver {
  onCacheEvent(event: CacheEvent): void
}

export interface ICacheManagerExtended extends ICacheManager {
  // Наблюдатели
  addObserver(observer: ICacheObserver): void
  removeObserver(observer: ICacheObserver): void

  // Продвинутые операции
  getOrSet<T>(key: string, factory: () => T, ttl?: number): T
  wrap<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T>

  // Транзакции
  transaction<T>(callback: (cache: ICacheManager) => T): T

  // Кластеризация
  syncWithRemote?(remoteCache: ICacheManager): Promise<void>
  enableClusterMode?(config: ClusterConfig): void
}

export interface ClusterConfig {
  nodes: string[]
  syncInterval?: number
  conflictResolution?: 'last-write-wins' | 'first-write-wins' | 'merge'
}
