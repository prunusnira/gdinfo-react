import React from 'react';
import {Link} from 'react-router-dom';
import SingleSkillColorChanger from '../Common/skillcolor';

import RecentData from './recentData';
import txtProfile from '../Profiles/profile/txtprofile';
import { observer } from 'mobx-react';
import store from '../../../../mobx/store';
import { ItemCol, ItemRow } from '../../../../styled/styledCommon';
import TxtCommon from '../Common/txtCommon';

interface Props {
    isMain: boolean,
    list: Array<RecentData>
}

const RecentTableDiv = observer((props: Props) => {
    const lang = store.language.lang

    const mapdata = props.list.map((user, i) => {
        const date = new Date().getTime() - user.uptimelong
        const hour = date/60000/60
        const min = date/60000%60
        
        return (
            <ItemRow key={'recent'+i} className="table-border-bottom" style={{padding:5+'px'}}>
                <ItemCol size={6}>
                    <ItemRow>
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
                                    return <Link className="innerhref title" to={'/profile/'+user.id}>{`${user.name} ⓟ`}</Link>
                                }
                                else {
                                    return <a className="innerhref title" style={{cursor: "not-allowed"}} href="#no_div">{(txtProfile.table1.emptyname as any)[lang]}</a>
                                }
                            })()
                        }
                    </ItemRow>
                    <ItemRow>
                        {`${Math.floor(hour)}${(TxtCommon.other.hrs as any)[lang]} ${Math.floor(min)}${(TxtCommon.other.mins as any)[lang]}`}
                    </ItemRow>
                </ItemCol>
                <ItemCol size={4}>
                    <ItemRow>
                        <ItemCol size={2} className="text-right">G</ItemCol>
                        <ItemCol size={8} className="text-left blackandwhite">
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
                    <ItemRow>
                        <ItemCol size={2} className="text-right">D</ItemCol>
                        <ItemCol size={8} className="text-left blackandwhite">
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