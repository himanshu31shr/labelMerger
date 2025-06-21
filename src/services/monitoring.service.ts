/**
 * Monitoring Service
 * 
 * Provides comprehensive monitoring capabilities including:
 * - Error tracking and reporting
 * - Performance monitoring
 * - User analytics
 * - Custom metrics collection
 */

export interface ErrorReport {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  tags: Record<string, string>;
  context: Record<string, unknown>;
}

export interface PerformanceMetrics {
  id: string;
  timestamp: string;
  sessionId: string;
  metrics: {
    // Navigation Timing
    pageLoadTime: number;
    domContentLoadedTime: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    firstInputDelay?: number;
    cumulativeLayoutShift?: number;
    
    // Custom Metrics
    timeToInteractive?: number;
    resourceLoadTime: number;
    apiResponseTime: number;
  };
  userAgent: string;
  url: string;
}

export interface UserAnalytics {
  sessionId: string;
  userId?: string;
  timestamp: string;
  event: string;
  properties: Record<string, unknown>;
  page: string;
  userAgent: string;
}

class MonitoringService {
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceMetrics[] = [];
  private analyticsQueue: UserAnalytics[] = [];
  private flushInterval: number = 30000; // 30 seconds
  private maxQueueSize: number = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = this.shouldEnableMonitoring();
    
