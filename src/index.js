import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter basename="/carteira_cambio">
      <Provider store={ store }>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
