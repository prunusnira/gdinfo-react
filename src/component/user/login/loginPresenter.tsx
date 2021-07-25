import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import CommonData from '@/component/common/commonData'
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '@/styled/styledCommon'
import store from '@/mobx/store'

import txtLoginKo from '@/lang/user/login/txtLogin-ko'
import txtLoginJp from '@/lang/user/login/txtLogin-jp'
import txtLoginEn from '@/lang/user/login/txtLogin-en'

interface Props {
    responseGoogle: (res: GoogleLoginResponse) => void,
    responseFail: (e: any) => void,
}

const LoginPresenter = (props: Props) => {
    const lang = store.language.lang

    const txtLogin =
        lang === 'ko' ? txtLoginKo :
            lang === 'jp' ? txtLoginJp : txtLoginEn

    return (
        <>
            <Container>
                <ItemRow>
                    <ItemCol size={10}>
                        <BodyHeader>
                            <h3>{txtLogin.title}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <ItemRow>
                                <span>{txtLogin.google}</span>
                            </ItemRow>
                            <ItemRow>
                                <GoogleLogin
                                    theme="dark"
                                    clientId={CommonData.googleLoginClientId}
                                    buttonText="Login with Google"
                                    onSuccess={props.responseGoogle}
                                    onFailure={props.responseFail}
                                    isSignedIn={false}
                                    cookiePolicy={'single_host_origin'} />
                            </ItemRow>
                        </BodyContent>
                    </ItemCol>
                </ItemRow>
            </Container>
            <div style={{display: 'none'}}>
                <form action='/loginseq' id='register' method='post'>
                    <input type='text' id='token' name='token' />
                </form>
            </div>
        </>
    )
}

export default LoginPresenter