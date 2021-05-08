import React, {useEffect, useState} from 'react';
import axios from 'axios';
import txtCntRank from './txtcntrank';
import PlayCntRankItem from './playcntitem';
import Pager from '../../Common/pager';

import CommonData from '../../Common/commonData';
import PlayCntrankData from './playcntrankData';
import { useParams } from 'react-router-dom';
import store from '../../../../../mobx/store';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../../../styled/styledCommon';
import { observer } from 'mobx-react';

interface MatchProps {
    page: string
}

const PlaycountRanking = observer(() => {
    const [list, setList] = useState(Array<PlayCntrankData>())
    const [allPage, setAllPage] = useState(0)

    const {page} = useParams<MatchProps>()

    const lang = store.language.lang

    useEffect(() => {
        updateData()
    }, [page])

    const updateData = () => {
        axios.post(`${CommonData.dataUrl}cntrank/${page}`)
        .then((res) => {
            const json = res.data
            const list = new Array<PlayCntrankData>()
            const rank = JSON.parse(json.rank)

            for(let i = 0; i < rank.length; i++) {
                const obj = new PlayCntrankData()
                const cur = rank[i]
                obj.index = 30*(parseInt(page) - 1)+i+1

                if(cur.opencount === "Y") {
                    if(cur.titletower === '') {
                        obj.towertitle = ''
                    }
                    else {
                        obj.towertitle = `${process.env.PUBLIC_URL}/general-img/title/${cur.titletower}.png`
                    }
                    obj.prlink = `/profile/${cur.id}`
                    obj.name = cur.name
                }
                else {
                    obj.towertitle = ''
                    obj.prlink = ""
                    obj.name = (txtCntRank.table.emptyname as any)[lang]
                }

                obj.gfcnt = cur.countgf
                obj.dmcnt = cur.countdm
                obj.allcnt = cur.countgf + cur.countdm

                list.push(obj)
            }

            setList(list)
            setAllPage(json.pages)
        })
    }

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
                        <PlayCntRankItem list={list} />
                    </ItemRow>

                    <ItemRow id="pager" keepDirHor={true}>
                        <Pager
                            cpage={parseInt(page)}
                            allpage={allPage}
                            baseUrl="/cntrank/"
                            afterUrl="" />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default PlaycountRanking