import React from 'react'
import {Link} from 'react-router-dom'
import SingleSkillColorChanger from '@/component/common/skillcolor'

import RecentData from './recentData'
import { observer } from 'mobx-react'
import store from '@/mobx/store'
import { ItemCol, ItemRow } from '@/styled/styledCommon'

import txtProfileKo from '@/lang/user/profile/txtProfile-ko'
import txtProfileJp from '@/lang/user/profile/txtProfile-jp'
import txtProfileEn from '@/lang/user/profile/txtProfile-en'
import TxtCommonKo from '@/lang/common/txtCommon-ko'
import TxtCommonJp from '@/lang/common/txtCommon-jp'
import TxtCommonEn from '@/lang/common/txtCommon-en'

interface Props {
    isMain: boolean,
    list: Array<RecentData>
}

const RecentTableDiv = observer((props: Props) => {
    const lang = store.language.lang

    const txtProfile =
        lang === 'ko' ? txtProfileKo :
            lang === 'jp' ? txtProfileJp : txtProfileEn
    
    const TxtCommon =
        lang === 'ko' ? TxtCommonKo :
            lang === 'jp' ? TxtCommonJp : TxtCommonEn

    const mapdata = props.list.map((user, i) => {
        const date = new Date().getTime() - user.uptimelong
        const hour = date/60000/60
        const min = date/60000%60
        
        return (
            <ItemRow
                keepDirHor={true}
                key={'recent'+i}
                className="table-border-bottom"
                style={{padding:5+'px'}}>
                <ItemCol size={6}>
                    <ItemRow keepDirHor={true}>
                        <span id="towertitle">
                            {
                                (function() {
                                    if(user.titletower !== "") {
                                        return (
                                            <img
                                                alt="titletower"
                                                className="towertitle35"
                                                src={`${process.env.PUBLIC_URL}/general-img/title/${user.titletower}.png`} />
                                        )
                                    }
                                })()
                            }
                        </span>
                        {
                            (function() {
                                if(user.opencount === "Y") {
                                    return (
                                        <Link className="innerhref title" to={'/profile/'+user.id}>
                                            {`${user.name} ⓟ`}
                                        </Link>
                                    )
                                }
                                else {
                                    return (
                                        <a className="innerhref title" style={{cursor: "not-allowed"}} href="#no_div">
                                            {txtProfile.table1.emptyname}
                                        </a>
                                    )
                                }
                            })()
                        }
                    </ItemRow>
                    <ItemRow>
                        {`${Math.floor(hour)}${TxtCommon.other.hrs} ${Math.floor(min)}${TxtCommon.other.mins}`}
                    </ItemRow>
                </ItemCol>
                <ItemCol size={4} className='blackandwhite'>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={2} style={{textAlign: 'center'}}>G</ItemCol>
                        <ItemCol size={8} className="text-left">
                            {
                                (function() {
                                    if(user.opencount === "Y") {
                                        return <SingleSkillColorChanger skill={user.gskill} link={`/skill/2/${user.id}/gf/1/1`} />
                                    }
                                    else {
                                        return <SingleSkillColorChanger skill={user.gskill} link={"#none"} />
                                    }
                                })()
                            }
                        </ItemCol>
                    </ItemRow>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={2} style={{textAlign: 'center'}}>D</ItemCol>
                        <ItemCol size={8} className="text-left">
                            {
                                (function() {
                                    if(user.opencount === "Y") {
                                        return <SingleSkillColorChanger skill={user.dskill} link={`/skill/2/${user.id}/dm/1/1`} />
                                    }
                                    else {
                                        return <SingleSkillColorChanger skill={user.dskill} link={"#none"} />
                                    }
                                })()
                            }
                        </ItemCol>
                    </ItemRow>
                </ItemCol>
            </ItemRow>
        )
    })

    return <>{mapdata}</>
})

export default RecentTableDiv