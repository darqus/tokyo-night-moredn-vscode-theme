import type { 
  ITokenRegistry, 
  TokenRegistryConfig 
} from './interfaces/ITokenRegistry'
import type { 
  TokenMeta, 
  AlphaPolicy 
} from './tokenRegistry'
import { TOKEN_REGISTRY, type ITokenRegistry as ITokenRegistryFromTokenRegistry } from './tokenRegistry'
import type { SurfaceType } from './surfaces'

export class TokenRegistry implements ITokenRegistry {
  private tokens: Map<string, TokenMeta>
  private config: Required<TokenRegistryConfig>
  private validationErrors: string[] = []

  constructor(
    initialTokens: TokenMeta[] = TOKEN_REGISTRY,
    config: TokenRegistryConfig = {}
  ) {
    this.config = {
      enableValidation: config.enableValidation ?? true,
      strictMode: config.strictMode ?? false,
      autoResolveAliases: config.autoResolveAliases ?? true,
      maxTokens: config.maxTokens ?? 2000,
    }
    
    this.tokens = new Map()
    initialTokens.forEach(token => {
      this.tokens.set(token.key, token)
    })
  }

  // Управление токенами
  registerToken(token: TokenMeta): void {
    if (this.config.maxTokens && this.tokens.size >= this.config.maxTokens) {
      throw new Error(`Token registry exceeds maximum size of ${this.config.maxTokens}`)
    }
    
    this.tokens.set(token.key, token)
  }

  unregisterToken(key: string): void {
    this.tokens.delete(key)
  }

  getToken(key: string): TokenMeta | undefined {
    return this.tokens.get(key)
  }

  getAllTokens(): TokenMeta[] {
    return Array.from(this.tokens.values())
  }
  
  // Добавляем недостающие методы
  getRegistry(): TokenMeta[] {
    return Array.from(this.tokens.values())
  }

  getTokenMeta(key: string): TokenMeta | undefined {
    return this.tokens.get(key)
  }

  // Валидация
  validateToken(key: string, value: string): boolean {
    if (!this.config.enableValidation) {
      return true
    }

    const token = this.tokens.get(key)
    if (!token) {
      return true // Если токен не найден в реестре, считаем его валидным
    }

    if (token.alpha) {
      // Здесь могла бы быть более сложная проверка валидности
      return true
    }

    return true
  }

  validateAllTokens(colors: Record<string, string>): {
    valid: boolean
    errors: string[]
  } {
    if (!this.config.enableValidation) {
      return { valid: true, errors: [] }
    }

    const errors: string[] = []
    const registeredKeys = new Set(this.tokens.keys())

    for (const [key, value] of Object.entries(colors)) {
      if (registeredKeys.has(key)) {
        if (!this.validateToken(key, value)) {
          errors.push(`Invalid token value for ${key}: ${value}`)
        }
      }
    }

    return { valid: errors.length === 0, errors }
  }

  // Фильтрация и поиск
  getTokensBySurface(surface: SurfaceType): TokenMeta[] {
    return Array.from(this.tokens.values()).filter(token => 
      token.surface === surface
    )
  }

  getTokensByAlphaPolicy(policy: AlphaPolicy): TokenMeta[] {
    return Array.from(this.tokens.values()).filter(token => 
      token.alpha === policy
    )
  }

  getDeprecatedTokens(): TokenMeta[] {
    return Array.from(this.tokens.values()).filter(token => 
      token.deprecated === true
    )
  }

  findTokensByPattern(pattern: string): TokenMeta[] {
    const regex = new RegExp(pattern, 'i')
    return Array.from(this.tokens.values()).filter(token => 
      regex.test(token.key)
    )
  }

  // Алиасы
  resolveAlias(key: string): string | undefined {
    if (!this.config.autoResolveAliases) {
      return undefined
    }

    const token = this.tokens.get(key)
    if (token?.aliasOf) {
      return token.aliasOf
    }

    return undefined
  }

  getAliasChains(): Map<string, string[]> {
    const chains = new Map<string, string[]>()
    
    for (const [key, token] of this.tokens.entries()) {
      if (token.aliasOf) {
        const chain = chains.get(token.aliasOf) || []
        chain.push(key)
        chains.set(token.aliasOf, chain)
      }
    }
    
    return chains
  }

  // Метаданные
  getTokenContrastHints(
    key: string
  ): { primaryMin?: number; mutedMin?: number } | undefined {
    const token = this.tokens.get(key)
    return token?.contrastHints
  }

  getTokenBackgroundKey(key: string): string | undefined {
    const token = this.tokens.get(key)
    return token?.bgKey
  }

  getTokenNotes(key: string): string | undefined {
    const token = this.tokens.get(key)
    return token?.notes
  }

  // Экспорт/импорт
  exportRegistry(): string {
    const exportData = {
      tokens: Array.from(this.tokens.values()),
      config: this.config,
      timestamp: new Date().toISOString(),
    }

    return JSON.stringify(exportData, null, 2)
  }

  importRegistry(data: string): boolean {
    try {
      const parsed = JSON.parse(data)

      if (!Array.isArray(parsed.tokens)) {
        throw new Error('Invalid registry data structure')
      }

      // Очистка текущих токенов
      this.tokens.clear()

      // Импорт новых токенов
      for (const token of parsed.tokens) {
        this.tokens.set(token.key, token)
      }

      // Применение конфигурации
      if (parsed.config) {
        this.config = { ...this.config, ...parsed.config }
      }

      return true
    } catch (error) {
      this.validationErrors.push(
        `Import error: ${error instanceof Error ? error.message : String(error)}`
      )
      return false
    }
  }
}