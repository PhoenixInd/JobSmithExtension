import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Auth from './pages/Auth/Auth';
import './index.css';
import Home from '@pages/Home/Home';
import Profile from '@pages/Profile/Profile';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);