    if (this.isEnabled) {
      this.initializeMonitoring();
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private shouldEnableMonitoring(): boolean {
    // Enable monitoring in production and staging environments
    const hostname = window.location.hostname;
    return hostname.includes('github.io') || 
           hostname.includes('netlify.app') || 
           hostname.includes('vercel.app') ||
           process.env.NODE_ENV === 'production';
  }

  private initializeMonitoring(): void {
    // Global error handling
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href
      });
    });

    // Performance monitoring
    this.initializePerformanceMonitoring();

    // Periodic data flushing
    setInterval(() => {
      this.flushData();
    }, this.flushInterval);

    // Flush data before page unload
    window.addEventListener('beforeunload', () => {
      this.flushData();
    });
  }

  private initializePerformanceMonitoring(): void {
    // Monitor navigation timing
    if (performance.timing) {
      setTimeout(() => {
        this.capturePerformanceMetrics();
      }, 2000); // Wait for page to stabilize
    }

    // Monitor Core Web Vitals
    this.observeWebVitals();
  }

  private observeWebVitals(): void {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              this.trackCustomMetric('first_contentful_paint', entry.startTime);
            }
          });
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.trackCustomMetric('largest_contentful_paint', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEventTiming;
            this.trackCustomMetric('first_input_delay', fidEntry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

      } catch (error) {
        console.warn('Performance Observer not fully supported:', error);
      }
    }
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public captureError(error: {
    message: string;
    stack?: string;
    url?: string;
    line?: number;
    column?: number;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    tags?: Record<string, string>;
    context?: Record<string, unknown>;
  }): void {
    if (!this.isEnabled) return;

    const errorReport: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      url: error.url || window.location.href,
      userAgent: navigator.userAgent,
      userId: this.userId,
      sessionId: this.sessionId,
      severity: error.severity || 'medium',
      tags: {
        ...error.tags,
        line: error.line?.toString() || '',
        column: error.column?.toString() || ''
      },
      context: {
        ...error.context,
        timestamp: Date.now(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    this.errorQueue.push(errorReport);
    
    // Immediate flush for critical errors
    if (error.severity === 'critical') {
      this.flushErrors();
    }

    // Limit queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }
  }

  public capturePerformanceMetrics(): void {
    if (!this.isEnabled || !performance.timing) return;

    const timing = performance.timing;
    
    const metrics: PerformanceMetrics = {
      id: `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      metrics: {
        pageLoadTime: timing.loadEventEnd - timing.navigationStart,
        domContentLoadedTime: timing.domContentLoadedEventEnd - timing.navigationStart,
        resourceLoadTime: timing.loadEventEnd - timing.domContentLoadedEventEnd,
        apiResponseTime: 0 // This would be measured separately for API calls
      },
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.performanceQueue.push(metrics);

    // Limit queue size
    if (this.performanceQueue.length > this.maxQueueSize) {
      this.performanceQueue = this.performanceQueue.slice(-this.maxQueueSize);
    }
  }

  public trackEvent(event: string, properties?: Record<string, unknown>): void {
    if (!this.isEnabled) return;

    const analytics: UserAnalytics = {
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      event,
      properties: properties || {},
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };

    this.analyticsQueue.push(analytics);

    // Limit queue size
    if (this.analyticsQueue.length > this.maxQueueSize) {
      this.analyticsQueue = this.analyticsQueue.slice(-this.maxQueueSize);
    }
  }

  public trackCustomMetric(name: string, value: number, tags?: Record<string, string>): void {
    this.trackEvent('custom_metric', {
      metric_name: name,
      metric_value: value,
      tags: tags || {}
    });
  }

  private async flushData(): Promise<void> {
    await Promise.all([
      this.flushErrors(),
      this.flushPerformanceMetrics(),
      this.flushAnalytics()
    ]);
  }

  private async flushErrors(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    try {
      // In a real implementation, send to monitoring service
      console.warn('Monitoring: Flushing errors:', errors);
      
      // For demo purposes, we'll store in localStorage
      const existingErrors = JSON.parse(localStorage.getItem('monitoring_errors') || '[]');
      const updatedErrors = [...existingErrors, ...errors].slice(-1000); // Keep last 1000 errors
      localStorage.setItem('monitoring_errors', JSON.stringify(updatedErrors));
      
    } catch (error) {
      console.error('Failed to flush errors:', error);
      // Re-add errors to queue for retry
      this.errorQueue.unshift(...errors);
    }
  }

  private async flushPerformanceMetrics(): Promise<void> {
    if (this.performanceQueue.length === 0) return;

    const metrics = [...this.performanceQueue];
    this.performanceQueue = [];

    try {
      console.info('Monitoring: Flushing performance metrics:', metrics);
      
      const existingMetrics = JSON.parse(localStorage.getItem('monitoring_performance') || '[]');
      const updatedMetrics = [...existingMetrics, ...metrics].slice(-500); // Keep last 500 metrics
      localStorage.setItem('monitoring_performance', JSON.stringify(updatedMetrics));
      
    } catch (error) {
      console.error('Failed to flush performance metrics:', error);
      this.performanceQueue.unshift(...metrics);
    }
  }

  private async flushAnalytics(): Promise<void> {
    if (this.analyticsQueue.length === 0) return;

    const analytics = [...this.analyticsQueue];
    this.analyticsQueue = [];

    try {
      console.info('Monitoring: Flushing analytics:', analytics);
      
      const existingAnalytics = JSON.parse(localStorage.getItem('monitoring_analytics') || '[]');
      const updatedAnalytics = [...existingAnalytics, ...analytics].slice(-1000); // Keep last 1000 events
      localStorage.setItem('monitoring_analytics', JSON.stringify(updatedAnalytics));
      
    } catch (error) {
      console.error('Failed to flush analytics:', error);
      this.analyticsQueue.unshift(...analytics);
    }
  }

  public getStoredErrors(): ErrorReport[] {
    try {
      return JSON.parse(localStorage.getItem('monitoring_errors') || '[]');
    } catch {
      return [];
    }
  }

  public getStoredPerformanceMetrics(): PerformanceMetrics[] {
    try {
      return JSON.parse(localStorage.getItem('monitoring_performance') || '[]');
    } catch {
      return [];
    }
  }

  public getStoredAnalytics(): UserAnalytics[] {
    try {
      return JSON.parse(localStorage.getItem('monitoring_analytics') || '[]');
    } catch {
      return [];
    }
  }

  public clearStoredData(): void {
    localStorage.removeItem('monitoring_errors');
    localStorage.removeItem('monitoring_performance');
    localStorage.removeItem('monitoring_analytics');
  }
}

// Singleton instance
const monitoringService = new MonitoringService();

export default monitoringService; 