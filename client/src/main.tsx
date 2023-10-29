import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/fonts.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster position='top-right' className='mt-12 xs:mt-10 z-40' closeButton duration={5000} />
            <App />
        </Provider>
    </React.StrictMode>,
);
