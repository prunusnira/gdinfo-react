import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import SingleSkillColorChanger from '../../Common/skillcolor';
import txtSrank from './txtskillrank';

import {
    Row,
    Col
} from 'reactstrap';
import SRankData from './srankData';
import { observer } from 'mobx-react';
import store from '../../../../../mobx/store';
import { Icon, ItemRow } from '../../../../../styled/styledCommon';

interface Props {
    rank: Array<SRankData>,
    gtype: string
}

const SRItem = observer((props: Props) => {
    const lang = store.language.lang

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
                                {(txtSrank.table.uptime as any)[lang]} {r.time}
                            </ItemRow>
                        </td>
                        <td className='blackandwhite'>
                            <tr>
                                <td>G&nbsp;</td>
                                <td>
                                    <Link className='skill' to={r.glink}>
                                        <SingleSkillColorChanger
                                            skill={parseFloat(r.gskill)}
                                            link="" />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>D&nbsp;</td>
                                <td>
                                    <Link className='skill' to={r.dlink}>
                                        <SingleSkillColorChanger
                                            skill={parseFloat(r.dskill)}
                                            link="" />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>A&nbsp;</td>
                                <td>
                                    <SingleSkillColorChanger
                                        skill={parseFloat(r.allskill)}
                                        link="" />
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

export default SRItem;