import { useState } from "react";
import store from "@/mobx/store";
import LoginInfo from "../loginInfo";

const useUserInfo = () => {
    const [newUser, setNewUser] = useState(false);
    const [token, setToken] = useState("");

    const { loginUser, loginStatus } = store;

    const updateUserInfo = (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => {
        loginUser.setUserData(info);
        loginStatus.setSignStatus(isSignIn);
        setToken(info.token);
        setNewUser(isNewUser);
    };

    return { newUser, token, updateUserInfo };
};

export default useUserInfo;
