import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import App from './App';
import config from './config';
import { reportWebVitals } from './reportWebVitals';
import './index.css';

// Initialize Sentry (only in production)
if (config.isProduction && config.sentryDsn) {
  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.environment,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions (adjust in production)
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    beforeSend(event) {
      // Filter out non-error events if needed
      return event;
    },
  });
}

// Track Web Vitals
reportWebVitals((metric) => {
  // Send to analytics endpoint or console
  if (config.debug) {
    console.log(metric);
  }

  // Send to Sentry as measurement
  if (config.isProduction && config.sentryDsn) {
    Sentry.setMeasurement(metric.name, metric.value, metric.unit);
  }

  // Or send to Google Analytics
  // gtag('event', metric.name, {
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_category: 'Web Vitals',
  //   event_label: metric.id,
  //   non_interaction: true,
  // });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

