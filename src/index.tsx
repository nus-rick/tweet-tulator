import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Login from './pages/login';
import Messages from './pages/messages';

import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/messages" element={<Messages />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
