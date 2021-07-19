import React from 'react'
import {Link} from 'react-router-dom'
import SingleSkillColorChanger from '../../common/skillcolor'
import SRankData from './srankData'
import { observer } from 'mobx-react'
import store from '../../../mobx/store'
import { Icon, ItemRow } from '../../../styled/styledCommon'

import txtSrankKo from '../../../lang/skill/ranking/txtSkillRank-ko'
import txtSrankJp from '../../../lang/skill/ranking/txtSkillRank-jp'
import txtSrankEn from '../../../lang/skill/ranking/txtSkillRank-en'

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
        <table style={{width: '100%'}}>
        {
            props.rank.map(r => {
                return (
                <tr key={r.index}>
                        <td style={{textAlign: 'center'}}>
                            {r.index}
                        </td>
                        <td style={{paddingTop: '5px', paddingBottom: '5px'}}>
                            <ItemRow keepDirHor={true}>
                                {
                                    (function() {
                                        if(r.towertitle !== '') {
                                            return <Icon sizeType='sm' src={r.towertitle} />
                                        }
                                    })()
                                }
                                <Link href="#no_div" style={{fontSize: "125%"}} className='innerhref' to={r.profilerank}>
                                    {r.username}
                                </Link>
                            </ItemRow>
                            <ItemRow>
                                {txtSrank.table.uptime} {r.time}
                            </ItemRow>
                        </td>
                        <td className='blackandwhite'>
                            <tr>
                                <td>G&nbsp;</td>
                                <td>
                                    <Link to={r.glink}>
                                        <SingleSkillColorChanger
                                            skill={parseFloat(r.gskill)}
                                            link={r.glink} />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>D&nbsp;</td>
                                <td>
                                    <Link to={r.dlink}>
                                        <SingleSkillColorChanger
                                            skill={parseFloat(r.dskill)}
                                            link={r.dlink} />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>A&nbsp;</td>
                                <td>
                                    <SingleSkillColorChanger
                                        skill={parseFloat(r.allskill)}
                                        link="#none" />
                                </td>
                            </tr>
                        </td>
                    </tr>
                )
            })
        }
        </table>
    )
})

export default SkillRankingItem;