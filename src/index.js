import React from 'react';
import ReactDOM from 'react-dom';

// Sentry error tracking
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import './assets/styles/index.css';
import App from './App';

Sentry.init({
  dsn: "https://f11e2b21bec44d2a8985388511ba4c26@o643198.ingest.sentry.io/5758031",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);