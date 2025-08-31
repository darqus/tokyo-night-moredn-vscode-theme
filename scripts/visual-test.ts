#!/usr/bin/env node

/**
 * Visual regression testing for theme components
 * Compares screenshots of UI elements between theme versions
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import puppeteer, { Browser } from 'puppeteer'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

interface TestResult {
  component: string
  passed: boolean
  baseline: string
  current: string
  diff: string
  error?: string
  diffPixels?: number
}

class VisualRegressionTester {
  private testDir: string
  private screenshotsDir: string
  private baselineDir: string
  private diffDir: string
  private themePath: string

  constructor() {
    this.testDir = path.join(process.cwd(), 'tests', 'visual')
    this.screenshotsDir = path.join(this.testDir, 'screenshots')
    this.baselineDir = path.join(this.testDir, 'baseline')
    this.diffDir = path.join(this.testDir, 'diff')
    this.themePath = path.join(
      process.cwd(),
      'themes',
      'tokyo-night-dark-color-theme.json'
    )
  }

  initialize(): void {
    ;[
      this.testDir,
      this.screenshotsDir,
      this.baselineDir,
      this.diffDir,
    ].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    })
  }

  async runTests(): Promise<boolean> {
    console.log('🎨 Visual Regression Tests')
    console.log('========================\n')

    this.initialize()

    const hasBaseline =
      fs.existsSync(this.baselineDir) &&
      fs.readdirSync(this.baselineDir).length > 0

    if (!hasBaseline) {
      console.log('No baseline screenshots found. Creating baseline...')
      await this.createBaseline()
      console.log(
        'Baseline created. Please review and commit the baseline screenshots.'
      )
      return true
    }

    console.log('Running visual regression tests...\n')
    await this.generateScreenshots()
    const results = this.compareScreenshots()
    this.reportResults(results)

    return results.every((r) => r.passed)
  }

  async createBaseline(): Promise<void> {
    console.log('Creating baseline screenshots...')
    await this.generateScreenshots()

    const screenshots = fs.readdirSync(this.screenshotsDir)
    screenshots.forEach((screenshot) => {
      const src = path.join(this.screenshotsDir, screenshot)
      const dest = path.join(this.baselineDir, screenshot)
      fs.renameSync(src, dest)
    })

    console.log(`Created baseline with ${screenshots.length} screenshots`)
  }

  async generateScreenshots(): Promise<void> {
    console.log('Generating screenshots...')

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    try {
      await this.generateEditorScreenshots(browser)
      await this.generateUIComponentScreenshots(browser)
    } finally {
      await browser.close()
    }

    console.log('Screenshots generated')
  }

  private async generateEditorScreenshots(browser: Browser): Promise<void> {
    const page = await browser.newPage()
    await page.setViewport({ width: 900, height: 600, deviceScaleFactor: 1 })
    const theme = JSON.parse(fs.readFileSync(this.themePath, 'utf8'))

    // Создаём CSS для подсветки синтаксиса на основе tokenColors
    const syntaxCSS = this.generateSyntaxCSS(theme)

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            background-color: ${theme.colors['editor.background'] || '#1a1b26'};
            color: ${theme.colors['editor.foreground'] || '#a9b1d6'};
            font-family: 'Monaco', 'Consolas', monospace;
            padding: 20px;
            margin: 0;
          }
          .editor-container {
            background-color: ${theme.colors['editor.background'] || '#1a1b26'};
            border: 1px solid ${
              theme.colors['editorGroup.border'] || '#1a1b26'
            };
            border-radius: 4px;
            padding: 10px;
            width: 860px;
            height: 520px;
            overflow: hidden;
            line-height: 1.4;
            font-size: 14px;
          }
          pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-variant-ligatures: none;
            -webkit-font-smoothing: antialiased;
          }
          ${syntaxCSS}
        </style>
      </head>
      <body>
        <div class="editor-container">
          <pre id="code-content"></pre>
        </div>
      </body>
      </html>
    `)

    const examples = {
      js: `<span class="keyword">function</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span><span class="punctuation">)</span> <span class="punctuation">{</span>
  <span class="keyword">if</span> <span class="punctuation">(</span><span class="parameter">n</span> <span class="operator">&lt;=</span> <span class="number">1</span><span class="punctuation">)</span> <span class="keyword">return</span> <span class="parameter">n</span><span class="punctuation">;</span>
  <span class="keyword">return</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span> <span class="operator">-</span> <span class="number">1</span><span class="punctuation">)</span> <span class="operator">+</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span> <span class="operator">-</span> <span class="number">2</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="storage">const</span> <span class="variable">result</span> <span class="operator">=</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="number">10</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="support">console</span><span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">\`Fibonacci of 10 is \${</span><span class="variable">result</span><span class="string">}\`</span><span class="punctuation">)</span><span class="punctuation">;</span>`,
      ts: `<span class="keyword">interface</span> <span class="entity">User</span> <span class="punctuation">{</span>
  <span class="property">id</span><span class="punctuation">:</span> <span class="type">number</span><span class="punctuation">;</span>
  <span class="property">name</span><span class="punctuation">:</span> <span class="type">string</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="keyword">type</span> <span class="entity">UserRole</span> <span class="operator">=</span> <span class="string">'admin'</span> <span class="operator">|</span> <span class="string">'user'</span><span class="punctuation">;</span>
<span class="keyword">class</span> <span class="entity">UserService</span> <span class="punctuation">{</span>
  <span class="storage">private</span> <span class="property">users</span><span class="punctuation">:</span> <span class="type">User</span><span class="punctuation">[]</span> <span class="operator">=</span> <span class="punctuation">[]</span><span class="punctuation">;</span>
  <span class="function">addUser</span><span class="punctuation">(</span><span class="parameter">user</span><span class="punctuation">:</span> <span class="type">User</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="type">void</span> <span class="punctuation">{</span>
    <span class="keyword">this</span><span class="punctuation">.</span><span class="property">users</span><span class="punctuation">.</span><span class="function">push</span><span class="punctuation">(</span><span class="parameter">user</span><span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span>`,
      python: `<span class="keyword">def</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span><span class="punctuation">)</span><span class="punctuation">:</span>
    <span class="keyword">if</span> <span class="parameter">n</span> <span class="operator">&lt;=</span> <span class="number">1</span><span class="punctuation">:</span>
        <span class="keyword">return</span> <span class="parameter">n</span>
    <span class="keyword">return</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span> <span class="operator">-</span> <span class="number">1</span><span class="punctuation">)</span> <span class="operator">+</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="parameter">n</span> <span class="operator">-</span> <span class="number">2</span><span class="punctuation">)</span>
<span class="variable">result</span> <span class="operator">=</span> <span class="function">fibonacci</span><span class="punctuation">(</span><span class="number">10</span><span class="punctuation">)</span>
<span class="function">print</span><span class="punctuation">(</span><span class="string">f"Fibonacci of 10 is {</span><span class="variable">result</span><span class="string">}"</span><span class="punctuation">)</span>`
    }

    for (const [lang, code] of Object.entries(examples)) {
      await page.evaluate((code) => {
        const doc = (globalThis as any).document
        const el = doc && doc.getElementById('code-content')
        if (el) (el as any).innerHTML = code
      }, code)
      const handle: any = await page.$('.editor-container')
      if (handle) {
        await handle.screenshot({
          path: path.join(
            this.screenshotsDir,
            `editor-syntax-${lang}.png`
          ) as `${string}.png`,
        })
      }
    }

    await page.close()
  }

  private generateSyntaxCSS(theme: any): string {
    // Извлекаем цвета из tokenColors темы
    const tokenColors = theme.tokenColors || []
    
    // Создаём маппинг scope -> цвет из темы
    const scopeColors: Record<string, string> = {}
    
    tokenColors.forEach((token: any) => {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope]
      const color = token.settings?.foreground
      
      if (color) {
        scopes.forEach((scope: string) => {
          if (scope.includes('keyword')) scopeColors.keyword = color
          if (scope.includes('storage')) scopeColors.storage = color
          if (scope.includes('function') || scope.includes('entity.name.function')) scopeColors.function = color
          if (scope.includes('entity.name') && !scope.includes('function')) scopeColors.entity = color
          if (scope.includes('support.type') || scope.includes('entity.name.type')) scopeColors.type = color
          if (scope.includes('string')) scopeColors.string = color
          if (scope.includes('constant.numeric')) scopeColors.number = color
          if (scope.includes('variable')) scopeColors.variable = color
          if (scope.includes('variable.parameter')) scopeColors.parameter = color
          if (scope.includes('support.type.property-name')) scopeColors.property = color
          if (scope.includes('punctuation')) scopeColors.punctuation = color
          if (scope.includes('keyword.operator')) scopeColors.operator = color
          if (scope.includes('support.function') || scope.includes('support.class')) scopeColors.support = color
          if (scope.includes('comment')) scopeColors.comment = color
        })
      }
    })
    
    // Дефолтные цвета если не найдены в теме
    const defaults = {
      keyword: '#bb9af7',
      storage: '#9d7cd8', 
      function: '#7aa2f7',
      entity: '#7aa2f7',
      type: '#0db9d7',
      string: '#9ece6a',
      number: '#ff9e64',
      variable: '#c0caf5',
      parameter: '#e0af68',
      property: '#73daca',
      punctuation: '#89ddff',
      operator: '#bb9af7',
      support: '#0db9d7',
      comment: '#51597d'
    }
    
    return `
      /* Syntax highlighting based on theme tokenColors */
      .keyword { color: ${scopeColors.keyword || defaults.keyword}; font-style: italic; }
      .storage { color: ${scopeColors.storage || defaults.storage}; font-style: italic; }
      .function { color: ${scopeColors.function || defaults.function}; }
      .entity { color: ${scopeColors.entity || defaults.entity}; }
      .type { color: ${scopeColors.type || defaults.type}; }
      .string { color: ${scopeColors.string || defaults.string}; }
      .number { color: ${scopeColors.number || defaults.number}; }
      .variable { color: ${scopeColors.variable || defaults.variable}; }
      .parameter { color: ${scopeColors.parameter || defaults.parameter}; }
      .property { color: ${scopeColors.property || defaults.property}; }
      .punctuation { color: ${scopeColors.punctuation || defaults.punctuation}; }
      .operator { color: ${scopeColors.operator || defaults.operator}; }
      .support { color: ${scopeColors.support || defaults.support}; }
      .comment { color: ${scopeColors.comment || defaults.comment}; font-style: italic; }
    `
  }

  private async generateUIComponentScreenshots(
    browser: Browser
  ): Promise<void> {
    // Use the static visual template and capture individual elements by selector
    const templatePath = path.join(this.testDir, 'template.html')
    const templateHtml = fs.readFileSync(templatePath, 'utf8')

    // Map component names to CSS selectors in the template
    const selectorMap: Record<string, string> = {
      'activity-bar': '.activity-bar',
      // Sidebar isn't explicitly in the template; reuse activity bar as a stable proxy
      sidebar: '.activity-bar',
      'status-bar': '.status-bar',
      'button-primary': '.button:not(.secondary)',
      'button-secondary': '.button.secondary',
      'input-field': 'input.input',
      'list-item': '.list',
      tabs: '.tabs',
      terminal: '.terminal',
    }

    for (const [name, selector] of Object.entries(selectorMap)) {
      const page = await browser.newPage()
      await page.setViewport({ width: 900, height: 600, deviceScaleFactor: 1 })
      await page.setContent(templateHtml, { waitUntil: 'load' })

      // Wait briefly for styles and layout without relying on Page.waitForTimeout typings
      await new Promise((resolve) => setTimeout(resolve, 50))

      const handle = await page.$(selector)
      if (!handle) {
        console.warn(
          `Could not find selector for component ${name}: ${selector}`
        )
        await page.close()
        continue
      }

      await (handle as any).screenshot({
        path: path.join(this.screenshotsDir, `${name}.png`) as `${string}.png`,
      })
      await page.close()
    }
  }

  private compareScreenshots(): TestResult[] {
    console.log('Comparing screenshots...')

    const baselineScreenshots = fs.readdirSync(this.baselineDir)
    const results: TestResult[] = []

    baselineScreenshots.forEach((screenshot) => {
      const baselinePath = path.join(this.baselineDir, screenshot)
      const currentPath = path.join(this.screenshotsDir, screenshot)
      const diffPath = path.join(this.diffDir, `diff-${screenshot}`)

      if (!fs.existsSync(currentPath)) {
        results.push({
          component: path.basename(screenshot, '.png'),
          passed: false,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          error: 'Missing current screenshot',
        })
        return
      }

      try {
        const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath))
        const currentImg = PNG.sync.read(fs.readFileSync(currentPath))
        const { width, height } = baselineImg
        const diff = new PNG({ width, height })

        const numDiffPixels = pixelmatch(
          baselineImg.data,
          currentImg.data,
          diff.data,
          width,
          height,
          { threshold: 0.1, includeAA: true }
        )
        const area = width * height
        const allowed = Math.floor(area * 0.015) // 1.5% допускаем из-за сглаживания/рендеринга
        const passed = numDiffPixels <= allowed

        if (!passed) {
          fs.writeFileSync(diffPath, PNG.sync.write(diff))
        }

        results.push({
          component: path.basename(screenshot, '.png'),
          passed,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          diffPixels: numDiffPixels,
        })
      } catch (error: any) {
        results.push({
          component: path.basename(screenshot, '.png'),
          passed: false,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          error: error.message,
        })
      }
    })

    return results
  }

  private reportResults(results: TestResult[]): void {
    console.log('\n📊 Test Results')
    console.log('==============')

    let passedCount = 0
    let failedCount = 0

    results.forEach((result) => {
      if (result.passed) {
        console.log(`✅ ${result.component}`)
        passedCount++
      } else {
        console.log(
          `❌ ${result.component} (${
            result.error || `${result.diffPixels} different pixels`
          })`
        )
        failedCount++
      }
    })

    console.log(`\n📈 Summary: ${passedCount} passed, ${failedCount} failed`)

    if (failedCount > 0) {
      console.log('\n🔧 To update baseline:')
      console.log('   npm run test:visual --update')
    }
  }
}

async function main() {
  const tester = new VisualRegressionTester()
  const args = process.argv.slice(2)
  const updateBaseline = args.includes('--update') || args.includes('-u')

  if (updateBaseline) {
    await tester.createBaseline()
    return
  }

  const passed = await tester.runTests()
  process.exit(passed ? 0 : 1)
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { VisualRegressionTester }
