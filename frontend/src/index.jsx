import React from 'react'
import { createRoot } from 'react-dom/client'
import {  applyMiddleware ,createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'

import App from './main/app'
import Reducers from './main/reducers'

const container = document.getElementById('root');
const root = createRoot(container);

const store = applyMiddleware(promise)(createStore)(Reducers);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
