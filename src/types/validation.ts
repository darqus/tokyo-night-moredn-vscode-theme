/**
 * Типы для compile-time валидации цветовой системы
 */

import type { SurfaceType } from '../core/surfaces'

// Известные токены VS Code (часть для демонстрации)
export type VSCodeColorToken =
  // Base
  | 'foreground'
  | 'descriptionForeground'
  | 'disabledForeground'
  | 'focusBorder'
  | 'errorForeground'
  | 'selection.background'
  | 'widget.shadow'

  // Command Center
  | 'commandCenter.background'
  | 'commandCenter.activeBackground'
  | 'commandCenter.border'

  // Editor
  | 'editor.background'
  | 'editor.foreground'
  | 'editor.selectionBackground'
  | 'editor.inactiveSelectionBackground'
  | 'editor.lineHighlightBackground'
  | 'editorLineNumber.foreground'
  | 'editorLineNumber.activeForeground'
  | 'editorCursor.foreground'
  | 'editorIndentGuide.background1'
  | 'editorIndentGuide.activeBackground1'
  | 'editorStickyScroll.background'
  | 'editorStickyScrollHover.background'

  // Sidebar
  | 'sideBar.background'
  | 'sideBar.foreground'
  | 'sideBar.border'
  | 'sideBarSectionHeader.background'
  | 'sideBarSectionHeader.foreground'
  | 'editorGroup.border'
  | 'editorGroupHeader.noTabsBackground'
  | 'editorGroupHeader.tabsBackground'
  | 'editorGroupHeader.tabsBorder'
  // Activity Bar
  | 'activityBar.background'
  | 'activityBar.foreground'
  | 'activityBar.inactiveForeground'
  | 'activityBar.activeBorder'
  | 'activityBar.activeBackground'

  // Status Bar
  | 'statusBar.background'
  | 'statusBar.foreground'
  | 'statusBar.border'
  | 'statusBarItem.hoverBackground'
  | 'statusBarItem.hoverForeground'
  | 'statusBarItem.compactHoverBackground'
  | 'statusBarItem.prominentBackground'
  | 'statusBarItem.prominentForeground'
  | 'statusBarItem.prominentHoverBackground'
  | 'statusBarItem.prominentHoverForeground'
  | 'statusBarItem.remoteBackground'
  | 'statusBarItem.remoteForeground'
  | 'statusBarItem.remoteHoverBackground'
  | 'statusBarItem.remoteHoverForeground'

  // Tabs
  | 'tab.activeBackground'
  | 'tab.activeForeground'
  | 'tab.activeBorderTop'
  | 'tab.inactiveBackground'
  | 'tab.inactiveForeground'
  | 'tab.hoverBackground'
  | 'tab.hoverForeground'

  // Title Bar
  | 'titleBar.activeBackground'
  | 'titleBar.inactiveBackground'
  | 'titleBar.border'

  // Panels
  | 'panel.background'
  | 'panel.border'
  | 'panelSectionHeader.background'
  | 'panelSectionHeader.foreground'
  | 'panelTitle.activeForeground'
  | 'panelTitle.inactiveForeground'
  | 'panelTitle.activeBorder'
  | 'panelTitleBadge.background'
  | 'panelTitleBadge.foreground'

  // Lists
  | 'list.activeSelectionBackground'
  | 'list.activeSelectionForeground'
  | 'list.inactiveSelectionBackground'
  | 'list.inactiveSelectionForeground'
  | 'list.hoverBackground'
  | 'list.hoverForeground'
  | 'list.focusBackground'
  | 'list.focusForeground'
  | 'list.highlightForeground'

  // Input
  | 'input.background'
  | 'input.foreground'
  | 'input.border'
  | 'input.placeholderForeground'
  | 'inputOption.activeBorder'
  | 'dropdown.background'
  | 'dropdown.foreground'
  | 'dropdown.border'
  | 'dropdown.listBackground'

  // Buttons
  | 'button.background'
  | 'button.foreground'
  | 'button.hoverBackground'
  | 'button.border'
  | 'button.separator'
  | 'button.secondaryBackground'
  | 'button.secondaryForeground'
  | 'button.secondaryHoverBackground'

  // Badges
  | 'badge.background'
  | 'badge.foreground'
  | 'activityBarBadge.background'
  | 'activityBarBadge.foreground'
  | 'extensionBadge.remoteBackground'
  | 'extensionBadge.remoteForeground'

  // Menus
  | 'menu.background'
  | 'menu.foreground'
  | 'menu.selectionBackground'
  | 'menu.selectionForeground'
  | 'menu.selectionBorder'
  | 'menu.border'
  | 'menubar.selectionBorder'
  | 'menubar.selectionBackground'
  | 'menubar.selectionForeground'

  // Terminal
  | 'terminal.background'
  | 'terminal.foreground'
  | 'terminal.selectionBackground'
  | 'terminal.inactiveSelectionBackground'
  | 'terminal.border'
  | 'terminal.hoverHighlightBackground'
  | 'terminal.ansiBlack'
  | 'terminal.ansiRed'
  | 'terminal.ansiGreen'
  | 'terminal.ansiYellow'
  | 'terminal.ansiBlue'
  | 'terminal.ansiMagenta'
  | 'terminal.ansiCyan'
  | 'terminal.ansiWhite'
  | 'terminal.ansiBrightBlack'
  | 'terminal.ansiBrightRed'
  | 'terminal.ansiBrightGreen'
  | 'terminal.ansiBrightYellow'
  | 'terminal.ansiBrightBlue'
  | 'terminal.ansiBrightMagenta'
  | 'terminal.ansiBrightCyan'
  | 'terminal.ansiBrightWhite'
  | 'terminalCommandDecoration.defaultBackground'
  | 'terminalCommandDecoration.successBackground'
  | 'terminalCommandDecoration.errorBackground'

  // Debug
  | 'debugToolBar.background'
  | 'debugToolBar.border'
  | 'debugExceptionWidget.background'
  | 'debugExceptionWidget.border'
  | 'debugIcon.breakpointForeground'
  | 'debugIcon.breakpointDisabledForeground'
  | 'debugIcon.breakpointUnverifiedForeground'
  | 'debugIcon.breakpointCurrentStackframeForeground'
  | 'debugIcon.breakpointStackframeForeground'
  | 'editor.stackFrameHighlightBackground'
  | 'editor.focusedStackFrameHighlightBackground'

  // Links
  | 'textLink.foreground'
  | 'textLink.activeForeground'
  | 'editorLink.activeForeground'

  // Markdown
  | 'textBlockQuote.background'
  | 'textBlockQuote.border'
  // PeekView extras used in mapping
  | 'peekViewEditor.background'
  | 'peekViewResult.background'
  | 'peekViewTitle.background'

  // PeekView tokens
  | 'peekViewEditor.matchHighlightBackground'
  | 'peekViewResult.matchHighlightBackground'
  | 'peekViewResult.selectionBackground'

  // Widget and Panel tokens
  | 'widget.border'
  | 'widget.shadow'
  | 'editorWidget.border'
  | 'panelSection.border'
  | 'panelSectionHeader.border'
  | 'menu.separatorBackground'
  | 'editorHoverWidget.border'
  | 'editorHoverWidget.foreground'
  | 'icon.foreground'

  // Quick Input tokens
  | 'quickInput.foreground'
  | 'quickInputTitle.background'
  | 'quickInputList.focusBackground'
  | 'quickInputList.focusForeground'

  // Search tokens
  | 'list.filterMatchBackground'
  | 'list.filterMatchBorder'
  | 'searchEditor.findMatchBackground'
  | 'searchEditor.findMatchBorder'
  | 'editor.findMatchBackground'
  | 'editor.findMatchBorder'
  | 'editor.findMatchHighlightBackground'
  | 'editor.findMatchForeground'
  | 'terminal.findMatchBackground'
  | 'terminal.findMatchBorder'
  | 'terminal.findMatchHighlightBackground'
  | 'editor.wordHighlightBackground'
  | 'editor.wordHighlightStrongBackground'
  | 'editor.hoverHighlightBackground'

  // Overview Ruler & Minimap
  | 'editorOverviewRuler.findMatchForeground'
  | 'editorOverviewRuler.rangeHighlightForeground'
  | 'editorOverviewRuler.selectionHighlightForeground'
  | 'editorOverviewRuler.wordHighlightForeground'
  | 'editorOverviewRuler.wordHighlightStrongForeground'
  | 'minimap.findMatchHighlight'
  | 'minimap.selectionHighlight'
  | 'terminalOverviewRuler.findMatchForeground'

  // Diff Editor
  | 'diffEditor.insertedTextBackground'
  | 'diffEditor.removedTextBackground'
  | 'diffEditor.insertedLineBackground'
  | 'diffEditor.removedLineBackground'
  | 'diffEditor.diagonalFill'

  // Merge Editor
  | 'merge.border'
  | 'merge.currentHeaderBackground'
  | 'merge.currentContentBackground'
  | 'merge.incomingHeaderBackground'
  | 'merge.incomingContentBackground'
  | 'merge.commonHeaderBackground'
  | 'merge.commonContentBackground'

  // Toolbar tokens
  | 'toolbar.hoverBackground'
  | 'toolbar.activeBackground'
  | 'toolbar.hoverOutline'

  // Inline Chat tokens
  | 'inlineChat.background'
  | 'inlineChat.foreground'
  | 'inlineChat.border'

  // Scrollbar tokens
  | 'scrollbar.shadow'
  | 'scrollbarSlider.background'
  | 'scrollbarSlider.hoverBackground'
  | 'scrollbarSlider.activeBackground'

  // Editor range tokens
  | 'editor.rangeHighlightBackground'

  // Drop background tokens
  | 'editorGroup.dropBackground'
  | 'list.dropBackground'
  | 'panelSection.dropBackground'
  | 'terminal.dropBackground'

  // Notifications
  | 'notifications.background'
  | 'notifications.foreground'
  | 'notifications.border'

  // Editor Widgets
  | 'editorHoverWidget.background'
  | 'editorHoverWidget.highlightForeground'
  | 'editorSuggestWidget.background'
  | 'editorSuggestWidget.border'
  | 'editorSuggestWidget.highlightForeground'
  | 'editorSuggestWidget.selectedBackground'
  | 'editorSuggestWidget.selectedForeground'
  | 'editorSuggestWidget.selectedIconForeground'
  | 'quickInput.background'
  | 'editorWidget.background'

