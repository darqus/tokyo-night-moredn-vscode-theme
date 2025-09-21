/**
 * Генератор финальной темы VS Code
 */
import { interfacePalette } from '../core/interface'
import { basePalette } from '../core/palette'
import { generateTokenColors, generateSemanticTokens } from './tokens'
import type { VSCodeTheme } from '../types/theme'

// Тип для переменных окружения темы
interface ThemeEnvVars {
  THEME_NAME: string
  THEME_DISPLAY_NAME: string
  THEME_DESCRIPTION: string
  THEME_VERSION: string
  THEME_AUTHOR: string
  THEME_PUBLISHER: string
  THEME_LICENSE: string
  THEME_REPOSITORY_URL: string
  THEME_BUGS_URL: string
  THEME_CATEGORIES: string
  THEME_KEYWORDS: string
  THEME_FILENAME: string
  THEME_TYPE: 'dark' | 'light'
}

// Загрузка переменных окружения
export const loadEnvVars = (): ThemeEnvVars => {
  const env = process.env
  const themeType = env.THEME_TYPE || 'dark'

  return {
    THEME_NAME: env.THEME_NAME || 'tokyo-night-modern',
    THEME_DISPLAY_NAME: env.THEME_DISPLAY_NAME || 'Tokyo Night Modern',
    THEME_DESCRIPTION:
      env.THEME_DESCRIPTION ||
      'Beautiful modern dark theme for VS Code with carefully crafted colors and contemporary design',
    THEME_VERSION: env.THEME_VERSION || '1.14.33',
    THEME_AUTHOR: env.THEME_AUTHOR || 'lod',
    THEME_PUBLISHER: env.THEME_PUBLISHER || 'lod-inc',
    THEME_LICENSE: env.THEME_LICENSE || 'MIT',
    THEME_REPOSITORY_URL:
      env.THEME_REPOSITORY_URL ||
      'https://github.com/darqus/tokyo-night-modern-vscode-theme',
    THEME_BUGS_URL:
      env.THEME_BUGS_URL ||
      'https://github.com/darqus/tokyo-night-modern-vscode-theme/issues',
    THEME_CATEGORIES: env.THEME_CATEGORIES || 'Themes',
    THEME_KEYWORDS: env.THEME_KEYWORDS || 'theme,tokyo,night,dark',
    THEME_FILENAME: env.THEME_FILENAME || 'tokyo-night-modern-color-theme',
    THEME_TYPE: themeType === 'light' ? 'light' : 'dark',
  }
}

/**
 * Генерация всех цветов интерфейса VS Code
 */
