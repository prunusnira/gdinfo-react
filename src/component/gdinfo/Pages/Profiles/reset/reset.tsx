import React, { useState } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import txtReset from './txtreset';
import CommonData from '../../Common/commonData';
import store from '../../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

const ProfileReset = observer(() => {
    const [redirect, setRedirect] = useState(false)

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const resetData = () => {
        const url = CommonData.dataUrl+"resetdata";

        const data = new URLSearchParams();
        data.append("id", loginUser.user.id);

        axios.post(url, data)
        .then((res) => {
            setRedirect(true)
        })
        .catch((err) => {
            console.error(err);
        });
    }

    if(redirect) {
        return <Redirect to="/profile" />
    }
    if(!loginStatus.isSigned) {
        return <Redirect to="/error/500" />
    }
    else {
        return (
            <Container>
                <ItemRow setVertical={true}>
                    <BodyHeader>
                        <h3>Data Reset</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow setVertical={true}>
                            <BodyHeader>
                                <h3>{(txtReset.title as any)[lang]}</h3>
                            </BodyHeader>
                            <BodyContent>
                                <p>{(txtReset.desc1 as any)[lang]}</p>
                            </BodyContent>
                        </ItemRow>
                        <ItemRow setVertical={true}>
                            <BodyHeader>
                                <h3>{(txtReset.desc2t as any)[lang]}</h3>
                            </BodyHeader>
                            <BodyContent>
                                <p>{(txtReset.desc2s as any)[lang]}</p>
                                <p>{(txtReset.desc3 as any)[lang]}</p>
                                <p>{(txtReset.desc4 as any)[lang]}</p>
                                <p>{(txtReset.desc5 as any)[lang]}</p>
                            </BodyContent>
                        </ItemRow>
                        
                        <ItemRow>
                            <ItemCol size={5}>
                                <Button onClick={() => resetData()} style={{width:"100%"}}>YES</Button>
                            </ItemCol>
                            <ItemCol size={5}>
                                <Link to="/index">
                                    <Button style={{width:"100%"}}>NO</Button>
                                </Link>
                            </ItemCol>
                        </ItemRow>
                    </BodyContent>
                </ItemRow>
            </Container>
        )
    }
})

export default ProfileReset