#!/usr/bin/env node

/**
 * Visual regression testing for theme components
 * Compares screenshots of UI elements between theme versions
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const puppeteer = require('puppeteer')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch').default

class VisualRegressionTester {
  constructor() {
    this.testDir = path.join(process.cwd(), 'tests', 'visual')
    this.screenshotsDir = path.join(this.testDir, 'screenshots')
    this.baselineDir = path.join(this.testDir, 'baseline')
    this.diffDir = path.join(this.testDir, 'diff')
    this.themePath = path.join(process.cwd(), 'themes', 'tokyo-night-dark-color-theme.json')
  }

  initialize() {
    // Create directories if they don't exist
    [this.testDir, this.screenshotsDir, this.baselineDir, this.diffDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    })
  }

  async runTests() {
    console.log('🎨 Visual Regression Tests')
    console.log('========================\n')

    this.initialize()

    // Check if we have baseline screenshots
    const hasBaseline = fs.existsSync(this.baselineDir) && 
      fs.readdirSync(this.baselineDir).length > 0

    if (!hasBaseline) {
      console.log('No baseline screenshots found. Creating baseline...')
      await this.createBaseline()
      console.log('Baseline created. Please review and commit the baseline screenshots.')
      return
    }

    console.log('Running visual regression tests...\n')

    // Generate new screenshots
    await this.generateScreenshots()

    // Compare with baseline
    const results = this.compareScreenshots()

    // Report results
    this.reportResults(results)

    return results.every(r => r.passed)
  }

  async createBaseline() {
    console.log('Creating baseline screenshots...')
    await this.generateScreenshots()
    
    // Move screenshots to baseline
    const screenshots = fs.readdirSync(this.screenshotsDir)
    screenshots.forEach(screenshot => {
      const src = path.join(this.screenshotsDir, screenshot)
      const dest = path.join(this.baselineDir, screenshot)
      fs.renameSync(src, dest)
    })

    console.log(`Created baseline with ${screenshots.length} screenshots`)
  }

  async generateScreenshots() {
    console.log('Generating screenshots...')
    
    // Launch browser with sandbox disabled for Linux environments
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    try {
      // Generate screenshots for different UI components
      await this.generateEditorScreenshots(browser)
      await this.generateUIComponentScreenshots(browser)
    } finally {
      await browser.close()
    }

    console.log('Screenshots generated')
  }

  async generateEditorScreenshots(browser) {
    // Create a page with code examples to test syntax highlighting
    const page = await browser.newPage()
    
    // Load the theme
    const theme = JSON.parse(fs.readFileSync(this.themePath, 'utf8'))
    
    // Set up a basic editor-like page
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
            border: 1px solid ${theme.colors['editorGroup.border'] || '#1a1b26'};
            border-radius: 4px;
            padding: 10px;
          }
          pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
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
    
    // JavaScript example
    await page.evaluate(() => {
      document.getElementById('code-content').textContent = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(\`Fibonacci of 10 is \${result}\`);

class Calculator {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

const calc = new Calculator();
const sum = calc.add(5, 3);
      `.trim()
    })
    
    await page.screenshot({ 
      path: path.join(this.screenshotsDir, 'editor-syntax-js.png'),
      fullPage: true
    })
    
    // TypeScript example
    await page.evaluate(() => {
      document.getElementById('code-content').textContent = `
interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'guest';

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
  
  getUsersByRole(role: UserRole): User[] {
    // Implementation
    return this.users;
  }
}

const userService = new UserService();
      `.trim()
    })
    
    await page.screenshot({ 
      path: path.join(this.screenshotsDir, 'editor-syntax-ts.png'),
      fullPage: true
    })
    
    // Python example
    await page.evaluate(() => {
      document.getElementById('code-content').textContent = `
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def main():
    result = fibonacci(10)
    print(f"Fibonacci of 10 is {result}")

class Calculator:
    @staticmethod
    def add(a, b):
        return a + b
    
    @staticmethod
    def multiply(a, b):
        return a * b

if __name__ == "__main__":
    calc = Calculator()
    sum_result = calc.add(5, 3)
    main()
      `.trim()
    })
    
    await page.screenshot({ 
      path: path.join(this.screenshotsDir, 'editor-syntax-python.png'),
      fullPage: true
    })
    
    await page.close()
  }

  async generateUIComponentScreenshots(browser) {
    // Load the theme
    const theme = JSON.parse(fs.readFileSync(this.themePath, 'utf8'))
    
    // Create UI component screenshots
    const components = [
      {
        name: 'activity-bar',
        html: `
          <div style="display: flex; height: 100vh; background: ${theme.colors['activityBar.background'] || '#16161e'}">
            <div style="width: 48px; background: ${theme.colors['activityBar.background'] || '#16161e'}; display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
              <div style="width: 36px; height: 36px; background: ${theme.colors['activityBar.activeBackground'] || '#bb9af7'}; border-radius: 4px; margin-bottom: 10px;"></div>
              <div style="width: 36px; height: 36px; background: ${theme.colors['activityBar.inactiveForeground'] || '#a9b1d6'}; border-radius: 4px; margin-bottom: 10px;"></div>
              <div style="width: 36px; height: 36px; background: ${theme.colors['activityBar.inactiveForeground'] || '#a9b1d6'}; border-radius: 4px; margin-bottom: 10px;"></div>
              <div style="width: 36px; height: 36px; background: ${theme.colors['activityBarBadge.background'] || '#bb9af7'}; border-radius: 50%; margin-top: auto; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; color: ${theme.colors['activityBarBadge.foreground'] || '#16161e'}; font-size: 10px;">3</div>
            </div>
          </div>
        `
      },
      {
        name: 'sidebar',
        html: `
          <div style="display: flex; height: 100vh;">
            <div style="width: 48px; background: ${theme.colors['activityBar.background'] || '#16161e'}; display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
              <div style="width: 36px; height: 36px; background: ${theme.colors['activityBar.activeBackground'] || '#bb9af7'}; border-radius: 4px; margin-bottom: 10px;"></div>
            </div>
            <div style="width: 250px; background: ${theme.colors['sideBar.background'] || '#16161e'}; border-right: 1px solid ${theme.colors['sideBar.border'] || '#16161e'}; padding: 10px;">
              <div style="background: ${theme.colors['sideBarSectionHeader.background'] || '#1f202e'}; color: ${theme.colors['sideBarSectionHeader.foreground'] || '#a9b1d6'}; padding: 5px; margin-bottom: 10px; font-size: 12px;">EXPLORER</div>
              <div style="background: ${theme.colors['list.activeSelectionBackground'] || '#363d5e'}; color: ${theme.colors['list.activeSelectionForeground'] || '#ffffff'}; padding: 5px; margin-bottom: 2px; font-size: 13px; border-radius: 3px;">package.json</div>
              <div style="background: ${theme.colors['list.inactiveSelectionBackground'] || '#232433'}; color: ${theme.colors['list.inactiveSelectionForeground'] || '#a9b1d6'}; padding: 5px; margin-bottom: 2px; font-size: 13px; border-radius: 3px;">src</div>
              <div style="color: ${theme.colors['list.inactiveForeground'] || '#86889c'}; padding: 5px; margin-bottom: 2px; font-size: 13px; padding-left: 20px;">index.ts</div>
              <div style="color: ${theme.colors['list.inactiveForeground'] || '#86889c'}; padding: 5px; margin-bottom: 2px; font-size: 13px; padding-left: 20px;">theme.ts</div>
            </div>
          </div>
        `
      },
      {
        name: 'status-bar',
        html: `
          <div style="display: flex; height: 100vh; flex-direction: column;">
            <div style="flex: 1; background: ${theme.colors['editor.background'] || '#1a1b26'};"></div>
            <div style="height: 22px; background: ${theme.colors['statusBar.background'] || '#16161e'}; color: ${theme.colors['statusBar.foreground'] || '#a9b1d6'}; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; font-size: 12px;">
              <div>main</div>
              <div style="display: flex; gap: 10px;">
                <div>UTF-8</div>
                <div>TypeScript</div>
                <div style="background: ${theme.colors['statusBarItem.errorBackground'] || '#bb616b'}; padding: 0 5px; border-radius: 3px;">1</div>
              </div>
            </div>
          </div>
        `
      },
      {
        name: 'tabs',
        html: `
          <div style="display: flex; height: 100vh; flex-direction: column;">
            <div style="height: 35px; background: ${theme.colors['tab.inactiveBackground'] || '#16161e'}; display: flex; border-bottom: 1px solid ${theme.colors['tab.border'] || '#16161e'};">
              <div style="height: 100%; background: ${theme.colors['tab.activeBackground'] || '#1a1b26'}; color: ${theme.colors['tab.activeForeground'] || '#ffffff'}; padding: 0 15px; display: flex; align-items: center; border-right: 1px solid ${theme.colors['tab.border'] || '#16161e'}; border-top: 1px solid ${theme.colors['tab.activeBorder'] || '#bb9af7'}; margin-top: 1px;">
                index.ts
              </div>
              <div style="height: 100%; color: ${theme.colors['tab.inactiveForeground'] || '#a9b1d6'}; padding: 0 15px; display: flex; align-items: center; border-right: 1px solid ${theme.colors['tab.border'] || '#16161e'};">
                theme.ts
              </div>
              <div style="height: 100%; color: ${theme.colors['tab.inactiveForeground'] || '#a9b1d6'}; padding: 0 15px; display: flex; align-items: center; border-right: 1px solid ${theme.colors['tab.border'] || '#16161e'};">
                package.json
              </div>
            </div>
            <div style="flex: 1; background: ${theme.colors['editor.background'] || '#1a1b26'};"></div>
          </div>
        `
      },
      {
        name: 'terminal',
        html: `
          <div style="height: 100vh; background: ${theme.colors['terminal.background'] || '#1a1b26'}; padding: 10px; font-family: 'Monaco', 'Consolas', monospace; font-size: 14px;">
            <div style="color: ${theme.colors['terminal.foreground'] || '#a9b1d6'};">
              <div><span style="color: ${theme.colors['terminal.ansiBlue'] || '#7aa2f7'};">user@machine</span>:<span style="color: ${theme.colors['terminal.ansiGreen'] || '#9ece6a'};">~</span>$ ls -la</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">total 24</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">drwxr-xr-x  4 user  staff   128 Aug 10 10:00 .</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">drwxr-xr-x  8 user  staff   256 Aug 10 09:30 ..</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">-rw-r--r--  1 user  staff  1024 Aug 10 10:00 package.json</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">drwxr-xr-x  3 user  staff    96 Aug 10 09:45 src</div>
              <div style="color: ${theme.colors['terminal.ansiCyan'] || '#7dcfff'};">drwxr-xr-x  2 user  staff    64 Aug 10 09:35 themes</div>
              <div><span style="color: ${theme.colors['terminal.ansiBlue'] || '#7aa2f7'};">user@machine</span>:<span style="color: ${theme.colors['terminal.ansiGreen'] || '#9ece6a'};">~</span>$ </div>
            </div>
          </div>
        `
      },
      {
        name: 'button-primary',
        html: `
          <div style="height: 100vh; background: ${theme.colors['editor.background'] || '#1a1b26'}; display: flex; align-items: center; justify-content: center;">
            <button style="background: ${theme.colors['button.background'] || '#bb9af7'}; color: ${theme.colors['button.foreground'] || '#16161e'}; border: none; padding: 8px 16px; border-radius: 2px; font-size: 13px; cursor: pointer;">
              Primary Button
            </button>
          </div>
        `
      },
      {
        name: 'button-secondary',
        html: `
          <div style="height: 100vh; background: ${theme.colors['editor.background'] || '#1a1b26'}; display: flex; align-items: center; justify-content: center;">
            <button style="background: ${theme.colors['button.secondaryBackground'] || '#1f202e'}; color: ${theme.colors['button.secondaryForeground'] || '#a9b1d6'}; border: 1px solid ${theme.colors['button.border'] || '#363d5e'}; padding: 8px 16px; border-radius: 2px; font-size: 13px; cursor: pointer;">
              Secondary Button
            </button>
          </div>
        `
      },
      {
        name: 'input-field',
        html: `
          <div style="height: 100vh; background: ${theme.colors['editor.background'] || '#1a1b26'}; display: flex; align-items: center; justify-content: center;">
            <input type="text" value="Input text" style="background: ${theme.colors['input.background'] || '#1f202e'}; color: ${theme.colors['input.foreground'] || '#a9b1d6'}; border: 1px solid ${theme.colors['input.border'] || '#363d5e'}; padding: 6px 10px; border-radius: 2px; font-size: 13px; width: 200px;">
          </div>
        `
      },
      {
        name: 'list-item',
        html: `
          <div style="height: 100vh; background: ${theme.colors['editor.background'] || '#1a1b26'}; padding: 20px;">
            <div style="background: ${theme.colors['list.activeSelectionBackground'] || '#363d5e'}; color: ${theme.colors['list.activeSelectionForeground'] || '#ffffff'}; padding: 8px; margin-bottom: 2px; border-radius: 3px;">
              Selected Item
            </div>
            <div style="background: ${theme.colors['list.inactiveSelectionBackground'] || '#232433'}; color: ${theme.colors['list.inactiveSelectionForeground'] || '#a9b1d6'}; padding: 8px; margin-bottom: 2px; border-radius: 3px;">
              Inactive Selected Item
            </div>
            <div style="background: ${theme.colors['list.hoverBackground'] || '#1f202e'}; color: ${theme.colors['list.hoverForeground'] || '#a9b1d6'}; padding: 8px; margin-bottom: 2px; border-radius: 3px;">
              Hovered Item
            </div>
            <div style="color: ${theme.colors['list.inactiveForeground'] || '#86889c'}; padding: 8px; margin-bottom: 2px;">
              Normal Item
            </div>
          </div>
        `
      }
    ]

    for (const component of components) {
      const page = await browser.newPage()
      await page.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          ${component.html}
        </body>
        </html>
      `)
      
      await page.screenshot({ 
        path: path.join(this.screenshotsDir, `${component.name}.png`),
        fullPage: true
      })
      
      await page.close()
    }
  }

  compareScreenshots() {
    console.log('Comparing screenshots...')
    
    const baselineScreenshots = fs.readdirSync(this.baselineDir)
    const results = []

    baselineScreenshots.forEach(screenshot => {
      const baselinePath = path.join(this.baselineDir, screenshot)
      const currentPath = path.join(this.screenshotsDir, screenshot)
      const diffPath = path.join(this.diffDir, `diff-${screenshot}`)

      // Check if current screenshot exists
      if (!fs.existsSync(currentPath)) {
        results.push({
          component: path.basename(screenshot, '.png'),
          passed: false,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          error: 'Missing current screenshot'
        })
        return
      }

      // Compare images
      try {
        const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath))
        const currentImg = PNG.sync.read(fs.readFileSync(currentPath))
        
        // Create diff image
        const { width, height } = baselineImg
        const diff = new PNG({ width, height })
        
        const numDiffPixels = pixelmatch(
          baselineImg.data,
          currentImg.data,
          diff.data,
          width,
          height,
          { threshold: 0.1 }
        )
        
        const passed = numDiffPixels === 0
        
        // Save diff image if there are differences
        if (!passed) {
          fs.writeFileSync(diffPath, PNG.sync.write(diff))
        }
        
        results.push({
          component: path.basename(screenshot, '.png'),
          passed,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          diffPixels: numDiffPixels
        })
      } catch (error) {
        results.push({
          component: path.basename(screenshot, '.png'),
          passed: false,
          baseline: baselinePath,
          current: currentPath,
          diff: diffPath,
          error: error.message
        })
      }
    })

    return results
  }

  reportResults(results) {
    console.log('\n📊 Test Results')
    console.log('==============')

    let passed = 0
    let failed = 0

    results.forEach(result => {
      if (result.passed) {
        console.log(`✅ ${result.component}`)
        passed++
      } else {
        if (result.error) {
          console.log(`❌ ${result.component} (${result.error})`)
        } else if (result.diffPixels !== undefined) {
          console.log(`❌ ${result.component} (${result.diffPixels} different pixels)`)
        } else {
          console.log(`❌ ${result.component} (missing screenshot)`)
        }
        failed++
      }
    })

    console.log(`\n📈 Summary: ${passed} passed, ${failed} failed`)

    if (failed > 0) {
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
  main().catch(error => {
    console.error(error)
    process.exit(1)
  })
}

module.exports = { VisualRegressionTester }