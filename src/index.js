import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/gdinfo/css/overall-b.css';
import GDRoot from './component/gdinfo/GDRoot';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<GDRoot />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
