// Global Jest setup: silence console.log/warn in tests (except errors)
const originalLog = console.log
const originalWarn = console.warn

beforeAll(() => {
  if (process.env.VERBOSE_TESTS === '1') return
  console.log = (..._args: any[]) => {}
  console.warn = (..._args: any[]) => {}
})

afterAll(() => {
  console.log = originalLog
  console.warn = originalWarn
})
