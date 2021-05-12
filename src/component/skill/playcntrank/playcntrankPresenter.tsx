import React from 'react'
import PlayCntRankItem from './playcntitem'
import Pager from '../../common/pager'
import txtCntRank from './txtcntrank'
import store from '../../../mobx/store'
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../styled/styledCommon'
import PlaycntRankData from './playcntrankData'

interface Props {
    list: Array<PlaycntRankData>,
    page: string,
    allPage: number
}

const PlaycountRankingPresenter = (props: Props) => {
    const lang = store.language.lang

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Playcount Ranking</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <span>
                            {(txtCntRank.desc.desc1 as any)[lang]}<br/>
                            {(txtCntRank.desc.desc2 as any)[lang]}<br/>
                            {(txtCntRank.desc.desc3 as any)[lang]}
                        </span>
                    </ItemRow>

                    <ItemRow setVertical={true}>
                        <PlayCntRankItem list={props.list} />
                    </ItemRow>

                    <ItemRow id="pager" keepDirHor={true}>
                        <Pager
                            cpage={parseInt(props.page)}
                            allpage={props.allPage}
                            baseUrl="/cntrank/"
                            afterUrl="" />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default PlaycountRankingPresenter