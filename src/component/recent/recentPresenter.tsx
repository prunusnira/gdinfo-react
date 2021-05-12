import React from 'react'
import RecentTableDiv from './recentTableDiv';
import txtRecent from './txtRecent';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../styled/styledCommon';
import store from '../../mobx/store';
import RecentData from './recentData';

interface Props {
    recentUserList: Array<RecentData>
}

const RecentPresenter = (props: Props) => {
    const lang = store.language.lang

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
                            list={props.recentUserList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default RecentPresenter