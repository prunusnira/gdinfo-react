// action: 어떤 변화가 일어나야 할지 알려주는 객체
// action 타입 정의
export const SETLOGIN = 'SETLOGIN';
export const SETLOGOUT = 'SETLOGOUT';

// action 정의
// 각 값들은 후에 reducer에 의해 store에 저장됨
export function setLogin(userinfo) {
    return {
        type: SETLOGIN,
        login: true,
        userinfo
    };
}

export function setLogout() {
    return {
        type: SETLOGOUT,
        login: false,
        userinfo: []
    }
}