const generateInterfaceColors = () => ({
  // Основные цвета
  foreground: interfacePalette.text.primary,
  descriptionForeground: interfacePalette.text.muted,
  disabledForeground: interfacePalette.text.inactive,
  focusBorder: interfacePalette.border.focus,
  errorForeground: interfacePalette.state.error,
  'selection.background': interfacePalette.bg.selection,
  'widget.shadow': interfacePalette.bg.overlay,

  // Title Bar (главное меню)
  'titleBar.activeBackground': interfacePalette.bg.base,
  'titleBar.activeForeground': interfacePalette.text.primary,
  'titleBar.inactiveBackground': interfacePalette.bg.base,
  'titleBar.inactiveForeground': interfacePalette.text.muted,
  'titleBar.border': interfacePalette.border.default,

  // Menu Bar
  'menubar.selectionForeground': interfacePalette.text.primary,
  'menubar.selectionBackground': interfacePalette.bg.hover,
  'menubar.selectionBorder': interfacePalette.border.focus,

  // Menu (контекстное меню)
  'menu.foreground': interfacePalette.text.primary,
  'menu.background': interfacePalette.bg.elevated,
  'menu.selectionForeground': interfacePalette.text.primary,
  'menu.selectionBackground': interfacePalette.bg.selection,
  'menu.selectionBorder': interfacePalette.border.focus,
  'menu.separatorBackground': interfacePalette.border.default,
  'menu.border': interfacePalette.border.default,

  // Command Center & Quick Input (командная панель)
  'commandCenter.foreground': interfacePalette.text.muted,
  'commandCenter.activeForeground': interfacePalette.text.primary,
  'commandCenter.background': interfacePalette.bg.base,
  'commandCenter.activeBackground': interfacePalette.bg.hover,
  'commandCenter.border': interfacePalette.border.default,
  'quickInput.background': interfacePalette.bg.elevated,
  'quickInput.foreground': interfacePalette.text.primary,
  'quickInputTitle.background': interfacePalette.bg.overlay,
  'quickInputList.focusBackground': interfacePalette.bg.selection,
  'quickInputList.focusForeground': interfacePalette.text.primary,

  // Редактор
  'editor.background': interfacePalette.bg.base,
  'editor.foreground': interfacePalette.text.primary,
  'editor.selectionBackground': interfacePalette.bg.selection,
  'editor.selectionForeground': interfacePalette.text.primary,
  'editor.inactiveSelectionBackground': interfacePalette.bg.hover,
  'editor.lineHighlightBackground': interfacePalette.bg.hover,
  // Search highlights: use warm yellow with adequate contrast
  'editor.findMatchBackground': interfacePalette.derived.findMatch.background,
  'editor.findMatchBorder': interfacePalette.derived.findMatch.border,
  'editor.findMatchHighlightBackground':
    interfacePalette.derived.findMatch.highlightBackground,
  'editor.findMatchForeground': interfacePalette.text.primary,
  // Foreground should remain opaque for readability
  'editor.findMatchHighlightForeground': interfacePalette.text.primary,
  'editor.wordHighlightBackground': interfacePalette.bg.hover,
  'editor.wordHighlightStrongBackground': interfacePalette.bg.selection,
  'editor.hoverHighlightBackground': interfacePalette.bg.hover,
  'editor.rangeHighlightBackground': interfacePalette.bg.hover,
  'editorBracketMatch.background': interfacePalette.bg.hover,
  'editorBracketMatch.border': interfacePalette.border.focus,
  'editorCursor.foreground': interfacePalette.text.primary,
  'editorWhitespace.foreground': interfacePalette.text.subtle,
  'editorIndentGuide.background1': interfacePalette.border.default,
  'editorIndentGuide.activeBackground1': interfacePalette.border.focus,
  'editorLineNumber.foreground': interfacePalette.text.lineNumber,
  'editorLineNumber.activeForeground': interfacePalette.text.lineNumberActive,
  'editorRuler.foreground': interfacePalette.border.default,

  // Editor Groups
  'editorGroup.border': interfacePalette.border.default,
  // Should be transparent to not obscure content
  'editorGroup.dropBackground':
    interfacePalette.derived.overlays.dropBackground,
  'editorGroupHeader.noTabsBackground': interfacePalette.bg.base,
  'editorGroupHeader.tabsBackground': interfacePalette.bg.base,
  'editorGroupHeader.tabsBorder': interfacePalette.border.default,

  // Activity Bar
  'activityBar.background': interfacePalette.bg.base,
  'activityBar.foreground': interfacePalette.text.muted,
  'activityBar.activeBorder': interfacePalette.state.info,
  'activityBar.activeBackground': interfacePalette.bg.hover,
  'activityBar.inactiveForeground': interfacePalette.text.inactive,
  'activityBar.border': interfacePalette.border.default,
  'activityBarBadge.background': interfacePalette.state.info,
  'activityBarBadge.foreground': interfacePalette.bg.base,

  // Side Bar
  'sideBar.background': interfacePalette.bg.base,
  'sideBar.foreground': interfacePalette.text.primary,
  'sideBar.border': interfacePalette.border.default,
  'sideBarTitle.foreground': interfacePalette.text.primary,
  'sideBarSectionHeader.background': interfacePalette.bg.elevated,
  'sideBarSectionHeader.foreground': interfacePalette.text.primary,
  'sideBarSectionHeader.border': interfacePalette.border.default,

  // Status Bar
  'statusBar.background': interfacePalette.bg.base,
  'statusBar.foreground': interfacePalette.text.muted,
  'statusBar.border': interfacePalette.border.default,
  'statusBar.noFolderBackground': interfacePalette.bg.base,
  'statusBar.debuggingBackground': interfacePalette.state.warning,
  'statusBar.debuggingForeground': interfacePalette.bg.base,
  'statusBarItem.activeBackground': interfacePalette.bg.hoverActive,
  'statusBarItem.hoverBackground': interfacePalette.bg.hoverMuted,
  'statusBarItem.hoverForeground': interfacePalette.text.primary,
  'statusBarItem.prominentBackground': interfacePalette.state.info,
  'statusBarItem.prominentForeground': interfacePalette.text.inverse,
  'statusBarItem.prominentHoverBackground': interfacePalette.state.infoHover,
  'statusBarItem.prominentHoverForeground': interfacePalette.text.inverse,
  'statusBarItem.errorBackground': interfacePalette.state.error,
  'statusBarItem.errorForeground': interfacePalette.text.inverse,
  'statusBarItem.errorHoverBackground': interfacePalette.state.errorHover,
  'statusBarItem.errorHoverForeground': interfacePalette.text.inverse,
  'statusBarItem.warningBackground': interfacePalette.state.warning,
  'statusBarItem.warningForeground': interfacePalette.text.inverse,
  'statusBarItem.warningHoverBackground': interfacePalette.state.warningHover,
  'statusBarItem.warningHoverForeground': interfacePalette.text.inverse,
  'statusBarItem.remoteBackground': interfacePalette.state.info,
  'statusBarItem.remoteForeground': interfacePalette.text.inverse,
  'statusBarItem.remoteHoverBackground': interfacePalette.state.infoHover,
  'statusBarItem.remoteHoverForeground': interfacePalette.text.inverse,
  'statusBarItem.compactHoverBackground': interfacePalette.bg.hoverSubtle,

  // Tabs
  'tab.activeBackground': interfacePalette.bg.elevated,
  'tab.activeForeground': interfacePalette.text.primary,
  // 'tab.activeBorder': удалено (transparent недопустим),
  'tab.activeBorderTop': interfacePalette.state.info,
  'tab.inactiveBackground': interfacePalette.bg.base,
  'tab.inactiveForeground': interfacePalette.text.muted,
  'tab.border': interfacePalette.border.default,
  'tab.hoverBackground': interfacePalette.bg.hover,
  'tab.hoverForeground': interfacePalette.text.primary,
  // 'tab.hoverBorder': удалено (transparent недопустим),
  'tab.unfocusedActiveBackground': interfacePalette.bg.elevated,
  'tab.unfocusedActiveForeground': interfacePalette.text.muted,
  'tab.unfocusedInactiveBackground': interfacePalette.bg.base,
  'tab.unfocusedInactiveForeground': interfacePalette.text.inactive,
  'tab.lastPinnedBorder': interfacePalette.border.default,

  // Lists
  'list.activeSelectionBackground': interfacePalette.bg.selection,
  'list.activeSelectionForeground': interfacePalette.text.primary,
  'list.inactiveSelectionBackground': interfacePalette.bg.hover,
  'list.inactiveSelectionForeground': interfacePalette.text.primary,
  'list.hoverBackground': interfacePalette.bg.hover,
  'list.hoverForeground': interfacePalette.text.primary,
  'list.focusBackground': interfacePalette.bg.selection,
  'list.focusForeground': interfacePalette.text.primary,
  // Should be transparent per VS Code theme color docs
  'list.dropBackground': interfacePalette.derived.overlays.dropBackground,
  // Filter matches in lists/trees should align with search highlight scheme
  'list.filterMatchBackground':
    interfacePalette.derived.findMatch.highlightBackground,
  'list.filterMatchBorder': interfacePalette.derived.findMatch.border,
  'list.highlightForeground': interfacePalette.state.info,
  'list.invalidItemForeground': interfacePalette.state.error,
  'list.errorForeground': interfacePalette.state.error,
  'list.warningForeground': interfacePalette.state.warning,

  // Tree
  'tree.indentGuidesStroke': interfacePalette.border.default,

  // Input
  'input.background': interfacePalette.bg.input,
  'input.foreground': interfacePalette.text.primary,
  'input.border': interfacePalette.border.default,
  'input.placeholderForeground': interfacePalette.text.subtle,
  'inputOption.activeBackground': interfacePalette.bg.selection,
  'inputOption.activeBorder': interfacePalette.border.focus,
  'inputValidation.errorBackground': interfacePalette.state.error,
  'inputValidation.errorForeground': interfacePalette.bg.base,
  'inputValidation.errorBorder': interfacePalette.state.error,
  'inputValidation.infoBackground': interfacePalette.state.info,
  'inputValidation.infoForeground': interfacePalette.bg.base,
  'inputValidation.infoBorder': interfacePalette.state.info,
  'inputValidation.warningBackground': interfacePalette.state.warning,
  'inputValidation.warningForeground': interfacePalette.bg.base,
  'inputValidation.warningBorder': interfacePalette.state.warning,

  // Button
  'button.background': interfacePalette.button.primary.background,
  'button.foreground': interfacePalette.button.primary.foreground,
  'button.hoverBackground': interfacePalette.button.primary.hoverBackground,
  // Use a cooler outline to improve secondary button appearance
  'button.border': interfacePalette.button.primary.border,
  'button.separator': interfacePalette.button.primary.separator,
  'button.secondaryBackground': interfacePalette.button.secondary.background,
  'button.secondaryForeground': interfacePalette.button.secondary.foreground,
  'button.secondaryHoverBackground':
    interfacePalette.button.secondary.hoverBackground,

  // Dropdown
  'dropdown.background': interfacePalette.dropdown.background,
  'dropdown.foreground': interfacePalette.dropdown.foreground,
  'dropdown.border': interfacePalette.dropdown.border,
  'dropdown.listBackground': interfacePalette.dropdown.listBackground,

  // Badge
  'badge.background': interfacePalette.state.info,
  'badge.foreground': interfacePalette.bg.base,

  // Progress Bar
  'progressBar.background': interfacePalette.state.info,

  // Panel
  'panel.background': interfacePalette.bg.base,
  'panel.border': interfacePalette.border.default,
  'panel.dropBorder': interfacePalette.state.info,
  'panelTitle.activeBorder': interfacePalette.state.info,
  'panelTitle.activeForeground': interfacePalette.text.primary,
  'panelTitle.inactiveForeground': interfacePalette.text.muted,
  'panelInput.border': interfacePalette.border.default,
  'panelSection.border': interfacePalette.border.default,
  // Should be transparent to let panel contents shine through
  'panelSection.dropBackground':
    interfacePalette.derived.overlays.dropBackground,
  'panelSectionHeader.background': interfacePalette.bg.elevated,
  'panelSectionHeader.foreground': interfacePalette.text.primary,
  'panelSectionHeader.border': interfacePalette.border.default,

  // Terminal
  'terminal.background': interfacePalette.bg.base,
  'terminal.foreground': interfacePalette.text.primary,
  'terminal.selectionBackground': interfacePalette.bg.selection,
  // Omit selectionForeground to let VS Code auto-contrast without schema warnings
  'terminal.inactiveSelectionBackground': interfacePalette.bg.hover,
  'terminal.border': interfacePalette.border.default,
  // Must be transparent or it will obscure terminal content
  'terminal.dropBackground': interfacePalette.derived.overlays.dropBackground,
  // Cyan-tinted hover with moderate alpha to avoid two-tone feel
  'terminal.hoverHighlightBackground':
    interfacePalette.derived.terminal.hoverHighlightBackground,
  'terminal.tab.activeBorder': interfacePalette.state.info,
  'terminalCursor.background': interfacePalette.bg.base,
  'terminalCursor.foreground': interfacePalette.text.primary,

  // Terminal search highlight
  'terminal.findMatchBackground': interfacePalette.derived.findMatch.background,
  'terminal.findMatchBorder': interfacePalette.derived.findMatch.border,
  'terminal.findMatchHighlightBackground':
    interfacePalette.derived.findMatch.highlightBackground,
  // Border for highlight is optional; keeping only background for clarity

  // Terminal command decorations (left markers for commands)
  'terminalCommandDecoration.defaultBackground': interfacePalette.bg.hoverMuted,
  'terminalCommandDecoration.successBackground': interfacePalette.state.success,
  'terminalCommandDecoration.errorBackground': interfacePalette.state.error,

  // Terminal overview ruler colors
  'terminalOverviewRuler.cursorForeground': interfacePalette.state.info,
  'terminalOverviewRuler.findMatchForeground': interfacePalette.state.warning,
  'terminalOverviewRuler.border': interfacePalette.border.default,

  // Terminal initial hint color (placeholder text)
  'terminal.initialHintForeground': interfacePalette.text.muted,

  // Terminal ANSI palette (makes links/paths readable)
  'terminal.ansiBlack': basePalette.black,
  'terminal.ansiRed': basePalette.red,
  'terminal.ansiGreen': basePalette.green,
  'terminal.ansiYellow': basePalette.yellow,
  // Align blue with link color to avoid two-tone URLs in terminals
  'terminal.ansiBlue': interfacePalette.derived.terminal.ansiBlue,
  'terminal.ansiMagenta': basePalette.magenta,
  // Unify cyan shades for single-color links in terminals
  'terminal.ansiCyan': interfacePalette.derived.terminal.ansiCyan,
  'terminal.ansiWhite': basePalette.white,
  'terminal.ansiBrightBlack': interfacePalette.derived.terminal.ansiBrightBlack,
  'terminal.ansiBrightRed': interfacePalette.derived.terminal.ansiBrightRed,
  'terminal.ansiBrightGreen': interfacePalette.derived.terminal.ansiBrightGreen,
  'terminal.ansiBrightYellow':
    interfacePalette.derived.terminal.ansiBrightYellow,
  'terminal.ansiBrightBlue': interfacePalette.derived.terminal.ansiBrightBlue,
  'terminal.ansiBrightMagenta':
    interfacePalette.derived.terminal.ansiBrightMagenta,
  'terminal.ansiBrightCyan': interfacePalette.derived.terminal.ansiBrightCyan,
  'terminal.ansiBrightWhite': interfacePalette.derived.terminal.ansiBrightWhite,

  // Generic text link colors (used across workbench incl. terminal links)
  // Use a brighter cyan and keep it consistent across states
  'textLink.foreground': interfacePalette.derived.link.foreground,
  'textLink.activeForeground': interfacePalette.derived.link.foreground,
  // Editor-only link color for consistency
  'editorLink.activeForeground': interfacePalette.derived.link.foreground,

  // Text / Markdown
  'textBlockQuote.background': interfacePalette.derived.blockquote.background,
  'textBlockQuote.border': interfacePalette.derived.blockquote.border,

  // Scrollbar
  'scrollbar.shadow': interfacePalette.bg.overlay,
  'scrollbarSlider.background': interfacePalette.bg.hover,
  'scrollbarSlider.hoverBackground': interfacePalette.bg.active,
  'scrollbarSlider.activeBackground': interfacePalette.bg.selection,

  // Notifications
  'notifications.background': interfacePalette.bg.elevated,
  'notifications.foreground': interfacePalette.text.primary,
  'notifications.border': interfacePalette.border.default,
  'notificationCenter.border': interfacePalette.border.default,
  'notificationCenterHeader.foreground': interfacePalette.text.primary,
  'notificationCenterHeader.background': interfacePalette.bg.elevated,
  'notificationToast.border': interfacePalette.border.default,
  'notificationsErrorIcon.foreground': interfacePalette.state.error,
  'notificationsWarningIcon.foreground': interfacePalette.state.warning,
  'notificationsInfoIcon.foreground': interfacePalette.state.info,

  // Extensions
  'extensionButton.prominentBackground': interfacePalette.state.info,
  'extensionButton.prominentForeground': interfacePalette.bg.base,
  'extensionButton.prominentHoverBackground': interfacePalette.state.info,
  'extensionBadge.remoteBackground': interfacePalette.state.info,
  'extensionBadge.remoteForeground': interfacePalette.bg.base,

  // Git
  'gitDecoration.addedResourceForeground': interfacePalette.state.success,
  'gitDecoration.modifiedResourceForeground': interfacePalette.state.info,
  'gitDecoration.deletedResourceForeground': interfacePalette.state.error,
  'gitDecoration.untrackedResourceForeground': interfacePalette.state.success,
  'gitDecoration.ignoredResourceForeground': interfacePalette.text.inactive,
  'gitDecoration.conflictingResourceForeground': interfacePalette.state.warning,
  'gitDecoration.renamedResourceForeground':
    interfacePalette.git.renamedResourceForeground,
  'gitDecoration.stageModifiedResourceForeground':
    interfacePalette.git.stageModifiedResourceForeground,
  'gitDecoration.stageDeletedResourceForeground':
    interfacePalette.git.stageDeletedResourceForeground,
  'gitDecoration.submoduleResourceForeground': interfacePalette.text.muted,

  // SCM Graph (Git History)
  'scmGraph.historyItemHoverLabelForeground':
    interfacePalette.scmGraph.label.hoverForeground,
  'scmGraph.historyItemHoverDefaultLabelForeground':
    interfacePalette.scmGraph.label.hoverForeground,
  'scmGraph.historyItemHoverDefaultLabelBackground':
    interfacePalette.scmGraph.label.hoverBackground,
  'scmGraph.foreground1': interfacePalette.scmGraph.foreground1,
  'scmGraph.foreground2': interfacePalette.scmGraph.foreground2,
  'scmGraph.foreground3': interfacePalette.scmGraph.foreground3,
  'scmGraph.foreground4': interfacePalette.scmGraph.foreground4,
  'scmGraph.foreground5': interfacePalette.scmGraph.foreground5,
  'scmGraph.historyItemHoverAdditionsForeground':
    interfacePalette.scmGraph.historyItemHoverAdditionsForeground,
  'scmGraph.historyItemHoverDeletionsForeground':
    interfacePalette.scmGraph.historyItemHoverDeletionsForeground,
  'scmGraph.historyItemRefColor': interfacePalette.scmGraph.historyItemRefColor,
  'scmGraph.historyItemRemoteRefColor':
    interfacePalette.scmGraph.historyItemRemoteRefColor,
  'scmGraph.historyItemBaseRefColor':
    interfacePalette.scmGraph.historyItemBaseRefColor,

  // Diff Editor
  'diffEditor.insertedTextBackground':
    interfacePalette.diff.insertedTextBackground,
  'diffEditor.removedTextBackground':
    interfacePalette.diff.removedTextBackground,
  'diffEditor.insertedLineBackground':
    interfacePalette.diff.insertedLineBackground,
  'diffEditor.removedLineBackground':
    interfacePalette.diff.removedLineBackground,
  'diffEditor.diagonalFill': interfacePalette.bg.overlay,

  // Settings
  'settings.headerForeground': interfacePalette.text.primary,
  'settings.modifiedItemIndicator': interfacePalette.state.info,
  'settings.dropdownBackground': interfacePalette.dropdown.background,
  'settings.dropdownForeground': interfacePalette.dropdown.foreground,
  'settings.dropdownBorder': interfacePalette.dropdown.border,
  'settings.checkboxBackground': interfacePalette.bg.elevated,
  'settings.checkboxForeground': interfacePalette.text.primary,
  'settings.checkboxBorder': interfacePalette.border.default,
  'settings.textInputBackground': interfacePalette.bg.input,
  'settings.textInputForeground': interfacePalette.text.primary,
  'settings.textInputBorder': interfacePalette.border.default,
  'settings.numberInputBackground': interfacePalette.bg.input,
  'settings.numberInputForeground': interfacePalette.text.primary,
  'settings.numberInputBorder': interfacePalette.border.default,

  // Breadcrumbs
  'breadcrumb.foreground': interfacePalette.text.muted,
  'breadcrumb.background': interfacePalette.bg.base,
  'breadcrumb.focusForeground': interfacePalette.text.primary,
  'breadcrumb.activeSelectionForeground': interfacePalette.text.primary,
  'breadcrumbPicker.background': interfacePalette.bg.elevated,

  // Widgets
  'widget.border': interfacePalette.border.default,
  // 'widget.foreground': удалено (запрещенное свойство),

  // Peek View Widget
  'peekView.border': interfacePalette.border.focus,
  'peekViewEditor.background': interfacePalette.bg.elevated,
  'peekViewEditor.matchHighlightBackground': interfacePalette.bg.selection,
  'peekViewResult.background': interfacePalette.bg.base,
  'peekViewResult.fileForeground': interfacePalette.text.primary,
  'peekViewResult.lineForeground': interfacePalette.text.muted,
  'peekViewResult.matchHighlightBackground': interfacePalette.bg.selection,
  'peekViewResult.selectionBackground': interfacePalette.bg.selection,
  'peekViewResult.selectionForeground': interfacePalette.text.primary,
  'peekViewTitle.background': interfacePalette.bg.overlay,
  'peekViewTitleDescription.foreground': interfacePalette.text.muted,
  'peekViewTitleLabel.foreground': interfacePalette.text.primary,

  // Editor Widget
  'editorWidget.background': interfacePalette.bg.elevated,
  'editorWidget.foreground': interfacePalette.text.primary,
  'editorWidget.border': interfacePalette.border.default,
  'editorWidget.resizeBorder': interfacePalette.border.focus,

  // Editor Suggest Widget
  'editorSuggestWidget.background': interfacePalette.bg.overlay,
  'editorSuggestWidget.border': interfacePalette.border.default,
  'editorSuggestWidget.foreground': interfacePalette.text.primary,
  'editorSuggestWidget.highlightForeground': interfacePalette.state.info,
  'editorSuggestWidget.selectedBackground': interfacePalette.bg.selection,
  'editorSuggestWidget.selectedForeground': interfacePalette.text.primary,
  'editorSuggestWidget.selectedIconForeground': interfacePalette.text.primary,
  'editorSuggestWidgetStatus.foreground': interfacePalette.text.muted,

  // Editor Hover Widget
  'editorHoverWidget.background': interfacePalette.bg.overlay,
  'editorHoverWidget.border': interfacePalette.border.default,
  'editorHoverWidget.foreground': interfacePalette.text.primary,
  'editorHoverWidget.highlightForeground': interfacePalette.state.info,
  'editorHoverWidget.statusBarBackground': interfacePalette.bg.overlay,

  // Debug Exception Widget
  'debugExceptionWidget.background': interfacePalette.state.error,
  'debugExceptionWidget.border': interfacePalette.state.error,

  // Editor Marker Navigation
  'editorMarkerNavigation.background': interfacePalette.bg.elevated,
  'editorMarkerNavigationError.background': interfacePalette.state.error,
  'editorMarkerNavigationWarning.background': interfacePalette.state.warning,
  'editorMarkerNavigationInfo.background': interfacePalette.state.info,

  // Merge Conflicts (удалены устаревшие свойства)
  'merge.border': interfacePalette.border.default,

  // Editor Overview Ruler
  'editorOverviewRuler.border': interfacePalette.border.default,
  'editorOverviewRuler.findMatchForeground': interfacePalette.state.warning,
  'editorOverviewRuler.rangeHighlightForeground': interfacePalette.state.info,
  'editorOverviewRuler.selectionHighlightForeground':
    interfacePalette.bg.selection,
  'editorOverviewRuler.wordHighlightForeground': interfacePalette.bg.hover,
  'editorOverviewRuler.wordHighlightStrongForeground':
    interfacePalette.bg.selection,
  'editorOverviewRuler.modifiedForeground': interfacePalette.state.info,
  'editorOverviewRuler.addedForeground': interfacePalette.state.success,
  'editorOverviewRuler.deletedForeground': interfacePalette.state.error,
  'editorOverviewRuler.errorForeground': interfacePalette.state.error,
  'editorOverviewRuler.warningForeground': interfacePalette.state.warning,
  'editorOverviewRuler.infoForeground': interfacePalette.state.info,
  'editorOverviewRuler.bracketMatchForeground': interfacePalette.border.focus,

  // Minimap
  'minimap.findMatchHighlight': interfacePalette.minimap.findMatchHighlight,
  'minimap.selectionHighlight': interfacePalette.bg.selection,
  'minimap.errorHighlight': interfacePalette.state.error,
  'minimap.warningHighlight': interfacePalette.state.warning,
  'minimap.background': interfacePalette.bg.base,
  'minimap.selectionOccurrenceHighlight': interfacePalette.bg.hover,
  'minimapSlider.background': interfacePalette.bg.hover,
  'minimapSlider.hoverBackground': interfacePalette.bg.active,
  'minimapSlider.activeBackground': interfacePalette.bg.selection,
  'minimapGutter.addedBackground': interfacePalette.state.success,
  'minimapGutter.modifiedBackground': interfacePalette.state.info,
  'minimapGutter.deletedBackground': interfacePalette.state.error,

  // Search Editor - use the same warm yellow scheme for matches
  'searchEditor.findMatchBackground':
    interfacePalette.derived.findMatch.highlightBackground,
  'searchEditor.findMatchBorder': interfacePalette.derived.findMatch.border,

  // Problem Matcher
  'problemsErrorIcon.foreground': interfacePalette.state.error,
  'problemsWarningIcon.foreground': interfacePalette.state.warning,
  'problemsInfoIcon.foreground': interfacePalette.state.info,

  // Charts (для расширений)
  'charts.foreground': interfacePalette.text.primary,
  'charts.lines': interfacePalette.border.default,
  'charts.red': interfacePalette.state.error,
  'charts.blue': basePalette.blue,
  'charts.yellow': interfacePalette.state.warning,
  'charts.orange': basePalette.orange,
  'charts.green': interfacePalette.state.success,
  'charts.purple': basePalette.purple,

  // Ports
  'ports.iconRunningProcessForeground': interfacePalette.state.success,

  // Checkbox
  'checkbox.background': interfacePalette.bg.elevated,
  'checkbox.foreground': interfacePalette.text.primary,
  'checkbox.border': interfacePalette.border.default,

  // Toolbar
  'toolbar.hoverBackground': interfacePalette.bg.hover,
  'toolbar.hoverOutline': interfacePalette.border.focus,
  'toolbar.activeBackground': interfacePalette.bg.selection,

  // Inline Chat (toolbar where Keep/Undo live)
  'inlineChat.background': interfacePalette.derived.inlineChat.background,
  // Brighten inline chat text for better contrast (affects inactive toolbar buttons)
  'inlineChat.foreground': interfacePalette.derived.inlineChat.foreground,
  'inlineChat.border': interfacePalette.border.default,

  // Icon
  'icon.foreground': interfacePalette.text.muted,

  // Keybinding
  'keybindingLabel.background': interfacePalette.bg.elevated,
  'keybindingLabel.foreground': interfacePalette.text.primary,
  'keybindingLabel.border': interfacePalette.border.default,
  'keybindingLabel.bottomBorder': interfacePalette.border.default,

  // Welcome Page
  'welcomePage.background': interfacePalette.bg.base,
  'welcomePage.progress.background': interfacePalette.bg.elevated,
  'welcomePage.progress.foreground': interfacePalette.state.info,
  'welcomePage.tileBackground': interfacePalette.bg.elevated,
  'welcomePage.tileHoverBackground': interfacePalette.bg.hover,
  'welcomePage.tileBorder': interfacePalette.border.default,

  // Walkthrough
  'walkThrough.embeddedEditorBackground': interfacePalette.bg.elevated,

  // Debug
  'debugToolBar.background': interfacePalette.bg.elevated,
  'debugToolBar.border': interfacePalette.border.default,
  'debugIcon.breakpointForeground': interfacePalette.state.error,
  'debugIcon.breakpointDisabledForeground': interfacePalette.text.inactive,
  'debugIcon.breakpointUnverifiedForeground': interfacePalette.text.muted,
  'debugIcon.breakpointCurrentStackframeForeground':
    interfacePalette.state.warning,
  'debugIcon.breakpointStackframeForeground': interfacePalette.state.info,
  'debugIcon.startForeground': interfacePalette.state.success,
  'debugIcon.pauseForeground': interfacePalette.state.info,
  'debugIcon.stopForeground': interfacePalette.state.error,
  'debugIcon.disconnectForeground': interfacePalette.state.error,
  'debugIcon.restartForeground': interfacePalette.state.success,
  'debugIcon.stepOverForeground': interfacePalette.state.info,
  'debugIcon.stepIntoForeground': interfacePalette.state.info,
  'debugIcon.stepOutForeground': interfacePalette.state.info,
  'debugIcon.continueForeground': interfacePalette.state.success,
  'debugIcon.stepBackForeground': interfacePalette.state.info,
  'debugConsole.infoForeground': interfacePalette.state.info,
  'debugConsole.warningForeground': interfacePalette.state.warning,
  'debugConsole.errorForeground': interfacePalette.state.error,
  'debugConsole.sourceForeground': interfacePalette.text.primary,
  'debugConsoleInputIcon.foreground': interfacePalette.text.primary,

  // Testing
  'testing.iconFailed': interfacePalette.state.error,
  'testing.iconErrored': interfacePalette.state.error,
  'testing.iconPassed': interfacePalette.state.success,
  'testing.runAction': interfacePalette.state.success,
  'testing.iconQueued': interfacePalette.state.warning,
  'testing.iconUnset': interfacePalette.text.muted,
  'testing.iconSkipped': interfacePalette.text.inactive,
  'testing.peekBorder': interfacePalette.border.focus,
  'testing.peekHeaderBackground': interfacePalette.bg.overlay,
  // Удалены запрещенные testing.message.* свойства
})

/**
 * Генерация финальной темы
 */
export const generateTheme = (): VSCodeTheme => {
  const env = loadEnvVars()

  return {
    name: env.THEME_DISPLAY_NAME,
    type: env.THEME_TYPE,
    colors: generateInterfaceColors(),
    tokenColors: generateTokenColors(),
    semanticTokenColors: generateSemanticTokens(),
  }
}
