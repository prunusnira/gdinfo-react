import { sha256 } from "js-sha256";
import { useState } from "react";
import { GoogleLoginResponse } from "react-google-login";
import CommonData from "@/module/common/commonData";
import LoginInfo from "../loginInfo";

type LoginReturn = [boolean, string, (r: GoogleLoginResponse) => void, (e: any) => void];

const useGoogleLogin = (
    updateUserInfo: (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => void
): LoginReturn => {
    const [isLoginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    const responseGoogle = (res: GoogleLoginResponse) => {
        const token = res.getBasicProfile().getEmail().split("@")[0];
        const hash = sha256(token);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${CommonData.dataUrl}loginseq`);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            const rtn = xhr.responseText;
            const json = JSON.parse(rtn);
            const loginData = JSON.parse(json.loginData);

            switch (loginData.stat) {
                case "login":
                    updateUserInfo(loginData, true, false);
                    window.location.href = "/index";
                    break;
                case "newuser":
                    updateUserInfo(loginData, false, true);
                    break;
                case "prohibit":
                    break;
            }
        };
        xhr.send("token=" + hash);
    };

    const responseFail = (e: any) => {
        setLoginError(true);
        setLoginErrorMsg(e.details);
        console.log(e);
    };

    return [isLoginError, loginErrorMsg, responseGoogle, responseFail];
};

export default useGoogleLogin;