// Validation types
export type ValidTokens = VSCodeColorToken
export type ValidSurfaces = SurfaceType

// Enhanced token mapping with validation
export interface ValidatedTokenMapping<T extends ValidTokens = ValidTokens> {
  token: T
  color: string
  surface?: ValidSurfaces
  validated: true
}

// Type-safe color mapping
export type ColorMapping = Record<ValidTokens, string>

// Type guard for valid tokens
export function getValidTokensList(): ValidTokens[] {
  const validTokens: ValidTokens[] = [
    'foreground',
    'descriptionForeground',
    'disabledForeground',
    'focusBorder',
    'errorForeground',
    'selection.background',
    'widget.shadow',
    'commandCenter.background',
    'commandCenter.activeBackground',
    'commandCenter.border',
    'editor.background',
    'editor.foreground',
    'editor.selectionBackground',
    'editor.inactiveSelectionBackground',
    'editor.lineHighlightBackground',
    'editorLineNumber.foreground',
    'editorLineNumber.activeForeground',
    'editorCursor.foreground',
    'editorIndentGuide.background1',
    'editorIndentGuide.activeBackground1',
    'editorStickyScroll.background',
    'editorStickyScrollHover.background',
    'sideBar.background',
    'sideBar.foreground',
    'sideBar.border',
    'sideBarSectionHeader.background',
    'sideBarSectionHeader.foreground',
    'activityBar.background',
    'activityBar.foreground',
    'activityBar.inactiveForeground',
    'activityBar.activeBorder',
    'activityBar.activeBackground',
    'statusBar.background',
    'statusBar.foreground',
    'statusBar.border',
    'statusBarItem.hoverBackground',
    'statusBarItem.hoverForeground',
    'statusBarItem.compactHoverBackground',
    'statusBarItem.prominentBackground',
    'statusBarItem.prominentForeground',
    'statusBarItem.prominentHoverBackground',
    'statusBarItem.prominentHoverForeground',
    'statusBarItem.remoteBackground',
    'statusBarItem.remoteForeground',
    'statusBarItem.remoteHoverBackground',
    'statusBarItem.remoteHoverForeground',
    'tab.activeBackground',
    'tab.activeForeground',
    'tab.activeBorderTop',
    'tab.inactiveBackground',
    'tab.inactiveForeground',
    'tab.hoverBackground',
    'tab.hoverForeground',
    'titleBar.activeBackground',
    'titleBar.inactiveBackground',
    'titleBar.border',
    'panel.background',
    'panel.border',
    'panelSectionHeader.background',
    'panelSectionHeader.foreground',
    'panelTitle.activeForeground',
    'panelTitle.inactiveForeground',
    'panelTitle.activeBorder',
    'panelTitleBadge.background',
    'panelTitleBadge.foreground',
    'list.activeSelectionBackground',
    'list.activeSelectionForeground',
    'list.inactiveSelectionBackground',
    'list.inactiveSelectionForeground',
    'list.hoverBackground',
    'list.hoverForeground',
    'list.focusBackground',
    'list.focusForeground',
    'list.highlightForeground',
    'input.background',
    'input.foreground',
    'input.border',
    'input.placeholderForeground',
    'inputOption.activeBorder',
    'dropdown.background',
    'dropdown.foreground',
    'dropdown.border',
    'dropdown.listBackground',
    'button.background',
    'button.foreground',
    'button.hoverBackground',
    'button.border',
    'button.separator',
    'button.secondaryBackground',
    'button.secondaryForeground',
    'button.secondaryHoverBackground',
    'badge.background',
    'badge.foreground',
    'activityBarBadge.background',
    'activityBarBadge.foreground',
    'extensionBadge.remoteBackground',
    'extensionBadge.remoteForeground',
    'menu.background',
    'menu.foreground',
    'menu.selectionBackground',
    'menu.selectionForeground',
    'menu.selectionBorder',
    'menu.border',
    'menubar.selectionBorder',
    'menubar.selectionBackground',
    'menubar.selectionForeground',
    'terminal.background',
    'terminal.foreground',
    'terminal.selectionBackground',
    'terminal.inactiveSelectionBackground',
    'terminal.border',
    'terminal.hoverHighlightBackground',
    'terminal.ansiBlack',
    'terminal.ansiRed',
    'terminal.ansiGreen',
    'terminal.ansiYellow',
    'terminal.ansiBlue',
    'terminal.ansiMagenta',
    'terminal.ansiCyan',
    'terminal.ansiWhite',
    'terminal.ansiBrightBlack',
    'terminal.ansiBrightRed',
    'terminal.ansiBrightGreen',
    'terminal.ansiBrightYellow',
    'terminal.ansiBrightBlue',
    'terminal.ansiBrightMagenta',
    'terminal.ansiBrightCyan',
    'terminal.ansiBrightWhite',
    'terminalCommandDecoration.defaultBackground',
    'terminalCommandDecoration.successBackground',
    'terminalCommandDecoration.errorBackground',
    'debugToolBar.background',
    'debugToolBar.border',
    'debugExceptionWidget.background',
    'debugExceptionWidget.border',
    'debugIcon.breakpointForeground',
    'debugIcon.breakpointDisabledForeground',
    'debugIcon.breakpointUnverifiedForeground',
    'debugIcon.breakpointCurrentStackframeForeground',
    'debugIcon.breakpointStackframeForeground',
    'editor.stackFrameHighlightBackground',
    'editor.focusedStackFrameHighlightBackground',
    'textLink.foreground',
    'textLink.activeForeground',
    'editorLink.activeForeground',
    'textBlockQuote.background',
    'textBlockQuote.border',
    'peekViewEditor.background',
    'peekViewResult.background',
    'peekViewTitle.background',
    'notifications.background',
    'notifications.foreground',
    'notifications.border',
    'editorHoverWidget.background',
    'editorHoverWidget.highlightForeground',
    'editorHoverWidget.foreground',
    'editorSuggestWidget.background',
    'editorSuggestWidget.border',
    'editorSuggestWidget.highlightForeground',
    'editorSuggestWidget.selectedBackground',
    'editorSuggestWidget.selectedForeground',
    'editorSuggestWidget.selectedIconForeground',
    'quickInput.background',
    'editorWidget.background',
    'icon.foreground',
    // Search & highlight tokens
    'quickInputTitle.background',
    'quickInputList.focusBackground',
    'quickInputList.focusForeground',
    'list.filterMatchBackground',
    'list.filterMatchBorder',
    'searchEditor.findMatchBackground',
    'searchEditor.findMatchBorder',
    'editor.findMatchBackground',
    'editor.findMatchBorder',
    'editor.findMatchHighlightBackground',
    'editor.findMatchForeground',
    'terminal.findMatchBackground',
    'terminal.findMatchBorder',
    'terminal.findMatchHighlightBackground',
    'editor.wordHighlightBackground',
    'editor.wordHighlightStrongBackground',
    'editor.hoverHighlightBackground',
    // Overview Ruler & Minimap
    'editorOverviewRuler.findMatchForeground',
    'editorOverviewRuler.rangeHighlightForeground',
    'editorOverviewRuler.selectionHighlightForeground',
    'editorOverviewRuler.wordHighlightForeground',
    'editorOverviewRuler.wordHighlightStrongForeground',
    'minimap.findMatchHighlight',
    'minimap.selectionHighlight',
    'terminalOverviewRuler.findMatchForeground',
    'diffEditor.insertedTextBackground',
    'diffEditor.removedTextBackground',
    'diffEditor.insertedLineBackground',
    'diffEditor.removedLineBackground',
    'diffEditor.diagonalFill',
    'merge.border',
    'merge.currentHeaderBackground',
    'merge.currentContentBackground',
    'merge.incomingHeaderBackground',
    'merge.incomingContentBackground',
    'merge.commonHeaderBackground',
    'merge.commonContentBackground',
  ]

  return validTokens
}

