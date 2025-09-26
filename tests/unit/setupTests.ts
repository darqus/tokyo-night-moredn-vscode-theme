// Global Jest setup: silence console.log/warn in tests (except errors)
const originalConsole = {
  log: console.log,
  warn: console.warn
}

beforeAll(() => {
  try {
    if (process.env.VERBOSE_TESTS === '1') return
    console.log = (..._args: any[]) => {}
    console.warn = (..._args: any[]) => {}
  } catch (error) {
    console.error('Failed to setup console mocking:', error)
  }
})

afterAll(() => {
  try {
    console.log = originalConsole.log
    console.warn = originalConsole.warn
  } catch (error) {
    console.error('Failed to restore console methods:', error)
  }
})
