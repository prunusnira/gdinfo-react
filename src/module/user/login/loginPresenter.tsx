import React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import CommonData from "@/module/common/commonData";
import store from "@/mobx/store";

import txtLoginKo from "@/lang/user/login/txtLogin-ko";
import txtLoginJp from "@/lang/user/login/txtLogin-jp";
import txtLoginEn from "@/lang/user/login/txtLogin-en";
import { LoginParagraph } from "./loginPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    responseGoogle: (res: GoogleLoginResponse) => void;
    responseFail: (e: any) => void;
}

const LoginPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtLogin = lang === "ko" ? txtLoginKo : lang === "jp" ? txtLoginJp : txtLoginEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtLogin.title} isHalf>
                <LoginParagraph>
                    <span>{txtLogin.google}</span>
                    <GoogleLogin
                        theme="dark"
                        clientId={CommonData.googleLoginClientId}
                        buttonText="Login with Google"
                        onSuccess={props.responseGoogle}
                        onFailure={props.responseFail}
                        isSignedIn={false}
                        cookiePolicy={"single_host_origin"}
                    />
                </LoginParagraph>
            </ContentLayout>

            <div style={{ display: "none" }}>
                <form action="/loginseq" id="register" method="post">
                    <input type="text" id="token" name="token" />
                </form>
            </div>
        </CommonLayout>
    );
};

export default LoginPresenter;
