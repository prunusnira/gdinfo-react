import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LData from '../Common/language';
import SingleSkillColorChanger from '../Common/skillcolor';

import {
    Row,
    Col
} from 'reactstrap';
import RecentData from './recentData';
import txtProfile from '../Profiles/profile/txtprofile';

interface Props {
    isMain: boolean,
    list: Array<RecentData>
}

class RecentTableDiv extends Component<Props> {
    lang = LData.lang;
    text = LData.text;

    render() {
        const self = this;
        return (
            this.props.list.map(
                (user, i) => {
                    const date = new Date().getTime() - user.uptimelong;
                    const hour = date/60000/60;
                    const min = date/60000%60;

                    const dataopen = user.opencount;
                    const imgUrl = process.env.PUBLIC_URL+"/general-img/title/"+user.titletower+".png";
                    const username = user.name+" ⓟ";
                    const updateTime = Math.floor(hour)+(this.text.other.hrs as any)[this.lang]+" "+Math.floor(min)+(this.text.other.mins as any)[this.lang];
                    const gskill = user.gskill;
                    const glink = "/skill/2/"+user.id+"/gf/1/1";
                    const dskill = user.dskill;
                    const dlink = "/skill/2/"+user.id+"/dm/1/1";

                    return (
                        <Row key={'recent'+i} className="table-border-bottom" style={{padding:5+'px'}}>
                            <Col xs="7">
                                <Row>
                                    <Col xs="12" className="text-left">
                                        <span id="towertitle">
                                            {
                                                (function() {
                                                    if(user.titletower !== "") {
                                                        return (<img alt="titletower" className="towertitle35" src={imgUrl} />)
                                                    }
                                                })()
                                            }
                                        </span>
                                        {
                                            (function() {
                                                if(dataopen === "Y") {
                                                    return <Link className="innerhref title" to={'/profile/'+user.id}>{username}</Link>
                                                }
                                                else {
                                                    return <a className="innerhref title" style={{cursor: "not-allowed"}} href="#no_div">{(txtProfile.table1.emptyname as any)[self.lang]}</a>
                                                }
                                            })()
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        {updateTime}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="5">
                                <Row>
                                    <Col xs="3" className="text-right">G</Col>
                                    <Col xs="9" className="text-left blackandwhite">
                                        {
                                            (function() {
                                                if(dataopen === "Y") {
                                                    return <SingleSkillColorChanger skill={gskill} link={glink} />
                                                }
                                                else {
                                                    return <SingleSkillColorChanger skill={gskill} link={"#no_div"} />
                                                }
                                            })()
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="3" className="text-right">D</Col>
                                    <Col xs="9" className="text-left blackandwhite">
                                        {
                                            (function() {
                                                if(dataopen === "Y") {
                                                    return <SingleSkillColorChanger skill={dskill} link={dlink} />
                                                }
                                                else {
                                                    return <SingleSkillColorChanger skill={dskill} link={"#no_div"} />
                                                }
                                            })()
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    );
                }
            )
        );
    };
}

export default RecentTableDiv;