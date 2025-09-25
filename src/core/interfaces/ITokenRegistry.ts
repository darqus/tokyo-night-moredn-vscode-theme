/**
 * Интерфейс для реестра токенов
 */
import type { TokenMeta, AlphaPolicy } from '../tokenRegistry'
import type { SurfaceType } from '../surfaces'

export interface ITokenRegistry {
  // Управление токенами
  registerToken(token: TokenMeta): void
  unregisterToken(key: string): void
  getToken(key: string): TokenMeta | undefined
  getAllTokens(): TokenMeta[]

  // Валидация
  validateToken(key: string, value: string): boolean
  validateAllTokens(colors: Record<string, string>): {
    valid: boolean
    errors: string[]
  }

  // Фильтрация и поиск
  getTokensBySurface(surface: SurfaceType): TokenMeta[]
  getTokensByAlphaPolicy(policy: AlphaPolicy): TokenMeta[]
  getDeprecatedTokens(): TokenMeta[]
  findTokensByPattern(pattern: string): TokenMeta[]

  // Алиасы
  resolveAlias(key: string): string | undefined
  getAliasChains(): Map<string, string[]>

  // Метаданные
  getTokenContrastHints(
    key: string
  ): { primaryMin?: number; mutedMin?: number } | undefined
  getTokenBackgroundKey(key: string): string | undefined
  getTokenNotes(key: string): string | undefined

  // Экспорт/импорт
  exportRegistry(): string
  importRegistry(data: string): boolean
}

export interface TokenRegistryConfig {
  enableValidation?: boolean
  strictMode?: boolean
  autoResolveAliases?: boolean
  maxTokens?: number
}
