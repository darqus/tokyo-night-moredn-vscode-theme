import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  AdaptiveThemeGenerator,
} from './adaptive-theme-generator';
import type { ThemeObject } from '../types/theme';

/**
 * Integration module for generating and exporting themes
 */
export class ThemeGenerator {
  private outputDir: string;

  constructor(outputDir: string = './themes') {
    this.outputDir = outputDir;
    this.ensureOutputDir();
  }

  private ensureOutputDir(): void {
    try {
      mkdirSync(this.outputDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  /**
   * Generates all preset theme variants
   */
  generateAllVariants(): void {
    // No variants to generate
  }

  /**
   * Saves the theme to a file
   */
  private saveTheme(theme: ThemeObject): void {
    const filename = `${theme.name
      .replace(/\s+/g, '-')
      .toLowerCase()}-color-theme.json`;
    const filepath = join(this.outputDir, filename);

    writeFileSync(filepath, JSON.stringify(theme, null, 2));
  }

  /**
   * Runs the full generation of all themes
   */
  generateAll(): void {
    console.log('🚀 No variants to generate...');
  }
}

/**
 * CLI interface for the generator
 */
export function runThemeGenerator(): void {
    console.log(`
Tokyo Night Theme Generator - No variants

Использование:
  This script no longer generates theme variants.
    `);
}

// If the module is run directly
if (require.main === module) {
  runThemeGenerator();
}