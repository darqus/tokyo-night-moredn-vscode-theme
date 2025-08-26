import { palette } from '../palette'
import { gitBlameEditorDecorationForeground } from '../palette.core'

export const getGitColors = () => ({
  // Оформление Git
  'gitDecoration.modifiedResourceForeground': palette.accent.blue, // Измененные файлы
  'gitDecoration.ignoredResourceForeground': palette.ui.git.ignored, // Игнорируемые файлы
  'gitDecoration.deletedResourceForeground': palette.ui.git.deleted, // Удаленные файлы
  'gitDecoration.renamedResourceForeground': palette.accent.teal, // Переименованные файлы
  'gitDecoration.addedResourceForeground': palette.accent.teal, // Добавленные файлы
  'gitDecoration.untrackedResourceForeground': palette.accent.teal, // Неотслеживаемые файлы
  'gitDecoration.conflictingResourceForeground': palette.ui.git.conflicting, // Конфликтующие файлы
  'gitDecoration.stageDeletedResourceForeground': palette.ui.git.stageDeleted, // Удаленные в стейдже
  'gitDecoration.stageModifiedResourceForeground': palette.ui.git.stageModified, // Измененные в стейдже
  'git.blame.editorDecorationForeground': gitBlameEditorDecorationForeground, // Git blame аннотации

  // SCM Graph - исправление проблемы с читаемостью тегов во всплывающих подсказках
  'scmGraph.historyItemHoverDefaultLabelForeground': palette.fg.dark, // Темный текст для лучшей читаемости на светлом фоне

  // SCM Graph - основные цвета для элементов временной шкалы Git
  'scmGraph.historyItemHoverLabelForeground': palette.fg.dark, // Темный текст для всплывающих подсказок
  'scmGraph.foreground1': palette.accent.orange, // Оранжевый для первого типа элементов
  'scmGraph.foreground2': palette.accent.yellow, // Желтый для второго типа элементов
  'scmGraph.foreground3': palette.accent.teal, // Голубой для третьего типа элементов
  'scmGraph.foreground4': palette.accent.blue, // Синий для четвертого типа элементов
  'scmGraph.foreground5': palette.accent.purple, // Фиолетовый для пятого типа элементов

  // SCM Graph - цвета для добавлений и удалений во всплывающих подсказках
  'scmGraph.historyItemHoverAdditionsForeground': palette.accent.teal, // Голубой для добавлений
  'scmGraph.historyItemHoverDeletionsForeground': palette.accent.red, // Красный для удалений

  // SCM Graph - цвета для ссылок Git (ветки, теги и т.д.)
  'scmGraph.historyItemRefColor': palette.accent.blue, // Синий для локальных ссылок
  'scmGraph.historyItemRemoteRefColor': palette.accent.teal, // Голубой для удаленных ссылок
  'scmGraph.historyItemBaseRefColor': palette.accent.purple, // Фиолетовый для базовых ссылок
})
