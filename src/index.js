import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';

import { userActions } from './redux/actions';
import store from './redux/store';

import './styles/index.scss';
import "emoji-mart/css/emoji-mart.css"

store.dispatch(userActions.fetchUserData())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


