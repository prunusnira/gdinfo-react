import React from 'react'
import {Link} from 'react-router-dom'
import SingleSkillColorChanger from '@/component/common/skillcolor'
import SRankData from './srankData'
import { observer } from 'mobx-react'
import store from '@/mobx/store'
import { Icon, ItemCol, ItemRow } from '@/styled/styledCommon'

import txtSrankKo from '@/lang/skill/ranking/txtSkillRank-ko'
import txtSrankJp from '@/lang/skill/ranking/txtSkillRank-jp'
import txtSrankEn from '@/lang/skill/ranking/txtSkillRank-en'

interface Props {
    rank: Array<SRankData>,
    gtype: string
}

const SkillRankingItem = observer((props: Props) => {
    const lang = store.language.lang
    
    const txtSrank =
        lang === 'ko' ? txtSrankKo :
            lang === 'jp' ? txtSrankJp : txtSrankEn

    return (
        <>
        {
            props.rank.map(r => {
                return (
                    <ItemRow key={r.index} keepDirHor={true}
                            style={{paddingTop: '5px', paddingBottom: '5px'}}>
                        <ItemCol style={{textAlign: 'center', verticalAlign: 'middle'}} size={2}>
                            {r.index}
                        </ItemCol>
                        <ItemCol size={5}>
                            <ItemRow keepDirHor={true}>
                                {
                                    (function() {
                                        if(r.towertitle !== '') {
                                            return <Icon sizeType='sm' src={r.towertitle} />
                                        }
                                    })()
                                }
                                <Link href="#no_div" style={{fontSize: "125%"}} className='innerhref' to={r.profile}>
                                    {r.username}
                                </Link>
                            </ItemRow>
                            <ItemRow>
                                {txtSrank.table.uptime} {r.time}
                            </ItemRow>
                        </ItemCol>
                        <ItemCol className='blackandwhite' size={3}>
                            <ItemRow keepDirHor={true}>
                                <ItemCol style={{textAlign:'center'}} size={2}>
                                    G
                                </ItemCol>
                                <ItemCol size={8}>
                                    <SingleSkillColorChanger
                                        skill={parseFloat(r.gskill)}
                                        link={r.glink} />
                                </ItemCol>
                            </ItemRow>
                            <ItemRow keepDirHor={true}>
                                <ItemCol style={{textAlign:'center'}} size={2}>
                                    D
                                </ItemCol>
                                <ItemCol size={8}>
                                    <SingleSkillColorChanger
                                        skill={parseFloat(r.dskill)}
                                        link={r.dlink} />
                                </ItemCol>
                            </ItemRow>
                            <ItemRow keepDirHor={true}>
                                <ItemCol style={{textAlign:'center'}} size={2}>
                                    A
                                </ItemCol>
                                <ItemCol size={8}>
                                    <SingleSkillColorChanger
                                        skill={parseFloat(r.allskill)}
                                        link="#none" />
                                </ItemCol>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                )
            })
        }
        </>
    )
})

export default SkillRankingItem;