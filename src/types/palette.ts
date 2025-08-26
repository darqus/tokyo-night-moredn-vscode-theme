export type Hex = `#${string}`

/**
 * Основная цветовая палитра для темы Tokyo Night Dark.
 * Организована по функциональным группам для легкого понимания и поддержки.
 * Все цвета используют формат hex с проверкой типов.
 */
export interface Palette {
  bg: {
    base: Hex
    elevated: Hex
    overlay: Hex
    input: Hex
    hover: Hex
    active: Hex
    drop: Hex
    lineHighlight: Hex
    bracketMatch: Hex
    tabs: Hex
    selection: {
      active: Hex
      inactive: Hex
      focus: Hex
      menu: Hex
    }
  }
  line: {
    border: Hex
    menu: Hex
  }
  fg: {
    primary: Hex
    dark: Hex
    muted: Hex
    subtle: Hex
    inactive: Hex
    panelText: Hex
    soft: Hex
    selectionText: Hex
    onSelection: Hex
    activeTitle: Hex
    breadcrumb: Hex
    description: Hex
  }
  brand: {
    primary: Hex
    button: {
      primary: Hex
      hover: Hex
    }
  }
  accent: {
    blue: Hex
    cyan: Hex
    teal: Hex
    magenta: Hex
    yellow: Hex
    orange: Hex
    red: Hex
    purple: Hex
  }
  token: {
    comment: Hex
    commentDoc: Hex
    commentDocEmphasized: Hex
    constant: Hex
    string: Hex
    color: Hex
    invalid: Hex
    invalidDeprecated: Hex
    storageType: Hex
    storageModifier: Hex
    interpolation: Hex
    templateKeyword: Hex
    spread: Hex
    operator: Hex
    importExport: Hex
    keyword: Hex
    keywordSql: Hex
    keywordLogical: Hex
    tag: Hex
    tagComponent: Hex
    tagPunctuation: Hex
    globalConstant: Hex
    variable: Hex
    objectVariable: Hex
    arrayKey: Hex
    objectKey: Hex
    objectProperty: Hex
    objectPropertyAlt: Hex
    objectKeyLevel3: Hex
    cVariable: Hex
    otherVariable: Hex
    method: Hex
    function: Hex
    functionArg: Hex
    typeConstant: Hex
    variableDefinition: Hex
    inheritedClass: Hex
    classSupport: Hex
    className: Hex
    supportFunction: Hex
    cssProperty: Hex
    cssFont: Hex
    cssClass: Hex
    cssId: Hex
    cssTag: Hex
    cssReference: Hex
    cssPunctuation: Hex
    cssAtRule: Hex
    cssParentSelector: Hex
    scssMixin: Hex
    scssInclude: Hex
    cssValue: Hex
    languageMethod: Hex
    thisKeyword: Hex
    htmlAttribute: Hex
    htmlEntity: Hex
    vueAttribute: Hex
    cssPseudo: Hex
    markupInserted: Hex
    markupDeleted: Hex
    markupChanged: Hex
    regex: Hex
    regexGroup: Hex
    regexCharClass: Hex
    regexCharSet: Hex
    regexQuantifier: Hex
    regexBackslash: Hex
    escapeChar: Hex
    decorator: Hex
    cssUnit: Hex
    jsonKey0: Hex
    jsonKey1: Hex
    jsonKey2: Hex
    jsonKey3: Hex
    jsonKey4: Hex
    jsonKey5: Hex
    jsonKey6: Hex
    jsonKey7: Hex
    jsonKey8: Hex
    plainPunctuation: Hex
    blockPunctuation: Hex
    markdownH1: Hex
    markdownH2: Hex
    markdownH3: Hex
    markdownH4: Hex
    markdownH5: Hex
    markdownH6: Hex
    markdownContent: Hex
    htmlText: Hex
    markdownRawInline: Hex
    markdownRawPunctuation: Hex
    markupItalic: Hex
    markupBold: Hex
    markdownBlockquote: Hex
    markdownLink: Hex
    markdownCodeBlock: Hex
    markdownSeparator: Hex
    markupTable: Hex
    tokenInfo: Hex
    tokenWarn: Hex
    tokenError: Hex
    tokenDebug: Hex
    apacheTag: Hex
    preprocessor: Hex
    envValue: Hex
    ignored: Hex
    number: Hex
    markup: Hex
    error: Hex
    codeBlock: Hex
    linkText: Hex
    quoteMark: Hex
    linkUrl: Hex
    warning: Hex
    deleted: Hex
    inserted: Hex
  }
  ansi: {
    black: Hex
    brightBlack: Hex
    red: Hex
    brightRed: Hex
    green: Hex
    brightGreen: Hex
    yellow: Hex
    brightYellow: Hex
    blue: Hex
    brightBlue: Hex
    magenta: Hex
    brightMagenta: Hex
    cyan: Hex
    brightCyan: Hex
    white: Hex
    brightWhite: Hex
  }
  ui: {
    description: Hex
    breadcrumb: Hex
    shadow: {
      widget: Hex
      scrollbar: Hex
    }
    badge: {
      base: Hex
      fg: Hex
    }
    sash: {
      hover: Hex
    }
    selectionWash: Hex
    scrollbarBase: Hex
    input: {
      placeholder: Hex
      border: Hex
    }
    list: {
      hoverBg: Hex
      dropBg: Hex
    }
    editorLinkActive: Hex
    codeLens: Hex
    noMatches: Hex
    settingsHeader: Hex
    window: {
      border: Hex
    }
    tab: {
      activeBorder: Hex
      activeModifiedBorder: Hex
      inactiveModifiedBorder: Hex
      unfocusedActiveBorder: Hex
      lastPinnedBorder: Hex
    }
    statusItem: {
      hover: Hex
      prominentHover: Hex
    }
    text: {
      preformat: Hex
      separator: Hex
    }
    debug: {
      exceptionBorder: Hex
      consoleError: Hex
      consoleWarning: Hex
      stateLabelBg: Hex
      tokenValue: Hex
      tokenString: Hex
      tokenError: Hex
      info: Hex
    }
    editorOverview: {
      error: Hex
      info: Hex
      modified: Hex
      added: Hex
      deleted: Hex
    }
    gutter: {
      modified: Hex
      added: Hex
      deleted: Hex
    }
    minimapGutter: {
      modified: Hex
      added: Hex
      deleted: Hex
    }
    charts: {
      foreground: Hex
    }
    gitlens: {
      foreground: Hex
    }
    git: {
      ignored: Hex
      deleted: Hex
      conflicting: Hex
      stageDeleted: Hex
      stageModified: Hex
    }
    semantic: {
      white: Hex
      notificationLink: Hex
      offline: Hex
    }
  }
  brackets: {
    round: Hex
    square: Hex
    curly: Hex
    angle: Hex
  }
  punctuation: {
    comma: Hex
    dot: Hex
    colon: Hex
    semicolon: Hex
    operator: Hex
  }
}
