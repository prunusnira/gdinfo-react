// action: 어떤 변화가 일어나야 할지 알려주는 객체
// action 타입 정의
export const SETLOGIN = 'SETLOGIN';
export const SETLOGOUT = 'SETLOGOUT';

export interface LoginInfo {
    token: string,
    id: string
}

interface SetLoginAction {
    type: typeof SETLOGIN,
    login: boolean,
    userinfo: LoginInfo
}

interface SetLogoutAction {
    type: typeof SETLOGOUT,
    login: boolean,
    userinfo: LoginInfo
}

export type RootAction = 
    SetLoginAction
    | SetLogoutAction;

// action 정의
// action이 dispatch에 의해 store로 전달되면
// reducer에 의해 store에 저장됨
function setLogin(userinfo: LoginInfo): SetLoginAction {
    return {
        type: SETLOGIN,
        login: true,
        userinfo
    };
}

function setLogout(): SetLogoutAction {
    return {
        type: SETLOGOUT,
        login: false,
        userinfo: {
            token: '',
            id: ''
        }
    }
}

export const actionCreator = {
    setLogin, setLogout
};