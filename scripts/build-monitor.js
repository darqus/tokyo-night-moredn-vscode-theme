#!/usr/bin/env node

/**
 * Build performance monitoring tool
 * Tracks build times and resource usage
 */

const fs = require('fs')
const path = require('path')

class BuildPerformanceMonitor {
  constructor() {
    this.startTime = null
    this.startMemory = null
    this.metrics = []
  }

  start() {
    this.startTime = process.hrtime.bigint()
    this.startMemory = process.memoryUsage()
    console.log('⏱️  Starting build performance monitoring...')
  }

  end() {
    if (!this.startTime) {
      console.warn('Build performance monitoring was not started')
      return
    }

    const endTime = process.hrtime.bigint()
    const endMemory = process.memoryUsage()
    
    const buildTime = Number(endTime - this.startTime) / 1000000 // Convert to milliseconds
    const memoryUsed = endMemory.heapUsed - this.startMemory.heapUsed
    
    const metrics = {
      timestamp: new Date().toISOString(),
      buildTimeMs: buildTime,
      memoryUsedBytes: memoryUsed,
      memoryUsedMB: (memoryUsed / 1024 / 1024).toFixed(2)
    }
    
    this.metrics.push(metrics)
    
    console.log(`\n📊 Build Performance Metrics:`)
    console.log(`   Build Time: ${buildTime.toFixed(2)}ms`)
    console.log(`   Memory Used: ${metrics.memoryUsedMB}MB`)
    
    // Save metrics to file
    this.saveMetrics(metrics)
    
    return metrics
  }

  saveMetrics(metrics) {
    const metricsFile = path.join(process.cwd(), 'build-metrics.json')
    let existingMetrics = []
    
    // Load existing metrics if file exists
    if (fs.existsSync(metricsFile)) {
      try {
        const content = fs.readFileSync(metricsFile, 'utf8')
        existingMetrics = JSON.parse(content)
      } catch (error) {
        console.warn('Could not read existing metrics file:', error.message)
      }
    }
    
    // Add new metrics
    existingMetrics.push(metrics)
    
    // Keep only last 50 metrics
    if (existingMetrics.length > 50) {
      existingMetrics = existingMetrics.slice(-50)
    }
    
    // Save metrics
    try {
      fs.writeFileSync(metricsFile, JSON.stringify(existingMetrics, null, 2))
      console.log(`   Metrics saved to ${metricsFile}`)
    } catch (error) {
      console.warn('Could not save metrics file:', error.message)
    }
  }

  getAverageMetrics() {
    const metricsFile = path.join(process.cwd(), 'build-metrics.json')
    
    if (!fs.existsSync(metricsFile)) {
      return null
    }
    
    try {
      const content = fs.readFileSync(metricsFile, 'utf8')
      const metrics = JSON.parse(content)
      
      if (metrics.length === 0) {
        return null
      }
      
      const avgBuildTime = metrics.reduce((sum, m) => sum + m.buildTimeMs, 0) / metrics.length
      const avgMemory = metrics.reduce((sum, m) => sum + m.memoryUsedBytes, 0) / metrics.length
      
      return {
        averageBuildTimeMs: avgBuildTime,
        averageMemoryUsedMB: (avgMemory / 1024 / 1024).toFixed(2)
      }
    } catch (error) {
      console.warn('Could not read metrics file:', error.message)
      return null
    }
  }
}

module.exports = { BuildPerformanceMonitor }