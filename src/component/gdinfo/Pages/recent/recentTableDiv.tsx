import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LData from '../Common/language';
import SingleSkillColorChanger from '../Common/skillcolor';

import {
    Row,
    Col
} from 'reactstrap';
import RecentData from './recentData';

interface Props {
    isMain: boolean,
    list: Array<RecentData>
}

class RecentTableDiv extends Component<Props> {
    lang = LData.lang;
    text = LData.text;

    render() {
        return (
            this.props.list.map(
                (user, i) => {
                    const date = new Date().getTime() - user.uptimelong;
                    const hour = date/60000/60;
                    const min = date/60000%60;

                    const imgUrl = process.env.PUBLIC_URL+"/general-img/title/"+user.titletower+".png";
                    const username = user.name+" ⓟ";
                    const updateTime = Math.floor(hour)+(this.text.other.hrs as any)[this.lang]+" "+Math.floor(min)+(this.text.other.mins as any)[this.lang];
                    const gskill = user.gskill;
                    const glink = "/skill/2/"+user.id+"/gf/1/1";
                    const dskill = user.dskill;
                    const dlink = "/skill/2/"+user.id+"/dm/1/1";
                    const link = this.props.isMain ? '/profile/'+user.id : "#no_div";

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
                                        <Link className="innerhref title" to={link}>{username}</Link>
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
                                        <SingleSkillColorChanger skill={gskill} link={glink} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="3" className="text-right">D</Col>
                                    <Col xs="9" className="text-left blackandwhite">
                                        <SingleSkillColorChanger skill={dskill} link={dlink} />
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