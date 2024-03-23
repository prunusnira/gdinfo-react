import FullPageLoading from '@/component/loading/fullPageLoading';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import App from './module/App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<FullPageLoading full={true} />}>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
