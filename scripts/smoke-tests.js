#!/usr/bin/env node

/**
 * Smoke Tests for Deployment Validation
 * 
 * These tests verify that the deployed application is working correctly
 * by checking critical endpoints and functionality.
 */

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  baseUrl: process.env.SMOKE_TEST_URL || 'https://himanshu31shr.github.io/flipkart-amazon-tools',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 5000 // 5 seconds
};

class SmokeTestRunner {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async runTests() {
    console.log('🚀 Starting Smoke Tests...');
    console.log(`🎯 Target URL: ${config.baseUrl}`);
    console.log('');

    try {
      // Test Suite
      await this.testHealthEndpoint();
      await this.testMainApplication();
      await this.testLoginPage();
      await this.testStaticAssets();
      
      // Summary
      this.printSummary();
      
      // Exit with appropriate code
      const failed = this.results.filter(r => !r.passed).length;
      process.exit(failed > 0 ? 1 : 0);
      
    } catch (error) {
      console.error('💥 Smoke tests failed with error:', error.message);
      process.exit(1);
    }
  }

  async testHealthEndpoint() {
    await this.runTest('Health Check Endpoint', async () => {
      const response = await this.makeRequest(`${config.baseUrl}/health`);
      
      if (response.statusCode !== 200) {
        throw new Error(`Health endpoint returned ${response.statusCode}`);
      }
      
      // Check if it's a proper HTML page (React app)
      if (!response.body.includes('Application Health Status')) {
        console.warn('⚠️  Health endpoint loaded but may not contain expected content');
      }
      
      return {
        statusCode: response.statusCode,
        responseTime: response.responseTime,
        size: response.body.length
      };
    });
  }

  async testMainApplication() {
    await this.runTest('Main Application', async () => {
      const response = await this.makeRequest(config.baseUrl);
      
      if (response.statusCode !== 200) {
        throw new Error(`Main app returned ${response.statusCode}`);
      }
      
      // Check for React app indicators
      const requiredElements = ['<div id="root">', 'react', 'Sacred Sutra Tools'];
      const missingElements = requiredElements.filter(element => 
        !response.body.toLowerCase().includes(element.toLowerCase())
      );
      
      if (missingElements.length > 0) {
        console.warn(`⚠️  Missing elements: ${missingElements.join(', ')}`);
      }
      
      return {
        statusCode: response.statusCode,
        responseTime: response.responseTime,
        size: response.body.length,
        hasReactRoot: response.body.includes('<div id="root">'),
        hasExpectedContent: missingElements.length === 0
      };
    });
  }

  async testLoginPage() {
    await this.runTest('Login Page', async () => {
      const response = await this.makeRequest(`${config.baseUrl}/login`);
      
      if (response.statusCode !== 200) {
        throw new Error(`Login page returned ${response.statusCode}`);
      }
      
      return {
        statusCode: response.statusCode,
        responseTime: response.responseTime,
        size: response.body.length
      };
    });
  }

  async testStaticAssets() {
    await this.runTest('Static Assets', async () => {
      const assetTests = [
        { path: '/manifest.webmanifest', type: 'manifest' },
        { path: '/favicon-32x32.png', type: 'favicon' }
      ];
      
      const results = {};
      
      for (const asset of assetTests) {
        try {
          const response = await this.makeRequest(`${config.baseUrl}${asset.path}`);
          results[asset.type] = {
            available: response.statusCode === 200,
            statusCode: response.statusCode,
            size: response.body.length
          };
        } catch (error) {
          results[asset.type] = {
            available: false,
            error: error.message
          };
        }
      }
      
      return results;
    });
  }

  async runTest(testName, testFunction) {
    console.log(`🧪 Testing: ${testName}`);
    
    let attempt = 0;
    let lastError;
    
    while (attempt < config.retries) {
      try {
        const startTime = Date.now();
        const result = await testFunction();
        const duration = Date.now() - startTime;
        
        console.log(`✅ ${testName} - PASSED (${duration}ms)`);
        if (result) {
          console.log(`   📊 Results:`, JSON.stringify(result, null, 2));
        }
        
        this.results.push({
          name: testName,
          passed: true,
          duration,
          result,
          attempt: attempt + 1
        });
        
        return;
        
      } catch (error) {
        lastError = error;
        attempt++;
        
        if (attempt < config.retries) {
          console.log(`⚠️  ${testName} - Attempt ${attempt} failed: ${error.message}`);
          console.log(`🔄 Retrying in ${config.retryDelay}ms...`);
          await this.sleep(config.retryDelay);
        }
      }
    }
    
    console.log(`❌ ${testName} - FAILED after ${config.retries} attempts`);
    console.log(`   Error: ${lastError.message}`);
    
    this.results.push({
      name: testName,
      passed: false,
      error: lastError.message,
      attempts: config.retries
    });
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        timeout: config.timeout,
        headers: {
          'User-Agent': 'Sacred-Sutra-Tools-Smoke-Test/1.0',
          ...options.headers
        }
      };
      
      const req = client.request(requestOptions, (res) => {
        let body = '';
        
        res.on('data', (chunk) => {
          body += chunk;
        });
        
        res.on('end', () => {
          const responseTime = Date.now() - startTime;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
            responseTime
          });
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Request timeout after ${config.timeout}ms`));
      });
      
      req.end();
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  printSummary() {
    const totalTime = Date.now() - this.startTime;
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    
    console.log('');
    console.log('📊 SMOKE TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏱️  Total Time: ${totalTime}ms`);
    console.log(`🎯 Target: ${config.baseUrl}`);
    
    if (failed === 0) {
      console.log('');
      console.log('🎉 All smoke tests passed! Deployment is healthy.');
    } else {
      console.log('');
      console.log('💥 Some smoke tests failed. Deployment may have issues.');
      
      console.log('');
      console.log('📝 Failed Tests:');
      this.results
        .filter(r => !r.passed)
        .forEach(result => {
          console.log(`   ❌ ${result.name}: ${result.error}`);
        });
    }
    
    console.log('');
  }
}

// Run smoke tests if this script is called directly
if (require.main === module) {
  const runner = new SmokeTestRunner();
  runner.runTests().catch(error => {
    console.error('Smoke test runner failed:', error);
    process.exit(1);
  });
}

module.exports = SmokeTestRunner; 