import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/fonts.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster />
            <App />
        </Provider>
    </React.StrictMode>,
);