export function isValidToken(token: string): token is ValidTokens {
  return getValidTokensList().includes(token as ValidTokens)
}

// Type guard for valid surfaces
export function isValidSurface(surface: string): surface is ValidSurfaces {
  const validSurfaces: ValidSurfaces[] = [
    'base',
    'elevated',
    'overlay',
    'editor',
    'terminal',
    'panel',
    'menu',
    'list',
    'statusBar',
    'tabs',
    'quickInput',
    'sidebar',
    'activityBar',
    'breadcrumb',
    'notification',
    'hover',
    'active',
    'selection',
    'focus',
    'disabled',
    'input',
  ]

  return validSurfaces.includes(surface as ValidSurfaces)
}

// Validation functions
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate color mapping against known VS Code tokens
 */
export function validateColorMapping(
  mapping: Record<string, string>
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Explicit denylist for tokens that are not part of VS Code schema
  const forbiddenTokens = new Set<string>([
    'debugConsole.background',
    'breadcrumb.hoverForeground',
  ])

  // Check for unknown tokens
  for (const token of Object.keys(mapping)) {
    if (forbiddenTokens.has(token)) {
      errors.push(`Forbidden token (schema-invalid): ${token}`)
      continue
    }
    if (!isValidToken(token)) {
      warnings.push(`Unknown token: ${token}`)
    }
  }

  // Check for missing essential tokens
  const essentialTokens: ValidTokens[] = [
    'foreground',
    'editor.background',
    'editor.foreground',
    'sideBar.background',
    'activityBar.background',
    'statusBar.background',
  ]

  for (const token of essentialTokens) {
    if (!(token in mapping)) {
      errors.push(`Missing essential token: ${token}`)
    }
  }

  // Validate color format (basic hex check)
  for (const [token, color] of Object.entries(mapping)) {
    if (
      typeof color !== 'string' ||
      (!color.startsWith('#') && !color.startsWith('rgba'))
    ) {
      errors.push(`Invalid color format for ${token}: ${color}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Type-safe builder for color mappings
 */
export class ColorMappingBuilder {
  private mapping: Partial<ColorMapping> = {}

  set<T extends ValidTokens>(token: T, color: string): this {
    this.mapping[token] = color
    return this
  }

  build(): Partial<ColorMapping> {
    return { ...this.mapping }
  }

  validate(): ValidationResult {
    return validateColorMapping(this.mapping as Record<string, string>)
  }
}

/**
 * Create a validated color mapping
 */
export function createValidatedMapping(): ColorMappingBuilder {
  return new ColorMappingBuilder()
}

/**
 * Constraint types for theme consistency
 */
export interface ThemeConstraints {
  // Required tokens that must be present
  requiredTokens: ValidTokens[]

  // Color format validation
  allowedFormats: ('hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla')[]

  // Contrast requirements
  minContrast: number

  // Surface consistency rules
  surfaceRules: {
    surface: ValidSurfaces
    requiredTokens: ValidTokens[]
  }[]
}

export const defaultThemeConstraints: ThemeConstraints = {
  requiredTokens: [
    'foreground',
    'editor.background',
    'editor.foreground',
    'sideBar.background',
    'activityBar.background',
    'statusBar.background',
    'panel.background',
  ],
  allowedFormats: ['hex', 'rgba'],
  minContrast: 3.0,
  surfaceRules: [
    {
      surface: 'editor',
      requiredTokens: ['editor.background', 'editor.foreground'],
    },
    {
      surface: 'base',
      requiredTokens: ['sideBar.background', 'activityBar.background'],
    },
  ],
}

/**
 * Validate theme against constraints
 */
export function validateThemeConstraints(
  mapping: Record<string, string>,
  constraints: ThemeConstraints = defaultThemeConstraints
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check required tokens
  for (const token of constraints.requiredTokens) {
    if (!(token in mapping)) {
      errors.push(`Missing required token: ${token}`)
    }
  }

  // Check color formats
  for (const [token, color] of Object.entries(mapping)) {
    const isValidFormat = constraints.allowedFormats.some((format) => {
      switch (format) {
        case 'hex':
          return (
            /^#[0-9a-fA-F]{6}$/.test(color) || /^#[0-9a-fA-F]{8}$/.test(color)
          )
        case 'rgb':
          return /^rgb\(/.test(color)
        case 'rgba':
          return /^rgba\(/.test(color)
        case 'hsl':
          return /^hsl\(/.test(color)
        case 'hsla':
          return /^hsla\(/.test(color)
        default:
          return false
      }
    })

    if (!isValidFormat) {
      errors.push(
        `Invalid color format for ${token}: ${color} (allowed: ${constraints.allowedFormats.join(
          ', '
        )})`
      )
    }
  }

  // Check surface rules
  for (const rule of constraints.surfaceRules) {
    for (const token of rule.requiredTokens) {
      if (!(token in mapping)) {
        errors.push(`Missing token for surface ${rule.surface}: ${token}`)
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}
