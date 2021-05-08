import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CommonData from '../Common/commonData';
import ProfileData from '../Profiles/profile/profileData';
import txtIndex from './txtIndex';
import store from '../../../../mobx/store';
import { observer } from 'mobx-react';

const UserLoginInfo = observer(() => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(new ProfileData())

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

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
                    <Link to="/login">{(txtIndex.self.login as any)[lang]}</Link>
                    {(txtIndex.self.loginFirst as any)[lang]}
                </span>
            )
        }
    }
    else {
        return (
            <span>
                <Link to="/login">{(txtIndex.self.login as any)[lang]}</Link>
                {(txtIndex.self.loginFirst as any)[lang]}
            </span>
        )
    }
})

export default UserLoginInfo;