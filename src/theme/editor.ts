import { palette } from '../palette'
import {
  editorBracketPairGuideActiveBackground1,
  editorBracketPairGuideActiveBackground2,
  editorBracketPairGuideActiveBackground3,
  editorBracketPairGuideActiveBackground4,
  editorBracketPairGuideActiveBackground5,
  editorBracketPairGuideActiveBackground6,
  editorFoldBackground,
  editorSelectionBackground,
  editorInactiveSelectionBackground,
  editorFindMatchBackground,
  editorFindMatchHighlightBackground,
  editorFindMatchHighlightBorder,
  editorFindRangeHighlightBackground,
  editorFindRangeHighlightBorder,
  editorRangeHighlightBackground,
  editorWordHighlightBackground,
  editorWordHighlightBorder,
  editorWordHighlightStrongBackground,
  editorWordHighlightStrongBorder,
  editorSelectionHighlightBackground,
  editorSelectionHighlightBorder,
  editorHoverHighlightBackground,
  editorIndentGuideBackground1,
  editorIndentGuideActiveBackground1,
  editorWhitespaceForeground,
  editorBracketMatchBorder,
  editorInlayHintBackground,
  editorInlayHintTypeBackground,
  editorInlayHintParameterBackground,
  editorOverviewRulerFindMatchForeground,
  editorOverviewRulerRangeHighlightForeground,
  editorOverviewRulerSelectionHighlightForeground,
  editorOverviewRulerWordHighlightForeground,
  editorOverviewRulerWordHighlightStrongForeground,
  editorWidgetResizeBorder,
  editorSuggestWidgetBorder,
  searchEditorFindMatchBackground,
} from '../palette'

