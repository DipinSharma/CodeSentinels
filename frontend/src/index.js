import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Assuming Tailwind CSS is in index.css
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './Context';
import { AuthContextProvider } from './shared/context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <AuthContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthContextProvider>
    </ContextProvider>
  </BrowserRouter>
);
