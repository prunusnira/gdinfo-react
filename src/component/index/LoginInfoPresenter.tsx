import {Link} from 'react-router-dom'
import store from '@/mobx/store'

import txtIndexKo from '@/lang/index/txtIndex-ko'
import txtIndexJp from '@/lang/index/txtIndex-jp'
import txtIndexEn from '@/lang/index/txtIndex-en'
import React from 'react'
import ProfileData from '../user/profile/profileData'

type LoginInfoProps = {
    loading: boolean,
    data: ProfileData
}

const LoginInfoPresenter = (props: LoginInfoProps) => {
    const {language, loginStatus} = store
    const lang = language.lang

    const txtIndex =
        lang === 'ko' ? txtIndexKo :
            lang === 'jp' ? txtIndexJp : txtIndexEn

    //if(loginStatus.isSigned) {
        if(props.loading) {
            const imgurl = `${process.env.PUBLIC_URL}/general-img/title/${props.data.titletower}.png`;
            return (
                <>
                    <span id='selftitle'>
                        ({props.data.title})
                    </span><br/>
                    <span id='towertitleself'>
                        {
                            (function() {
                                if(props.data.titletower !== "") {
                                    return (<img alt="titletower" className='towertitle35' src={imgurl} />)
                                }
                            })()
                        }
                    </span>
                    <span style={{fontSize:'125%'}} id='selfname'>
                        {props.data.name}
                    </span><br/>
                    <span><b>GF</b>
                        <Link
                            style={{color: "white"}}
                            to={`/skill/2/${props.data.id}/gf/1/1`}>{props.data.gskill}</Link>
                    </span>&nbsp;&nbsp;&nbsp;
                    <span><b>DM</b>
                        <Link
                            style={{color: "white"}}
                            to={`/skill/2/${props.data.id}/dm/1/1`}>{props.data.dskill}</Link>
                    </span>
                </>
            )
        }
        else {
            return (
                <span>
                    <Link to="/login">{txtIndex.self.login}</Link>
                    {txtIndex.self.loginFirst}
                </span>
            )
        }
    /*}
    else {
        return (
            <span>
                <Link to="/login">{txtIndex.self.login}</Link>
                {txtIndex.self.loginFirst}
            </span>
        )
    }*/
}

export default LoginInfoPresenter