import { palette, core } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getGitColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Git декорации - точная копия оригинальной Tokyo Night
  'gitDecoration.modifiedResourceForeground': '#6183bb' as Hex, // точно как в оригинале
  'gitDecoration.ignoredResourceForeground': '#515670' as Hex, // точно как в оригинале
  'gitDecoration.deletedResourceForeground': '#914c54' as Hex, // точно как в оригинале
  'gitDecoration.renamedResourceForeground': '#449dab' as Hex, // точно как в оригинале
  'gitDecoration.addedResourceForeground': '#449dab' as Hex, // точно как в оригинале
  'gitDecoration.untrackedResourceForeground': '#449dab' as Hex, // точно как в оригинале
  'gitDecoration.conflictingResourceForeground': '#e0af68cc' as Hex, // точно как в оригинале
  'gitDecoration.stageDeletedResourceForeground': '#914c54' as Hex, // точно как в оригинале
  'gitDecoration.stageModifiedResourceForeground': '#6183bb' as Hex, // точно как в оригинале

  // SCM Graph - точная копия оригинальной Tokyo Night
  'scmGraph.historyItemHoverLabelForeground': '#1b1e2e' as Hex, // точно как в оригинале
  'scmGraph.foreground1': '#ff9e64' as Hex, // точно как в оригинале
  'scmGraph.foreground2': '#e0af68' as Hex, // точно как в оригинале
  'scmGraph.foreground3': '#41a6b5' as Hex, // точно как в оригинале
  'scmGraph.foreground4': '#7aa2f7' as Hex, // точно как в оригинале
  'scmGraph.foreground5': '#bb9af7' as Hex, // точно как в оригинале
  'scmGraph.historyItemHoverAdditionsForeground': '#41a6b5' as Hex, // точно как в оригинале
  'scmGraph.historyItemHoverDeletionsForeground': '#f7768e' as Hex, // точно как в оригинале
  'scmGraph.historyItemRefColor': '#506FCA' as Hex, // точно как в оригинале
  'scmGraph.historyItemRemoteRefColor': '#41a6b5' as Hex, // точно как в оригинале
  'scmGraph.historyItemBaseRefColor': '#9d7cd8' as Hex, // точно как в оригинале
  'scmGraph.historyItemHoverDefaultLabelForeground': '#a9b1d6' as Hex, // точно как в оригинале
})
