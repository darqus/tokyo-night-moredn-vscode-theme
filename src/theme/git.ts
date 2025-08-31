import { palette, extendedPalette } from '../palette'
import { getAdaptiveWidgetBackground } from '../utils/adaptive-background'
import {
  getAdaptiveBadgeColors,
  getAdaptiveGitDecorationColors,
  getAdaptiveScmGraphColors,
} from '../utils/adaptive-git'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getGitColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  const widgetBackground = getAdaptiveWidgetBackground(context)

  // Получаем адаптивные цвета
  const badgeColors = getAdaptiveBadgeColors(context)
  const gitColors = getAdaptiveGitDecorationColors(context)
  const scmGraphColors = getAdaptiveScmGraphColors(context)

  return {
    // === БЕЙДЖИ ===
    'badge.background': badgeColors.background,
    'badge.foreground': badgeColors.foreground,
    'activityBarBadge.background': badgeColors.activityBar,
    'activityBarBadge.foreground': badgeColors.foreground,
    'extensionBadge.remoteBackground': badgeColors.extension,
    'extensionBadge.remoteForeground': badgeColors.extensionForeground,

    // === GIT DECORATIONS ===
    'gitDecoration.modifiedResourceForeground': gitColors.modified,
    'gitDecoration.ignoredResourceForeground': gitColors.ignored,
    'gitDecoration.deletedResourceForeground': gitColors.deleted,
    'gitDecoration.renamedResourceForeground': gitColors.renamed,
    'gitDecoration.addedResourceForeground': gitColors.added,
    'gitDecoration.untrackedResourceForeground': gitColors.untracked,
    'gitDecoration.conflictingResourceForeground': gitColors.conflicting,
    'gitDecoration.stageDeletedResourceForeground': gitColors.stageDeleted,
    'gitDecoration.stageModifiedResourceForeground': gitColors.stageModified,

    // === SCM GRAPH ===
    'scmGraph.historyItemHoverLabelForeground': scmGraphColors.hoverLabel,
    'scmGraph.foreground1': scmGraphColors.foreground1,
    'scmGraph.foreground2': scmGraphColors.foreground2,
    'scmGraph.foreground3': scmGraphColors.foreground3,
    'scmGraph.foreground4': scmGraphColors.foreground4,
    'scmGraph.foreground5': scmGraphColors.foreground5,
    'scmGraph.historyItemHoverAdditionsForeground':
      scmGraphColors.hoverAdditions,
    'scmGraph.historyItemHoverDeletionsForeground':
      scmGraphColors.hoverDeletions,
    'scmGraph.historyItemRefColor': scmGraphColors.refColor,

    // Дополнительные SCM Graph цвета - теперь также адаптивные
    'scmGraph.historyItemRemoteRefColor': scmGraphColors.remoteRefColor,
    'scmGraph.historyItemBaseRefColor': scmGraphColors.baseRefColor,
    'scmGraph.historyItemHoverDefaultLabelForeground':
      scmGraphColors.hoverDefault,

    // === ДОПОЛНИТЕЛЬНЫЕ GIT ЭЛЕМЕНТЫ ===
    'merge.currentHeaderBackground': (gitColors.modified + '40') as Hex, // С прозрачностью
    'merge.currentContentBackground': (gitColors.modified + '20') as Hex,
    'merge.incomingHeaderBackground': (gitColors.added + '40') as Hex,
    'merge.incomingContentBackground': (gitColors.added + '20') as Hex,
    'merge.border': gitColors.conflicting,
    'editorOverviewRuler.modifiedForeground': gitColors.modified,
    'editorOverviewRuler.addedForeground': gitColors.added,
    'editorOverviewRuler.deletedForeground': gitColors.deleted,
  }
}
