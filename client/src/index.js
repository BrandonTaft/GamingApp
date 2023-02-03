import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Register from './pages/Register';
import BaseLayout from './components/BaseLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<App />} />
          </Routes>
        </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
reportWebVitals();
