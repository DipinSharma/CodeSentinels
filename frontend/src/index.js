import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Assuming Tailwind CSS is in index.css

import { StateProvider } from './context/stateContext';
import { initialState } from './context/stateReducers';
import { reducer } from './context/stateReducers';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ContextProvider>
    </StateProvider>
  </BrowserRouter>
);
