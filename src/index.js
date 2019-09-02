import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/gdinfo/css/overall-b.css';
import GDRoot from './component/gdinfo/GDRoot';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import TokenApp from './component/gdinfo/Redux/reducer';

const store = createStore(TokenApp);

// 스토어의 변화를 갑지해서 현재 값을 출력해보기
store.subscribe(() => {
    console.log("State changed: " + store.getState());
});

// react-redux를 쓰지 않으면 각 하위 컴포넌트에 props 형태로
// store를 모두 보내주어야 하지만
// react-redux를 쓰면 Provider에만 넣으면 해결됨
ReactDOM.render(
    <Provider store={store}>
        <GDRoot />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
