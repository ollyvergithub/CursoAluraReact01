import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Versão antiga não roda
//import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {BrowserRouter} from "react-router-dom";

// Meus Componentes
import AutorBox from './componentes/AutorBox'
import Home from './Home';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
