import ReactDOM from 'react-dom/client';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { Provider } from 'react-redux';

import store from '@store/.';

import App from './App';

import './index.scss';

const apiKey = process.env.REACT_APP_API_KEY || '';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <FpjsProvider
    loadOptions={{
      apiKey,
      region: 'eu',
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </FpjsProvider>
);
