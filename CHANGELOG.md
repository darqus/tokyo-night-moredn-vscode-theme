# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.14.13](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.14.12...v1.14.13) (2025-09-03)


### Bug Fixes

* **version:** correct version number in CHANGELOG and package-lock ([fd8b7ad](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/fd8b7addf12a4f75c367353a703483731b6f1c66))

### [1.14.12](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.14.10...v1.14.12) (2025-09-03)

### [1.14.6](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.14.3...v1.14.6) (2025-09-02)

### [1.14.4](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.14.1...v1.14.4) (2025-09-02)

### [1.14.2](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.13.0...v1.14.2) (2025-09-02)

## [1.14.0](https://github.com/darqus/tokyo-night-vscode-theme-lod/compare/v1.11.0...v1.14.0) (2025-09-02)


### Features

* Implement placeholder color analysis and optimization plan ([e7d8da0](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/e7d8da0b69f8e690e269a17c935c6c71333704f8))
* **release:** add automated release script ([04e323c](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/04e323c35eb7c8b05972f9a1314b3ffa9ca26288))
* **theme:** add SCM Graph colors and other improvements ([9e59e4e](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/9e59e4efee601b76da41c4177a871f98c8473a10))
* **theme:** add semantic token colors to One Monokai theme ([e527bcf](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/e527bcffd74d8f157114e4a6227cb721a192ceb5))
* **theme:** add Tokyo Night Dark theme for VS Code ([a6c2fd4](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/a6c2fd4796cab91530f4820df36f3616087b048b))


### Bug Fixes

* improve light theme contrast and accessibility ([8cece28](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/8cece284cc570d514b5c5f9862bf9a4c61469b51)), closes [#c0caf5](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/c0caf5) [#1f2328](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/1f2328) [#a9b1d6](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/a9b1d6) [#1f2328](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/1f2328) [#3d4752](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/3d4752) [#d1d5](https://github.com/darqus/tokyo-night-vscode-theme-lod/issues/d1d5)
* **release:** modify release script and update package.json ([9dc2089](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/9dc20892a905e9a0f5c9abc996a3d9e1cabbc609))
* **scripts:** handle undefined return value in execSync ([25fb44f](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/25fb44f7463429b8ff8f437a07510690f2427bc7))
* **scripts:** improve error handling in release script ([0c400a7](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/0c400a7f136f317e4e1a69b08ce1c5ca92b9f52d))
* **theme:** resolve validation issues and update deprecated properties ([0a743ae](https://github.com/darqus/tokyo-night-vscode-theme-lod/commit/0a743aef7fef2baf580ca50a522a7e0666179681))

## [1.12.0] - 2025-01-02

### 🧹 Cleanup & Optimization
- **BREAKING**: Removed legacy build system and scripts
- **BREAKING**: Simplified package.json scripts
- Removed outdated analysis files and reports
- Cleaned up development dependencies
- Streamlined project structure

### 📚 Documentation
- Updated architecture documentation
- Refreshed development guide
- Simplified README structure
- Removed obsolete documentation files

### 🔧 Technical Improvements
- Consolidated build process to single `src/build.ts`
- Removed redundant validation and testing scripts
- Optimized project structure for maintainability
- Kept core functionality: palette system, theme generation, CLI tools

### 🎯 Focus Areas
- Maintained 17 theme variants generation
- Preserved adaptive palette system
- Kept zero hardcoded colors architecture
- Retained CLI tools for custom themes

## [1.11.0] - Previous Release
- Full adaptive palette system implementation
- 17 theme variants with seasonal and accessibility options
- Zero hardcoded colors migration completed
- Comprehensive CLI tools for theme customization