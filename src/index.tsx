import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/gdinfo/css/overall-b.css';
import GDRoot from './component/GDRoot';
//import {Provider} from 'react-redux';
//import {PersistGate} from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';
//import configureStore from './component/gdinfo/Redux/store';

//const {store, persistor} = configureStore();
/*configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true,
});*/
// localStorage의 경우 JSON.stringify 때문에 cost가 늘어남
// 이를 방지하기 위해 lodash 라는 라이브러리의 throttle 콜백을 사용해
// 메소드를 부르는 비중을 줄일 수 있음

// react-redux를 쓰지 않으면 각 하위 컴포넌트에 props 형태로
// store를 모두 보내주어야 하지만
// react-redux를 쓰면 Provider에만 넣으면 해결됨
ReactDOM.render(
    <React.StrictMode>
        <GDRoot />
    </React.StrictMode>
    /*<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GDRoot />
        </PersistGate>
    </Provider>*/,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
