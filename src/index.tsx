import FullPageLoading from '@/component/loading/fullPageLoading';
import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import App from './module/App';
import './index.css';

const container = document.getElementById('root');
if(container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <Suspense fallback={<FullPageLoading full={true} />}>
                <App />
            </Suspense>
        </React.StrictMode>,
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