export const getEditorColors = () => ({
  // === ПОДСВЕТКА СКОБОК И НАПРАВЛЯЮЩИЕ ===
  // Оптимизированная различимость цветов для вложенных скобок
  /** Цвет для первой пары скобок */
  'editorBracketHighlight.foreground1': palette.accent.blue, // синий
  /** Цвет для второй пары скобок */
  'editorBracketHighlight.foreground2': palette.accent.orange, // оранжевый (вместо cyan)
  /** Цвет для третьей пары скобок */
  'editorBracketHighlight.foreground3': palette.token.string, // зеленый (вместо magenta)
  /** Цвет для четвертой пары скобок */
  'editorBracketHighlight.foreground4': palette.accent.yellow, // желтый
  /** Цвет для пятой пары скобок */
  'editorBracketHighlight.foreground5': palette.accent.red, // красный
  /** Цвет для шестой пары скобок */
  'editorBracketHighlight.foreground6': palette.accent.blue, // холоднее, вместо магенты
  /** Цвет для неожиданных/несоответствующих скобок */
  'editorBracketHighlight.unexpectedBracket.foreground': palette.accent.red,
  /** Цвет фона для активной направляющей первой пары скобок */
  'editorBracketPairGuide.activeBackground1':
    editorBracketPairGuideActiveBackground1,
  /** Цвет фона для активной направляющей второй пары скобок */
  'editorBracketPairGuide.activeBackground2':
    editorBracketPairGuideActiveBackground2,
  /** Цвет фона для активной направляющей третьей пары скобок */
  'editorBracketPairGuide.activeBackground3':
    editorBracketPairGuideActiveBackground3,
  /** Цвет фона для активной направляющей четвертой пары скобок */
  'editorBracketPairGuide.activeBackground4':
    editorBracketPairGuideActiveBackground4,
  /** Цвет фона для активной направляющей пятой пары скобок */
  'editorBracketPairGuide.activeBackground5':
    editorBracketPairGuideActiveBackground5,
  /** Цвет фона для активной направляющей шестой пары скобок */
  'editorBracketPairGuide.activeBackground6':
    editorBracketPairGuideActiveBackground6,

  // === ОСНОВНЫЕ ЦВЕТА РЕДАКТОРА ===
  /** Цвет фона для общего выделения (не в редакторе) */
  'selection.background': palette.bg.selection.active,
  /** Основной цвет фона редактора */
  'editor.background': palette.bg.base,
  /** Основной цвет текста в редакторе */
  'editor.foreground': palette.fg.primary,
  /** Цвет текста-заполнителя в редакторе */
  'editor.placeholder.foreground': palette.ui.input.placeholder,
  /** Цвет фона для свернутых (collapsed) областей кода */
  'editor.foldBackground': editorFoldBackground,
  /** Цвет активных ссылок в редакторе (Ctrl+Click) */
  'editorLink.activeForeground': palette.ui.badge.base,
  // === ВЫДЕЛЕНИЕ ТЕКСТА И ПОИСК ===
  /** Цвет фона для выделенного текста (основное выделение) */
  'editor.selectionBackground': editorSelectionBackground,
  /** Цвет текста для выделенного текста */
  'editor.selectionForeground': palette.fg.selectionText,
  /** Цвет фона для неактивного выделения */
  'editor.inactiveSelectionBackground': editorInactiveSelectionBackground,

  // === ПОИСК И СОВПАДЕНИЯ ===
  /** Цвет фона для текущего найденного совпадения (активное) */
  'editor.findMatchBackground': editorFindMatchBackground,
  /** Цвет рамки для текущего найденного совпадения */
  'editor.findMatchBorder': palette.accent.red,
  /** Цвет фона для других найденных совпадений (неактивные) */
  'editor.findMatchHighlightBackground': editorFindMatchHighlightBackground,
  /** Цвет рамки для других найденных совпадений */
  'editor.findMatchHighlightBorder': editorFindMatchHighlightBorder,
  /** Цвет фона для выделения диапазона поиска */
  'editor.findRangeHighlightBackground': editorFindRangeHighlightBackground,
  /** Цвет рамки для выделения диапазона поиска */
  'editor.findRangeHighlightBorder': editorFindRangeHighlightBorder,
  /** Цвет фона для общего выделения диапазона */
  'editor.rangeHighlightBackground': editorRangeHighlightBackground,

  // === ВЫДЕЛЕНИЕ СЛОВ И СИМВОЛОВ ===
  /** Цвет фона для выделения слова под курсором (read access) */
  'editor.wordHighlightBackground': editorWordHighlightBackground,
  /** Цвет рамки для выделения слова под курсором */
  'editor.wordHighlightBorder': editorWordHighlightBorder,
  /** Цвет фона для "сильного" выделения слова (write access) */
  'editor.wordHighlightStrongBackground': editorWordHighlightStrongBackground,
  /** Цвет рамки для "сильного" выделения слова */
  'editor.wordHighlightStrongBorder': editorWordHighlightStrongBorder,
  /** Цвет фона для выделения похожих символов при выделении */
  'editor.selectionHighlightBackground': editorSelectionHighlightBackground,
  /** Цвет рамки для выделения похожих символов */
  'editor.selectionHighlightBorder': editorSelectionHighlightBorder,
  /** Цвет фона при наведении курсора на элемент */
  'editor.hoverHighlightBackground': editorHoverHighlightBackground,

  // === КУРСОР, СТРОКИ И ОТСТУПЫ ===
  /** Цвет курсора в редакторе */
  'editorCursor.foreground': palette.fg.primary,
  /** Цвет вертикальных направляющих отступов */
  'editorIndentGuide.background1': editorIndentGuideBackground1,
  /** Цвет активной направляющей отступа (текущий уровень) */
  'editorIndentGuide.activeBackground1': editorIndentGuideActiveBackground1,
  /** Цвет номеров строк */
  'editorLineNumber.foreground': palette.fg.subtle,
  /** Цвет номера активной строки */
  'editorLineNumber.activeForeground': palette.fg.primary,
  /** Цвет фона подсветки текущей строки */
  'editor.lineHighlightBackground': palette.bg.lineHighlight,
  /** Цвет отображения пробелов, табов и переносов строк */
  'editorWhitespace.foreground': editorWhitespaceForeground,

  // === STICKY SCROLL (ЗАКРЕПЛЕННЫЕ ЗАГОЛОВКИ) ===
  /** Цвет фона для закрепленных заголовков функций/классов */
  'editorStickyScroll.background': palette.bg.elevated,
  /** Цвет фона закрепленных заголовков при наведении */
  'editorStickyScrollHover.background': palette.bg.hover,
  /** Цвет границы закрепленных заголовков */
  'editorStickyScroll.border': palette.line.border,

  // === ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ И ВИДЖЕТЫ ===
  /** Цвет фона виджета навигации по ошибкам/предупреждениям */
  'editorMarkerNavigation.background': palette.bg.elevated,
  /** Цвет фона всплывающих подсказок при наведении */
  'editorHoverWidget.background': palette.bg.elevated,
  /** Цвет границы всплывающих подсказок */
  'editorHoverWidget.border': palette.line.border,
  /** Цвет текста во всплывающих подсказках */
  'editorHoverWidget.foreground': palette.fg.primary,

  // === ПОДСВЕТКА ПАРНЫХ СКОБОК ===
  /** Цвет фона для выделения парной скобки */
  'editorBracketMatch.background': palette.bg.bracketMatch,
  /** Цвет рамки вокруг парной скобки */
  'editorBracketMatch.border': editorBracketMatchBorder,

  // === INLAY HINTS (ВСТРОЕННЫЕ ПОДСКАЗКИ ТИПОВ) ===
  /** Цвет фона для встроенных подсказок (общие) */
  'editorInlayHint.background': editorInlayHintBackground,
  /** Цвет текста встроенных подсказок (общие) */
  'editorInlayHint.foreground': palette.fg.muted,
  /** Цвет фона для подсказок типов переменных */
  'editorInlayHint.typeBackground': editorInlayHintTypeBackground,
  /** Цвет текста подсказок типов переменных */
  'editorInlayHint.typeForeground': palette.fg.muted,
  /** Цвет фона для подсказок имен параметров */
  'editorInlayHint.parameterBackground': editorInlayHintParameterBackground,
  /** Цвет текста подсказок имен параметров */
  'editorInlayHint.parameterForeground': palette.fg.muted,

  // === OVERVIEW RULER (МИНИАТЮРА СПРАВА) ===
  /** Цвет границы миниатюры справа от редактора */
  'editorOverviewRuler.border': palette.line.border,
  /** Цвет индикаторов ошибок в миниатюре */
  'editorOverviewRuler.errorForeground': palette.ui.editorOverview.error,
  /** Цвет индикаторов предупреждений в миниатюре */
  'editorOverviewRuler.warningForeground': palette.accent.yellow,
  /** Цвет индикаторов информации в миниатюре */
  'editorOverviewRuler.infoForeground': palette.ui.editorOverview.info,
  /** Цвет индикаторов парных скобок в миниатюре */
  'editorOverviewRuler.bracketMatchForeground': palette.bg.overlay,
  /** Цвет индикаторов найденных совпадений в миниатюре */
  'editorOverviewRuler.findMatchForeground':
    editorOverviewRulerFindMatchForeground,
  /** Цвет индикаторов выделенного диапазона в миниатюре */
  'editorOverviewRuler.rangeHighlightForeground':
    editorOverviewRulerRangeHighlightForeground,
  /** Цвет индикаторов похожих символов в миниатюре */
  'editorOverviewRuler.selectionHighlightForeground':
    editorOverviewRulerSelectionHighlightForeground,
  /** Цвет индикаторов выделенных слов (read) в миниатюре */
  'editorOverviewRuler.wordHighlightForeground':
    editorOverviewRulerWordHighlightForeground,
  /** Цвет индикаторов выделенных слов (write) в миниатюре */
  'editorOverviewRuler.wordHighlightStrongForeground':
    editorOverviewRulerWordHighlightStrongForeground,
  /** Цвет индикаторов измененных строк в миниатюре */
  'editorOverviewRuler.modifiedForeground': palette.ui.editorOverview.modified,
  /** Цвет индикаторов добавленных строк в миниатюре */
  'editorOverviewRuler.addedForeground': palette.ui.editorOverview.added,
  /** Цвет индикаторов удаленных строк в миниатюре */
  'editorOverviewRuler.deletedForeground': palette.ui.editorOverview.deleted,

  // === ЛИНЕЙКИ И ДИАГНОСТИКА ===
  /** Цвет вертикальных линеек (rulers) в редакторе */
  'editorRuler.foreground': palette.line.border,
  /** Цвет подчеркивания ошибок в коде */
  'editorError.foreground': palette.ui.editorOverview.error,
  /** Цвет подчеркивания предупреждений в коде */
  'editorWarning.foreground': palette.accent.yellow,
  /** Цвет подчеркивания информационных сообщений */
  'editorInfo.foreground': palette.ui.debug.info,
  /** Цвет подчеркивания подсказок (hints) */
  'editorHint.foreground': palette.ui.debug.info,

  // === GUTTER (ОБЛАСТЬ СЛЕВА) И MINIMAP ===
  /** Цвет индикатора измененных строк в gutter */
  'editorGutter.modifiedBackground': palette.ui.gutter.modified,
  /** Цвет индикатора добавленных строк в gutter */
  'editorGutter.addedBackground': palette.ui.gutter.added,
  /** Цвет индикатора удаленных строк в gutter */
  'editorGutter.deletedBackground': palette.ui.gutter.deleted,
  /** Цвет индикатора измененных строк в minimap */
  'minimapGutter.modifiedBackground': palette.ui.minimapGutter.modified,
  /** Цвет индикатора добавленных строк в minimap */
  'minimapGutter.addedBackground': palette.ui.minimapGutter.added,
  /** Цвет индикатора удаленных строк в minimap */
  'minimapGutter.deletedBackground': palette.ui.minimapGutter.deleted,

  // === ГРУППЫ РЕДАКТОРОВ И ВКЛАДКИ ===
  /** Цвет границы между группами редакторов */
  'editorGroup.border': palette.line.border,
  /** Цвет фона при перетаскивании файлов в группу */
  'editorGroup.dropBackground': palette.bg.lineHighlight,
  /** Цвет границы области вкладок */
  'editorGroupHeader.tabsBorder': palette.line.border,
  /** Цвет фона области вкладок */
  'editorGroupHeader.tabsBackground': palette.bg.tabs,
  /** Цвет фона заголовка группы без вкладок */
  'editorGroupHeader.noTabsBackground': palette.bg.tabs,
  /** Цвет границы заголовка группы редакторов */
  'editorGroupHeader.border': palette.line.border,
  /** Цвет фона панели редактора */
  'editorPane.background': palette.bg.base,

  // === ВИДЖЕТЫ РЕДАКТОРА (ПОИСК, АВТОДОПОЛНЕНИЕ) ===
  /** Цвет фона виджетов редактора (поиск, замена) */
  'editorWidget.background': palette.bg.elevated,
  /** Цвет границы виджетов редактора */
  'editorWidget.border': palette.line.border,
  /** Цвет текста в виджетах редактора */
  'editorWidget.foreground': palette.fg.primary,
  /** Цвет границы изменения размера виджета */
  'editorWidget.resizeBorder': editorWidgetResizeBorder,
  /** Цвет фона списка автодополнения */
  'editorSuggestWidget.background': palette.bg.elevated,
  /** Цвет границы списка автодополнения */
  'editorSuggestWidget.border': editorSuggestWidgetBorder,
  /** Цвет текста в списке автодополнения */
  'editorSuggestWidget.foreground': palette.fg.primary,
  /** Цвет фона выбранного элемента автодополнения */
  'editorSuggestWidget.selectedBackground': palette.bg.selection.menu,
  /** Цвет текста выбранного элемента автодополнения */
  'editorSuggestWidget.selectedForeground': palette.fg.onSelection,
  /** Цвет подсветки совпадений в автодополнении */
  'editorSuggestWidget.highlightForeground': palette.ui.settingsHeader,
  /** Цвет текста CodeLens (подсказки над функциями) */
  'editorCodeLens.foreground': palette.ui.codeLens,
  /** Цвет иконки лампочки (быстрые действия) */
  'editorLightBulb.foreground': palette.accent.yellow,
  /** Цвет иконки лампочки (автоисправления) */
  'editorLightBulbAutoFix.foreground': palette.accent.yellow,

  // === РЕДАКТОР ПОИСКА (SEARCH EDITOR) ===
  /** Цвет фона найденных совпадений в редакторе поиска */
  'searchEditor.findMatchBackground': searchEditorFindMatchBackground,
  /** Цвет границы найденных совпадений в редакторе поиска */
  'searchEditor.findMatchBorder': palette.accent.cyan,
  /** Цвет границы поля ввода в редакторе поиска */
  'searchEditor.textInputBorder': palette.line.border,
})
