import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './data/store'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import './css/index.css'

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>, 
    document.getElementById('root'));

