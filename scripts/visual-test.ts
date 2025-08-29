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
          }
          pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-variant-ligatures: none;
            -webkit-font-smoothing: antialiased;
          }
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
      js: `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const result = fibonacci(10);
console.log(\`Fibonacci of 10 is \${result}\`);
      `.trim(),
      ts: `
interface User {
  id: number;
  name: string;
}
type UserRole = 'admin' | 'user';
class UserService {
  private users: User[] = [];
  addUser(user: User): void {
    this.users.push(user);
  }
}
      `.trim(),
      python: `
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
result = fibonacci(10)
print(f"Fibonacci of 10 is {result}")
      `.trim(),
    }

    for (const [lang, code] of Object.entries(examples)) {
      await page.evaluate((code) => {
        const doc = (globalThis as any).document
        const el = doc && doc.getElementById('code-content')
        if (el) (el as any).textContent = code
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

  private async generateUIComponentScreenshots(
    browser: Browser
  ): Promise<void> {
    const theme = JSON.parse(fs.readFileSync(this.themePath, 'utf8'))

    const components = [
      { name: 'activity-bar', html: `...` },
      { name: 'sidebar', html: `...` },
    ]

    for (const component of components) {
      const page = await browser.newPage()
      await page.setViewport({ width: 900, height: 600, deviceScaleFactor: 1 })
      await page.setContent(`...`)
      await page.screenshot({
        path: path.join(
          this.screenshotsDir,
          `${component.name}.png`
        ) as `${string}.png`,
        fullPage: false,
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
