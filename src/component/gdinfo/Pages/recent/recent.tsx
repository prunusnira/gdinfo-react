import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RecentTableDiv from './recentTableDiv';
import txtRecent from './txtRecent';

import CommonData from '../Common/commonData';
import RecentData from './recentData';
import store from '../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../../styled/styledCommon';

const Recent = observer(() =>  {
    const [recentUserList, setUserList] = useState(Array<RecentData>())
    const {language} = store
    const lang = language.lang

    useEffect(() => {
        axios.post(`${CommonData.dataUrl}recent`)
        .then((resp) => {
            const data = resp.data
            const array = JSON.parse(data.recent)

            setUserList(array)
        });
    }, [])

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{(txtRecent.recent as any)[lang]}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow style={{textAlign: 'center'}}>
                        {(txtRecent.click as any)[lang]}
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <RecentTableDiv
                            isMain={true}
                            list={recentUserList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default Recent