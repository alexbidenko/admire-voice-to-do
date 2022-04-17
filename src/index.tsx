import {DeviceThemeProvider, SSRProvider} from '@sberdevices/plasma-ui';
import {GlobalStyle} from './components/GlobalStyle';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
    <DeviceThemeProvider>
      <SSRProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <GlobalStyle />
      </SSRProvider>
    </DeviceThemeProvider>,
    document.getElementById('root'),
);

reportWebVitals();
