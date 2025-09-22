/**
 * Упрощенная версия interfaceMapping.ts с использованием tokenDSL
 * Демонстрирует преимущества декларативного подхода
 */

import {
  createTokenMapping,
  surface,
  palette,
  computed,
  type ThemeTokenConfig,
} from './tokenDSL'
import type { InterfacePalette } from '../types/theme'
import type { ValidTokens } from '../types/validation'
import { lighten, withAlpha } from '../core/utils'

/**
 * Полная конфигурация токенов VS Code в декларативном стиле
 */
export const tokenConfig: ThemeTokenConfig = {
  groups: [
    {
      name: 'Command Center',
      description: 'Верхняя командная панель (рядом с заголовком)',
      tokens: [
        {
          token: 'commandCenter.background',
          source: surface.background('elevated'),
          description: 'Фон командной панели',
        },
        {
          token: 'commandCenter.activeBackground',
          source: surface.background('hover'),
          description: 'Фон активного/наведённого состояния командной панели',
        },
        {
          token: 'commandCenter.border',
          source: surface.border('elevated'),
          description: 'Граница командной панели',
        },
      ],
    },
    {
      name: 'Diff Editor',
      description: 'Подсветка изменений (сравнение файлов)',
      tokens: [
        {
          token: 'diffEditor.insertedTextBackground',
          source: computed((ip) => ip.diff.insertedTextBackground),
          description: 'Фон для добавленного текста (приглушённый)',
        },
        {
          token: 'diffEditor.removedTextBackground',
          source: computed((ip) => ip.diff.removedTextBackground),
          description: 'Фон для удалённого текста (приглушённый)',
        },
        {
          token: 'diffEditor.insertedLineBackground',
          source: computed((ip) => ip.diff.insertedLineBackground),
          description: 'Фон строки с добавлением (очень мягкий)',
        },
        {
          token: 'diffEditor.removedLineBackground',
          source: computed((ip) => ip.diff.removedLineBackground),
          description: 'Фон строки с удалением (очень мягкий)',
        },
        {
          token: 'diffEditor.diagonalFill',
          source: surface.background('overlay'),
          description: 'Диагональная заливка для скрытых областей',
        },
      ],
    },
    {
      name: 'Merge Editor',
      description: 'Цвета для режима слияния (merge editor)',
      tokens: [
        // VS Code merge.* tokens — используем мягкие подложки,
        // чтобы текст, включая комментарии, оставался читаемым.
        {
          token: 'merge.border',
          source: surface.border('base'),
          description: 'Границы областей слияния',
        },
        {
          token: 'merge.currentHeaderBackground',
          source: computed((ip) => withAlpha(ip.state.success, 0.12)),
          description: 'Фон заголовка текущих изменений (приглушённый зелёный)',
        },
        {
          token: 'merge.currentContentBackground',
          source: computed((ip) => withAlpha(ip.state.success, 0.06)),
          description: 'Фон контента текущих изменений (очень мягкий зелёный)',
        },
        {
          token: 'merge.incomingHeaderBackground',
          source: computed((ip) => withAlpha(ip.state.info, 0.12)),
          description:
            'Фон заголовка входящих изменений (приглушённый сине-циан)',
        },
        {
          token: 'merge.incomingContentBackground',
          source: computed((ip) => withAlpha(ip.state.info, 0.06)),
          description:
            'Фон контента входящих изменений (очень мягкий сине-циан)',
        },
        {
          token: 'merge.commonHeaderBackground',
          source: computed((ip) => withAlpha(ip.state.warning, 0.1)),
          description: 'Фон заголовка общей базы (слегка тёплый, приглушённый)',
        },
        {
          token: 'merge.commonContentBackground',
          source: computed((ip) => withAlpha(ip.state.warning, 0.05)),
          description: 'Фон контента общей базы (очень мягкий)',
        },
      ],
    },
    {
      name: 'Base Colors',
      description: 'Основные цвета для всей темы',
      tokens: [
        {
          token: 'foreground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Основной цвет текста',
        },
        {
          token: 'icon.foreground',
          source: computed((ip) => ip.text.subtle),
          description: 'Цвет иконок по умолчанию (приглушённый)',
        },
        {
          token: 'descriptionForeground',
          source: surface.text('base', 'muted'),
          description: 'Описания и вторичный текст',
        },
        {
          token: 'disabledForeground',
          source: surface.text('base', 'inactive'),
          description: 'Отключенные элементы',
        },
        {
          token: 'focusBorder',
          source: computed((ip) => ip.border.focus),
          description: 'Граница фокуса',
        },
        {
          token: 'errorForeground',
          source: computed((ip) => ip.state.error),
          description: 'Цвет ошибок',
        },
        {
          token: 'selection.background',
          source: surface.background('selection'),
          description: 'Фон выделения',
        },
      ],
    },
    {
      name: 'Editor',
      description: 'Основной редактор кода',
      tokens: [
        {
          token: 'editor.background',
          source: surface.background('editor'),
          description: 'Фон редактора',
        },
        {
          token: 'editor.foreground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Текст редактора',
        },
        {
          token: 'editor.selectionBackground',
          source: surface.background('selection'),
          description: 'Выделение в редакторе',
        },
        {
          token: 'editor.inactiveSelectionBackground',
          source: surface.background('hover'),
          description: 'Неактивное выделение',
        },
        {
          token: 'editor.lineHighlightBackground',
          source: surface.background('hover'),
          description: 'Подсветка текущей строки',
        },
        {
          token: 'editorLineNumber.foreground',
          source: computed((ip) => ip.text.lineNumber),
          description: 'Номера строк (приглушённые)',
        },
        {
          token: 'editorLineNumber.activeForeground',
          source: computed((ip) => ip.text.lineNumberActive),
          description: 'Номер активной строки (приглушённый холодный)',
        },
        {
          token: 'editorCursor.foreground',
          source: surface.text('editor', 'primary'),
          description: 'Курсор',
        },
        {
          token: 'editorIndentGuide.background1',
          source: surface.border('editor'),
          description: 'Направляющие отступов',
        },
        {
          token: 'editorIndentGuide.activeBackground1',
          source: computed((ip) => ip.border.focus),
          description: 'Активная направляющая отступа',
        },
        // Sticky Scroll (заголовки, закреплённые при прокрутке)
        {
          token: 'editorStickyScroll.background',
          source: surface.background('elevated'),
          description:
            'Фон sticky scroll панели (слегка приподнят над редактором)',
        },
        {
          token: 'editorStickyScrollHover.background',
          source: surface.background('hover'),
          description:
            'Hover/подсветка строки sticky scroll как у активной строки/hover тона',
        },
      ],
    },
    {
      name: 'Sidebar',
      description: 'Боковая панель навигации',
      tokens: [
        {
          token: 'sideBar.background',
          source: computed((ip) => ip.bg.darkenBase),
          description: 'Фон боковой панели',
        },
        {
          token: 'sideBar.foreground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Текст боковой панели',
        },
        {
          token: 'sideBar.border',
          source: surface.border('base'),
          description: 'Граница боковой панели',
        },
        {
          token: 'sideBarSectionHeader.background',
          source: surface.background('overlay'),
          description: 'Фон заголовков секций (более холодный overlay)',
        },
        {
          token: 'sideBarSectionHeader.foreground',
          source: computed((ip) => ip.textOn.overlay.primary),
          description: 'Текст заголовков секций (поверх overlay)',
        },
      ],
    },
    {
      name: 'Activity Bar',
      description: 'Панель активности слева',
      tokens: [
        {
          token: 'activityBar.background',
          source: surface.background('base'),
          description: 'Фон панели активности',
        },
        {
          token: 'activityBar.foreground',
          source: computed((ip) => ip.textOn.base.muted),
          description: 'Иконки панели активности',
        },
        {
          token: 'activityBar.inactiveForeground',
          source: computed((ip) => ip.textOn.base.inactive),
          description: 'Неактивные иконки',
        },
        {
          token: 'activityBar.activeBorder',
          source: computed((ip) => ip.state.info),
          description: 'Граница активного элемента',
        },
        {
          token: 'activityBar.activeBackground',
          source: surface.background('hover'),
          description: 'Фон активного элемента',
        },
      ],
    },
    {
      name: 'Status Bar',
      description: 'Строка состояния внизу',
      tokens: [
        {
          token: 'statusBar.background',
          source: surface.background('elevated'),
          description: 'Фон строки состояния',
        },
        {
          token: 'statusBar.foreground',
          source: computed((ip) =>
            // Подбираем читабельный muted над elevated, иначе primary
            ((ip) => ip.textOn.elevated.muted)(ip)
          ),
          description: 'Текст строки состояния',
        },
        {
          token: 'statusBar.border',
          source: surface.border('elevated'),
          description: 'Граница строки состояния',
        },
        {
          token: 'statusBarItem.hoverBackground',
          source: surface.background('hover'),
          description: 'Фон элемента при наведении',
        },
        {
          token: 'statusBarItem.prominentBackground',
          source: computed((ip) => ip.state.info),
          description: 'Фон важных элементов',
        },
        {
          token: 'statusBarItem.prominentForeground',
          source: computed((ip) => ip.text.inverse),
          description: 'Текст важных элементов',
        },
      ],
    },
    {
      name: 'Tabs',
      description: 'Вкладки файлов',
      tokens: [
        {
          token: 'tab.activeBackground',
          source: surface.background('elevated'),
          description: 'Фон активной вкладки',
        },
        {
          token: 'tab.activeForeground',
          source: computed((ip) => ip.textOn.elevated.primary),
          description: 'Текст активной вкладки',
        },
        {
          token: 'tab.activeBorderTop',
          source: computed((ip) => ip.state.info),
          description: 'Верхняя граница активной вкладки',
        },
        {
          token: 'tab.inactiveBackground',
          source: surface.background('base'),
          description: 'Фон неактивной вкладки',
        },
        {
          token: 'tab.inactiveForeground',
          source: computed((ip) => ip.textOn.base.muted),
          description: 'Текст неактивной вкладки',
        },
        {
          token: 'tab.hoverBackground',
          source: surface.background('hover'),
          description: 'Фон вкладки при наведении',
        },
      ],
    },
    {
      name: 'Title Bar',
      description: 'Верхняя панель окна VS Code',
      tokens: [
        {
          token: 'titleBar.activeBackground',
          source: surface.background('elevated'),
          description: 'Фон заголовка окна (активное состояние)',
        },
        {
          token: 'titleBar.inactiveBackground',
          source: surface.background('elevated'),
          description: 'Фон заголовка окна (неактивное состояние)',
        },
        {
          token: 'titleBar.border',
          source: surface.border('elevated'),
          description: 'Граница под заголовком окна',
        },
      ],
    },
    {
      name: 'Editor Groups',
      description: 'Заголовки групп редакторов (фон под вкладками)',
      tokens: [
        {
          token: 'editorGroupHeader.tabsBackground',
          source: surface.background('elevated'),
          description: 'Фон области заголовка с вкладками (под вкладками)',
        },
        {
          token: 'editorGroupHeader.noTabsBackground',
          source: surface.background('elevated'),
          description: 'Фон заголовка, когда вкладок нет',
        },
        {
          token: 'editorGroupHeader.tabsBorder',
          source: surface.border('elevated'),
          description: 'Граница области заголовка вкладок',
        },
        {
          token: 'editorGroup.border',
          source: surface.border('base'),
          description: 'Граница между группами редактора',
        },
      ],
    },
    {
      name: 'Panels',
      description: 'Панели (Terminal, Problems, Output)',
      tokens: [
        {
          token: 'panel.background',
          source: surface.background('panel'),
          description: 'Фон панелей',
        },
        {
          token: 'panel.border',
          source: surface.border('panel'),
          description: 'Граница панелей',
        },
        {
          token: 'panelSectionHeader.background',
          source: surface.background('overlay'),
          description: 'Фон заголовка секции панели (холодный overlay)',
        },
        {
          token: 'panelSectionHeader.foreground',
          source: computed((ip) => ip.textOn.overlay.primary),
          description: 'Текст заголовка секции панели (поверх overlay)',
        },
        {
          token: 'panelTitle.activeForeground',
          source: computed((ip) => ip.textOn.elevated.primary),
          description: 'Заголовок активной панели',
        },
        {
          token: 'panelTitle.inactiveForeground',
          source: computed((ip) => ip.textOn.elevated.muted),
          description: 'Заголовок неактивной панели',
        },
        {
          token: 'panelTitle.activeBorder',
          source: computed((ip) => ip.state.info),
          description: 'Граница активного заголовка',
        },
        {
          token: 'panelSection.border',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Граница секции панели',
        },
        {
          token: 'panelSectionHeader.border',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Граница заголовка секции панели',
        },
      ],
    },
    {
      name: 'Lists',
      description: 'Списки и деревья файлов',
      tokens: [
        {
          token: 'list.activeSelectionBackground',
          source: surface.background('selection'),
          description: 'Фон активного выбранного элемента',
        },
        {
          token: 'list.activeSelectionForeground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Текст активного выбранного элемента',
        },
        {
          token: 'list.inactiveSelectionBackground',
          source: surface.background('hover'),
          description: 'Фон неактивного выбранного элемента',
        },
        {
          token: 'list.hoverBackground',
          source: surface.background('hover'),
          description: 'Фон элемента при наведении',
        },
        {
          token: 'list.focusBackground',
          source: surface.background('selection'),
          description: 'Фон элемента в фокусе',
        },
        {
          token: 'list.highlightForeground',
          source: computed((ip) => ip.derived.link.foreground),
          description: 'Подсветка совпадений в поиске',
        },
      ],
    },
    {
      name: 'Input Controls',
      description: 'Поля ввода и формы',
      tokens: [
        {
          token: 'input.background',
          source: surface.background('input'),
          description: 'Фон полей ввода',
        },
        {
          token: 'input.foreground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Текст в полях ввода',
        },
        {
          token: 'input.border',
          source: surface.border('base'),
          description: 'Граница полей ввода',
        },
        {
          token: 'input.placeholderForeground',
          source: surface.text('base', 'subtle'),
          description: 'Текст placeholder',
        },
      ],
    },
    {
      name: 'Buttons',
      description: 'Кнопки интерфейса',
      tokens: [
        {
          token: 'button.background',
          source: computed((ip) => ip.button.primary.background),
          description: 'Фон кнопки',
        },
        {
          token: 'button.foreground',
          source: computed((ip) => ip.button.primary.foreground),
          description: 'Текст кнопки',
        },
        {
          token: 'button.hoverBackground',
          source: computed((ip) => ip.button.primary.hoverBackground),
          description: 'Фон кнопки при наведении',
        },
        {
          token: 'button.border',
          source: computed((ip) => ip.button.primary.border),
          description: 'Граница кнопки',
        },
        {
          token: 'button.separator',
          source: computed((ip) => ip.button.primary.separator),
          description: 'Разделитель кнопки',
        },
        {
          token: 'button.secondaryBackground',
          source: computed((ip) => ip.button.secondary.background),
          description: 'Фон вторичной кнопки',
        },
        {
          token: 'button.secondaryForeground',
          source: computed((ip) => ip.button.secondary.foreground),
          description: 'Текст вторичной кнопки',
        },
        {
          token: 'button.secondaryHoverBackground',
          source: computed((ip) => ip.button.secondary.hoverBackground),
          description: 'Фон вторичной кнопки при наведении',
        },
      ],
    },
    {
      name: 'Badges',
      description: 'Бейджи и счетчики (Search, SCM, Activity Bar, Remote)',
      tokens: [
        {
          token: 'badge.background',
          source: computed((ip) => ip.badge.bg),
          description: 'Фон бейджа (ярко-синий)',
        },
        {
          token: 'badge.foreground',
          source: computed((ip) => ip.badge.fg),
          description: 'Текст бейджа (белый)',
        },
        {
          token: 'activityBarBadge.background',
          source: computed((ip) => ip.badge.bg),
          description: 'Фон бейджа на Activity Bar',
        },
        {
          token: 'activityBarBadge.foreground',
          source: computed((ip) => ip.badge.fg),
          description: 'Текст бейджа на Activity Bar',
        },
        {
          token: 'extensionBadge.remoteBackground',
          source: computed((ip) => ip.badge.bg),
          description: 'Фон удаленного бейджа расширений',
        },
        {
          token: 'extensionBadge.remoteForeground',
          source: computed((ip) => ip.badge.fg),
          description: 'Текст удаленного бейджа расширений',
        },
      ],
    },
    {
      name: 'Menus',
      description: 'Контекстные меню',
      tokens: [
        {
          token: 'menu.background',
          source: surface.background('overlay'),
          description: 'Фон меню (холодный overlay)',
        },
        {
          token: 'menu.foreground',
          source: computed((ip) => ip.textOn.overlay.primary),
          description: 'Текст меню (поверх overlay)',
        },
        {
          token: 'menu.selectionBackground',
          source: surface.background('selection'),
          description: 'Фон выбранного элемента меню',
        },
        {
          token: 'menu.border',
          source: surface.border('overlay'),
          description: 'Граница меню (overlay)',
        },
        {
          token: 'menu.separatorBackground',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Фон разделителей в меню',
        },
      ],
    },
    {
      name: 'Dropdown',
      description: 'Выпадающие списки',
      tokens: [
        {
          token: 'dropdown.background',
          source: computed((ip) => ip.dropdown.background),
          description: 'Фон выпадающего списка (overlay-совместимый)',
        },
        {
          token: 'dropdown.foreground',
          source: computed((ip) => ip.dropdown.foreground),
          description: 'Текст выпадающего списка',
        },
        {
          token: 'dropdown.border',
          source: computed((ip) => ip.dropdown.border),
          description: 'Граница выпадающего списка',
        },
        {
          token: 'dropdown.listBackground',
          source: computed((ip) => ip.dropdown.listBackground),
          description: 'Фон списка внутри выпадающего меню',
        },
      ],
    },
    {
      name: 'Terminal',
      description: 'Встроенный терминал',
      tokens: [
        {
          token: 'terminal.background',
          source: computed((ip) => ip.bg.darkenBase),
          description: 'Фон терминала',
        },
        {
          token: 'terminal.foreground',
          source: computed((ip) => ip.textOn.base.primary),
          description: 'Текст терминала',
        },
        {
          token: 'terminal.selectionBackground',
          source: surface.background('selection'),
          description: 'Выделение в терминале',
        },
        {
          token: 'terminal.inactiveSelectionBackground',
          source: surface.background('hover'),
          description: 'Неактивное выделение в терминале',
        },
        {
          token: 'terminal.border',
          source: surface.border('terminal'),
          description: 'Граница терминала',
        },
        {
          token: 'terminal.hoverHighlightBackground',
          source: computed(
            (ip) => ip.derived.terminal.hoverHighlightBackground
          ),
          description: 'Подсветка при наведении в терминале',
        },
        {
          token: 'terminal.ansiBlack',
          source: computed((ip) => ip.derived.terminal.ansiBlack),
          description: 'ANSI черный цвет',
        },
        {
          token: 'terminal.ansiRed',
          source: computed((ip) => ip.derived.terminal.ansiRed),
          description: 'ANSI красный цвет',
        },
        {
          token: 'terminal.ansiGreen',
          source: computed((ip) => ip.derived.terminal.ansiGreen),
          description: 'ANSI зеленый цвет',
        },
        {
          token: 'terminal.ansiYellow',
          source: computed((ip) => ip.derived.terminal.ansiYellow),
          description: 'ANSI желтый цвет',
        },
        {
          token: 'terminal.ansiBlue',
          source: computed((ip) => ip.derived.terminal.ansiBlue),
          description: 'ANSI синий цвет',
        },
        {
          token: 'terminal.ansiMagenta',
          source: computed((ip) => ip.derived.terminal.ansiMagenta),
          description: 'ANSI пурпурный цвет',
        },
        {
          token: 'terminal.ansiCyan',
          source: computed((ip) => ip.derived.terminal.ansiCyan),
          description: 'ANSI голубой цвет',
        },
        {
          token: 'terminal.ansiWhite',
          source: computed((ip) => ip.derived.terminal.ansiWhite),
          description: 'ANSI белый цвет',
        },
        {
          token: 'terminal.ansiBrightBlack',
          source: computed((ip) => ip.derived.terminal.ansiBrightBlack),
          description: 'ANSI яркий черный цвет',
        },
        {
          token: 'terminal.ansiBrightRed',
          source: computed((ip) => ip.derived.terminal.ansiBrightRed),
          description: 'ANSI яркий красный цвет',
        },
        {
          token: 'terminal.ansiBrightGreen',
          source: computed((ip) => ip.derived.terminal.ansiBrightGreen),
          description: 'ANSI яркий зеленый цвет',
        },
        {
          token: 'terminal.ansiBrightYellow',
          source: computed((ip) => ip.derived.terminal.ansiBrightYellow),
          description: 'ANSI яркий желтый цвет',
        },
        {
          token: 'terminal.ansiBrightBlue',
          source: computed((ip) => ip.derived.terminal.ansiBrightBlue),
          description: 'ANSI яркий синий цвет',
        },
        {
          token: 'terminal.ansiBrightMagenta',
          source: computed((ip) => ip.derived.terminal.ansiBrightMagenta),
          description: 'ANSI яркий пурпурный цвет',
        },
        {
          token: 'terminal.ansiBrightCyan',
          source: computed((ip) => ip.derived.terminal.ansiBrightCyan),
          description: 'ANSI яркий голубой цвет',
        },
        {
          token: 'terminal.ansiBrightWhite',
          source: computed((ip) => ip.derived.terminal.ansiBrightWhite),
          description: 'ANSI яркий белый цвет',
        },
        {
          token: 'terminalCommandDecoration.defaultBackground',
          source: computed((ip) => withAlpha(ip.state.info, 0.2)),
          description: 'Фон индикатора команды (по умолчанию) в терминале',
        },
        {
          token: 'terminalCommandDecoration.successBackground',
          source: computed((ip) => withAlpha(ip.state.success, 0.2)),
          description: 'Фон индикатора успешной команды в терминале',
        },
        {
          token: 'terminalCommandDecoration.errorBackground',
          source: computed((ip) => withAlpha(ip.state.error, 0.2)),
          description: 'Фон индикатора ошибки команды в терминале',
        },
      ],
    },
    {
      name: 'Links',
      description: 'Ссылки в тексте',
      tokens: [
        {
          token: 'textLink.foreground',
          source: computed((ip) => ip.derived.link.foreground),
          description: 'Цвет текстовых ссылок',
        },
        {
          token: 'textLink.activeForeground',
          source: computed((ip) => ip.derived.link.foreground),
          description: 'Цвет активных текстовых ссылок',
        },
        {
          token: 'editorLink.activeForeground',
          source: computed((ip) => ip.derived.link.foreground),
          description: 'Цвет активных ссылок в редакторе',
        },
      ],
    },
    {
      name: 'Notifications',
      description: 'Уведомления',
      tokens: [
        {
          token: 'notifications.background',
          source: surface.background('elevated'),
          description: 'Фон уведомлений',
        },
        {
          token: 'notifications.foreground',
          source: computed((ip) => ip.textOn.elevated.primary),
          description: 'Текст уведомлений',
        },
        {
          token: 'notifications.border',
          source: surface.border('elevated'),
          description: 'Граница уведомлений',
        },
      ],
    },
    {
      name: 'Editor Widgets',
      description: 'Виджеты редактора',
      tokens: [
        {
          token: 'editorHoverWidget.background',
          source: surface.background('overlay'),
          description:
            'Фон hover виджета (чистый overlay для максимальной читаемости)',
        },
        {
          token: 'editorHoverWidget.border',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Граница hover виджета',
        },
        {
          token: 'editorHoverWidget.foreground',
          source: computed((ip) => ip.textOn.overlay.primary),
          description: 'Текст hover виджета (поверх overlay)',
        },
        {
          token: 'editorSuggestWidget.background',
          source: surface.background('overlay'),
          description: 'Фон виджета автодополнения',
        },
        {
          token: 'quickInput.background',
          source: surface.background('elevated'),
          description: 'Фон быстрого ввода',
        },
        {
          token: 'editorWidget.background',
          source: surface.background('elevated'),
          description: 'Фон виджетов редактора',
        },
        {
          token: 'widget.border',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Граница виджетов',
        },
        {
          token: 'widget.shadow',
          source: computed((ip) => ip.derived.shadows.widget),
          description: 'Тень виджетов',
        },
        {
          token: 'editorWidget.border',
          source: computed((ip) => ip.border.separatorBackground),
          description: 'Граница виджетов редактора',
        },
        {
          token: 'quickInput.foreground',
          source: computed((ip) => ip.text.primary),
          description: 'Текст быстрого ввода',
        },
        {
          token: 'quickInputTitle.background',
          source: surface.background('overlay'),
          description: 'Фон заголовка быстрого ввода',
        },
        {
          token: 'quickInputList.focusBackground',
          source: surface.background('selection'),
          description: 'Фон фокуса в списке быстрого ввода',
        },
      ],
    },
    {
      name: 'PeekView',
      description: 'Окно предпросмотра (Peek Definition)',
      tokens: [
        {
          token: 'peekViewEditor.background' as ValidTokens,
          source: surface.background('panel'),
          description:
            'Фон редактора внутри PeekView (совпадает с фоном панели из палитры)',
        },
        {
          token: 'peekViewResult.background' as ValidTokens,
          source: surface.background('panel'),
          description:
            'Фон списка результатов PeekView (совпадает с фоном панели из палитры)',
        },
        {
          token: 'peekViewTitle.background' as ValidTokens,
          source: surface.background('overlay'),
          description: 'Фон заголовка PeekView (слегка холодный overlay)',
        },
        {
          token: 'peekViewEditor.matchHighlightBackground',
          source: computed(
            (ip) => ip.derived.peekView.matchHighlightBackground
          ),
          description: 'Подсветка совпадений в PeekView',
        },
        {
          token: 'peekViewResult.matchHighlightBackground',
          source: computed(
            (ip) => ip.derived.peekView.matchHighlightBackground
          ),
          description: 'Подсветка совпадений в результатах PeekView',
        },
        {
          token: 'peekViewResult.selectionBackground',
          source: computed((ip) => ip.derived.peekView.selectionBackground),
          description: 'Выделение в результатах PeekView',
        },
      ],
    },
    {
      name: 'Search',
      description: 'Поиск и фильтрация',
      tokens: [
        {
          token: 'list.filterMatchBackground',
          source: computed((ip) => ip.derived.findMatch.highlightBackground),
          description: 'Фон совпадений в фильтре списка',
        },
        {
          token: 'list.filterMatchBorder',
          source: computed((ip) => ip.derived.findMatch.border),
          description: 'Граница совпадений в фильтре списка',
        },
        {
          token: 'searchEditor.findMatchBackground',
          source: computed((ip) => ip.derived.findMatch.highlightBackground),
          description: 'Фон совпадений в редакторе поиска',
        },
        {
          token: 'searchEditor.findMatchBorder',
          source: computed((ip) => ip.derived.findMatch.border),
          description: 'Граница совпадений в редакторе поиска',
        },
        {
          token: 'editor.findMatchBackground',
          source: computed((ip) => ip.derived.findMatch.background),
          description: 'Фон текущего совпадения в редакторе',
        },
        {
          token: 'editor.findMatchBorder',
          source: computed((ip) => ip.derived.findMatch.border),
          description: 'Граница текущего совпадения в редакторе',
        },
        {
          token: 'editor.findMatchHighlightBackground',
          source: computed((ip) => ip.derived.findMatch.highlightBackground),
          description: 'Фон других совпадений в редакторе',
        },
        {
          token: 'editor.findMatchForeground',
          source: computed((ip) => ip.text.primary),
          description: 'Текст совпадений в редакторе',
        },
        {
          token: 'terminal.findMatchBackground',
          source: computed((ip) => ip.derived.findMatch.background),
          description: 'Фон текущего совпадения в терминале',
        },
        {
          token: 'terminal.findMatchBorder',
          source: computed((ip) => ip.derived.findMatch.border),
          description: 'Граница текущего совпадения в терминале',
        },
        {
          token: 'terminal.findMatchHighlightBackground',
          source: computed((ip) => ip.derived.findMatch.highlightBackground),
          description: 'Фон других совпадений в терминале',
        },
        {
          token: 'editor.wordHighlightBackground',
          source: computed((ip) => ip.bg.hover),
          description: 'Фон подсветки слов',
        },
        {
          token: 'editor.wordHighlightStrongBackground',
          source: computed((ip) => ip.bg.selection),
          description: 'Фон сильной подсветки слов',
        },
        {
          token: 'editor.hoverHighlightBackground',
          source: computed((ip) => ip.bg.hover),
          description: 'Фон подсветки при hover',
        },
      ],
    },
    {
      name: 'Toolbar',
      description: 'Панель инструментов',
      tokens: [
        {
          token: 'toolbar.hoverBackground',
          source: computed((ip) => withAlpha(ip.state.info, 0.12)),
          description: 'Фон hover элементов toolbar (холодный cyan)',
        },
        {
          token: 'toolbar.activeBackground',
          source: computed((ip) => withAlpha(ip.state.info, 0.2)),
          description: 'Фон активных элементов toolbar (усиленный холодный)',
        },
        {
          token: 'toolbar.hoverOutline',
          source: computed((ip) => withAlpha(ip.state.info, 0.4)),
          description: 'Контур hover элементов toolbar (холодный info)',
        },
      ],
    },
    {
      name: 'Debug',
      description: 'Отладка: консоль и тулбар',
      tokens: [
        {
          token: 'debugToolBar.background',
          source: surface.background('overlay'),
          description: 'Фон тулбара отладки',
        },
        {
          token: 'debugToolBar.border',
          source: surface.border('overlay'),
          description: 'Граница тулбара отладки',
        },
        {
          token: 'debugExceptionWidget.background',
          source: surface.background('overlay'),
          description: 'Фон виджета исключений (холодный overlay)',
        },
        {
          token: 'debugExceptionWidget.border',
          source: computed((ip) => ip.border.separatorBackground),
          description:
            'Граница виджета исключений (аккуратный холодный сепаратор)',
        },
        {
          token: 'editor.stackFrameHighlightBackground',
          source: surface.background('hover'),
          description: 'Подсветка текущего stack frame (холодный тон)',
        },
        {
          token: 'editor.focusedStackFrameHighlightBackground',
          source: surface.background('selection'),
          description: 'Подсветка сфокусированного stack frame (чуть сильнее)',
        },
        // Debug breakpoint icons — используем холодные семантические тона
        {
          token: 'debugIcon.breakpointForeground',
          source: computed((ip) => ip.state.error),
          description:
            'Цвет обычного брейкпоинта (error tone, хорошо читается)',
        },
        {
          token: 'debugIcon.breakpointDisabledForeground',
          source: computed((ip) => withAlpha(ip.state.error, 0.5)),
          description: 'Цвет отключенного брейкпоинта (приглушенный)',
        },
        {
          token: 'debugIcon.breakpointUnverifiedForeground',
          source: computed((ip) => ip.state.warning),
          description: 'Цвет непроверенного брейкпоинта (warning tone)',
        },
        {
          token: 'debugIcon.breakpointCurrentStackframeForeground',
          source: computed((ip) => ip.state.info),
          description: 'Цвет брейкпоинта текущего стека (info/cold)',
        },
        {
          token: 'debugIcon.breakpointStackframeForeground',
          source: computed((ip) => withAlpha(ip.state.info, 0.7)),
          description: 'Цвет брейкпоинта в стеке (чуть менее акцентный info)',
        },
      ],
    },
    {
      name: 'Inline Chat',
      description: 'Встроенный чат ИИ',
      tokens: [
        {
          token: 'inlineChat.background',
          source: computed((ip) => ip.derived.inlineChat.background),
          description: 'Фон встроенного чата',
        },
        {
          token: 'inlineChat.foreground',
          source: computed((ip) => ip.derived.inlineChat.foreground),
          description: 'Текст встроенного чата',
        },
        {
          token: 'inlineChat.border',
          source: computed((ip) => ip.border.default),
          description: 'Граница встроенного чата',
        },
      ],
    },
    {
      name: 'Scrollbar',
      description: 'Полосы прокрутки',
      tokens: [
        {
          token: 'scrollbar.shadow',
          source: computed((ip) => ip.derived.shadows.scrollbar),
          description: 'Тень полосы прокрутки',
        },
        {
          token: 'scrollbarSlider.background',
          source: computed((ip) => ip.bg.hover),
          description: 'Фон ползунка прокрутки',
        },
        {
          token: 'scrollbarSlider.hoverBackground',
          source: computed((ip) => ip.bg.active),
          description: 'Фон ползунка при hover',
        },
        {
          token: 'scrollbarSlider.activeBackground',
          source: computed((ip) => ip.bg.selection),
          description: 'Фон активного ползунка',
        },
      ],
    },
    {
      name: 'Editor Range',
      description: 'Диапазоны в редакторе',
      tokens: [
        {
          token: 'editor.rangeHighlightBackground',
          source: computed((ip) => ip.bg.hover),
          description: 'Фон подсвеченного диапазона',
        },
      ],
    },
    {
      name: 'Drop Backgrounds',
      description: 'Фоны при перетаскивании',
      tokens: [
        {
          token: 'editorGroup.dropBackground',
          source: computed((ip) => ip.derived.overlays.dropBackground),
          description: 'Фон при перетаскивании в группу редакторов',
        },
        {
          token: 'list.dropBackground',
          source: computed((ip) => ip.derived.overlays.dropBackground),
          description: 'Фон при перетаскивании в список',
        },
        {
          token: 'panelSection.dropBackground',
          source: computed((ip) => ip.derived.overlays.dropBackground),
          description: 'Фон при перетаскивании в секцию панели',
        },
        {
          token: 'terminal.dropBackground',
          source: computed((ip) => ip.derived.overlays.dropBackground),
          description: 'Фон при перетаскивании в терминал',
        },
      ],
    },
  ],
}

/**
 * Создание маппинга с использованием нового DSL
 */
export const createTokens = (
  interfacePalette: InterfacePalette
): Record<string, string> => {
  return createTokenMapping(tokenConfig, interfacePalette)
}

/**
 * Обратная совместимость - экспорт как colorMappings
 */
export const colorMappings = createTokens
