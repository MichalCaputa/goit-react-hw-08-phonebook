import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { Store, persistor } from './redux/Store.js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={'/goit-react-hw-08-phonebook'}>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
