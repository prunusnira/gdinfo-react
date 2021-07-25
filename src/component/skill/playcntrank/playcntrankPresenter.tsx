import React from 'react'
import PlayCntRankItem from './playcntitem'
import Pager from '@/component/common/pager'
import store from '@/mobx/store'
import { BodyContent, BodyHeader, Container, ItemRow } from '@/styled/styledCommon'
import PlaycntRankData from './playcntrankData'

import txtCntRankKo from '@/lang/skill/playcntrank/txtCountRank-ko'
import txtCntRankJp from '@/lang/skill/playcntrank/txtCountRank-jp'
import txtCntRankEn from '@/lang/skill/playcntrank/txtCountRank-en'

interface Props {
    list: Array<PlaycntRankData>,
    page: string,
    allPage: number
}

const PlaycountRankingPresenter = (props: Props) => {
    const lang = store.language.lang
    
    const txtCntRank =
        lang === 'ko' ? txtCntRankKo :
            lang === 'jp' ? txtCntRankJp : txtCntRankEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{txtCntRank.title}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <span>
                            {txtCntRank.desc.desc1}<br/>
                            {txtCntRank.desc.desc2}<br/>
                            {txtCntRank.desc.desc3}
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