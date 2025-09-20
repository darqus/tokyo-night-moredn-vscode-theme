export type ReleaseType = 'patch' | 'minor' | 'major'

/**
 * Compute next semantic version using current base version, selected release type,
 * number of commits since last release, and prerelease flag.
 *
 * Rules:
 * - count = max(commitCount, 1)
 * - major → major+1, minor=0, patch=count
 * - minor → minor+1, patch=count
 * - patch → patch += count
 * - prerelease → append -beta.<count>
 */
export function computeVersion(
  currentVersion: string,
  releaseType: ReleaseType,
  commitCount: number,
  prerelease: boolean
): string {
  const base = currentVersion.split('-')[0]
  const [majS, minS, patS] = base.split('.')
  let major = parseInt(majS || '0', 10) || 0
  let minor = parseInt(minS || '0', 10) || 0
  let patch = parseInt(patS || '0', 10) || 0

  const count = Math.max(commitCount, 1)

  switch (releaseType) {
    case 'major':
      major += 1
      minor = 0
      patch = count
      break
    case 'minor':
      minor += 1
      patch = count
      break
    case 'patch':
    default:
      patch += count
      break
  }

  const next = `${major}.${minor}.${patch}`
  return prerelease ? `${next}-beta.${count}` : next
}
