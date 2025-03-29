import React from 'react'
import { createRoot } from 'react-dom/client'
import {  applyMiddleware ,createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'

import App from './main/app'
import Reducers from './main/reducers'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__();
const container = document.getElementById('root');
const root = createRoot(container);
const store = applyMiddleware(promise)(createStore)(Reducers, devTools);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
