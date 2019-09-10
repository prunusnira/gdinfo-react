import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LData from '../Common/language';
import SingleSkillColorChanger from '../Common/skillcolor';

import {
    Row,
    Col
} from 'reactstrap';
import commonData from '../Common/commonData';

const lang = LData.lang;
const text = LData.text;

class RecentTableDiv extends Component {
    state = {
        recentUserList: []
    };

    componentDidMount() {
        axios.post(commonData.commonDataURL+"recent")
        .then((resp) => {
            // response
            const data = resp.data;
            const array = data.recent;

            this.setState({
                recentUserList: array
            });
        });
    };

    render() {
        // before ajax finish

        // after ajax finish
        return (
            this.state.recentUserList.map(
                user => {
                    const date = new Date().getTime() - user.uptimelong;
                    const hour = date/60000/60;
                    const min = date/60000%60;

                    const imgUrl = process.env.PUBLIC_URL+"/general-img/title/"+user.titletower+".png"
                    const username = user.name+" ⓟ"
                    const updateTime = Math.floor(hour)+text.other.hrs[lang]+" "+Math.floor(min)+text.other.mins[lang];
                    const gskill = user.gskill.toFixed(2);
                    const glink = "/skill/2/"+user.id+"/gf/1/1"
                    const dskill = user.dskill.toFixed(2);
                    const dlink = "/skill/2/"+user.id+"/dm/1/1"
                    const link = '/profile/'+user.id

                    return (
                        <div className="table-border-bottom" style={{padding:5+'px'}}>
                            <Row>
                                <Col xs="7">
                                    <Row>
                                        <Col xs="12" className="text-left">
                                            <span id="towertitle">
                                                {
                                                    (function() {
                                                        if(user.titletower !== "") {
                                                            return (<img alt="titletower" class="towertitle35" src={imgUrl} />)
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
                        </div>
                    );
                }
            )
        );
    };
}

export default RecentTableDiv;