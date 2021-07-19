import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CommonData from '../common/commonData'
import ProfileData from '../user/profile/profileData'
import store from '../../mobx/store'
import { observer } from 'mobx-react'

import txtIndexKo from '../../lang/index/txtIndex-ko'
import txtIndexJp from '../../lang/index/txtIndex-jp'
import txtIndexEn from '../../lang/index/txtIndex-en'

const UserLoginInfo = observer(() => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(new ProfileData())

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const txtIndex =
        lang === 'ko' ? txtIndexKo :
            lang === 'jp' ? txtIndexJp : txtIndexEn

    useEffect(() => {
        const token = loginUser.user.token;
        if(token !== "") {
            axios.post(CommonData.dataUrl+"getuser/"+token)
            .then((res) => {
                setData(JSON.parse(res.data.mydata))
                setLoading(true)
            })
        }
    }, [])

    if(loginStatus.isSigned) {
        if(loading) {
            const imgurl = `${process.env.PUBLIC_URL}/general-img/title/${data.titletower}.png`;
            return (
                <>
                    <span id='selftitle'>
                        ({data.title})
                    </span><br/>
                    <span id='towertitleself'>
                        {
                            (function() {
                                if(data.titletower !== "") {
                                    return (<img alt="titletower" className='towertitle35' src={imgurl} />)
                                }
                            })()
                        }
                    </span>
                    <span style={{fontSize:'125%'}} id='selfname'>
                        {data.name}
                    </span><br/>
                    <span><b>GF</b>
                        <Link
                            style={{color: "white"}}
                            to={`/skill/2/${data.id}/gf/1/1`}>{data.gskill}</Link>
                    </span>&nbsp;&nbsp;&nbsp;
                    <span><b>DM</b>
                        <Link
                            style={{color: "white"}}
                            to={`/skill/2/${data.id}/dm/1/1`}>{data.dskill}</Link>
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
    }
    else {
        return (
            <span>
                <Link to="/login">{txtIndex.self.login}</Link>
                {txtIndex.self.loginFirst}
            </span>
        )
    }
})

export default UserLoginInfo;