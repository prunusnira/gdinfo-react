import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SRItem from './rankingItem';
import txtSrank from './txtskillrank';
import Pager from '../../Common/pager';
import LData from '../../Common/language';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Button
} from 'reactstrap';

const lang = LData.lang;
const text = LData.text;

class SkillRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranklist: [],
            cpage: 0,
            allpage: 0
        }
    }

    componentDidMount() {
        this.updateRankList(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateRankList(nextProps);
    }

    updateRankList(props) {
        console.log("TEST");
        const urlparam = props.match.params;
        axios.post("https://gitadora.info/d/rank/"+urlparam.gtype+"/"+urlparam.page)
        .then((res) => {
            const json = res.data;
            const list = [];

            for(let i = 0; i < json.allUserList.length; i++) {
                const obj = {};
                const cur = json.allUserList[i];
                obj.index = i+30*(urlparam.page-1)+1;
                obj.profilerank = '/profile/'+cur.id;

                if(cur.titletower !== '')
                    obj.towertitle = "/img/title/'+cur.titletower+'.png"
                else
                    obj.towertitle = '';

                obj.username = cur.name+" ⓟ";
                obj.timeTitle = txtSrank.table.uptime[lang];

                const date = new Date().getTime() - cur.uptimelong;
                const day = Math.floor(date/1000/60/60/24);

                if(day > 0) {
                    obj.time = day+text.other.days[lang];
                }
                else {
                    obj.time = Math.floor(date/1000/60/60)+text.other.hrs[lang]+
                        " "+Math.floor(date/1000/60%60)+text.other.mins[lang];
                }
                obj.gskill = cur.gskill.toFixed(2);
                obj.glink = "/skill/2/"+cur.id+"/gf/1/1";
                obj.dskill = cur.dskill.toFixed(2);
                obj.dlink = "/skill/2/"+cur.id+"/dm/1/1";
                obj.allskill = (cur.gskill+cur.dskill).toFixed(2);

                list.push(obj);
            }

            this.setState({
                ranklist: list,
                cpage: urlparam.page,
                allpage: json.pages
            });
        });
    }

    changeData() {
        console.log("TESTS");
    }

    render() {
        const self = this;
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Skill Ranking</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Row>
                                    <Col xs="12">
                                        <span>{txtSrank.desc[lang]}</span>
                                    </Col>
                                    <Col xs="12" className="btn-group">
                                        <Button style={{width:"100%"}} tag={Link} to='/rank/gf/1'>GF Rank</Button>
                                        <Button style={{width:"100%"}} tag={Link} to='/rank/dm/1'>DM Rank</Button>
                                        <Button style={{width:"100%"}} tag={Link} to='/rank/all/1'>Total Rank</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                {
                                    (function() {
                                        switch(self.props.match.params.gtype) {
                                            case "gf":
                                                return <h3>GuitarFreaks</h3>
                                            case "dm":
                                                return <h3>DrumMania</h3>
                                            case "all":
                                                return <h3>Total Skill</h3>
                                            default:
                                                return <h3>FAILED TO LOAD</h3>
                                        }
                                    })()
                                }
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    <Row>
                                        <Col xs="12" className="text-center" style={{paddingBottom:"20px"}}>
                                            {txtSrank.click[lang]}
                                        </Col>
                                        <Col xs="12">
                                            <div class="div-table" id="ranktable">
                                                <SRItem rank={self.state.ranklist} />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardText>
                                <Row className="text-center">
                                    <Pager cpage={self.state.cpage} allpage={self.state.allpage}
                                        baseUrl={"/rank/"+self.props.match.params.gtype+"/"}
                                        afterUrl="" />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SkillRanking;