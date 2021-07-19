import React from 'react'
import RecentTableDiv from './recentTableDiv';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../styled/styledCommon';
import store from '../../mobx/store';
import RecentData from './recentData';

import txtRecentKo from '../../lang/recent/txtRecent-ko';
import txtRecentJp from '../../lang/recent/txtRecent-jp';
import txtRecentEn from '../../lang/recent/txtRecent-en';

interface Props {
    recentUserList: Array<RecentData>
}

const RecentPresenter = (props: Props) => {
    const lang = store.language.lang
    
    const txtRecent =
        lang === 'ko' ? txtRecentKo :
            lang === 'jp' ? txtRecentJp : txtRecentEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{txtRecent.recent}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow style={{textAlign: 'center'}}>
                        {txtRecent.click}
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <RecentTableDiv
                            isMain={true}
                            list={props.recentUserList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default RecentPresenter