import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { atomLanguage } from '@/jotai/language';
import txtLoginEn from '@/lang/user/login/txtLogin-en';
import txtLoginJp from '@/lang/user/login/txtLogin-jp';
import txtLoginKo from '@/lang/user/login/txtLogin-ko';
import CommonData from '@/module/common/commonData';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { LoginParagraph } from './loginPresenter.style';

interface Props {
    responseGoogle: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
    responseFail: (e: any) => void;
}

const LoginPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);

    const txtLogin = lang === 'ko' ? txtLoginKo : lang === 'jp' ? txtLoginJp : txtLoginEn;

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
                        cookiePolicy={'single_host_origin'}
                    />
                </LoginParagraph>
            </ContentLayout>

            <div style={{ display: 'none' }}>
                <form action="/loginseq" id="register" method="post">
                    <input type="text" id="token" name="token" />
                </form>
            </div>
        </CommonLayout>
    );
};

export default LoginPresenter;
