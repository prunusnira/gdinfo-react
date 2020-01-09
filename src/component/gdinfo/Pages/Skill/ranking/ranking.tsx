import React, {Component} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
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
import commonData from '../../Common/commonData';
import SRankData from './srankData';

interface IMatchProps {
    gtype: string,
    page: string
}

interface State {
    ranklist: Array<SRankData>,
    cpage: number,
    allpage: number
}

class SkillRanking extends Component<RouteComponentProps<IMatchProps>, State> {
    lang = LData.lang;
    text = LData.text;

    state: State = {
        ranklist: [],
        cpage: 0,
        allpage: 0
    }

    componentDidMount() {
        this.updateRankList(this.props);
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchProps>) {
        this.updateRankList(nextProps);
    }

    updateRankList(props: RouteComponentProps<IMatchProps>) {
        console.log("TEST");
        const urlparam = props.match.params;
        axios.post(commonData.commonDataURL+"rank/"+urlparam.gtype+"/"+urlparam.page)
        .then((res) => {
            const json = res.data;
            const list = new Array<SRankData>();

            for(let i = 0; i < json.allUserList.length; i++) {
                const obj = new SRankData();
                const cur = json.allUserList[i];
                obj.index = i+30*(parseInt(urlparam.page)-1)+1;
                obj.profilerank = '/profile/'+cur.id;

                if(cur.titletower !== '')
                    obj.towertitle = "/img/title/'+cur.titletower+'.png"
                else
                    obj.towertitle = '';

                obj.username = cur.name+" ⓟ";

                const date = new Date().getTime() - cur.uptimelong;
                const day = Math.floor(date/1000/60/60/24);

                if(day > 0) {
                    obj.time = day+(this.text.other.days as any)[this.lang];
                }
                else {
                    obj.time = Math.floor(date/1000/60/60)+(this.text.other.hrs as any)[this.lang]+
                        " "+Math.floor(date/1000/60%60)+(this.text.other.mins as any)[this.lang];
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
                cpage: parseInt(urlparam.page),
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
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Skill Ranking</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Row>
                                    <Col xs="12">
                                        <span>{(txtSrank.desc as any)[this.lang]}</span>
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
                                            {(txtSrank.click as any)[this.lang]}
                                        </Col>
                                        <Col xs="12">
                                            <div className="div-table" id="ranktable">
                                                <SRItem gtype={self.props.match.params.gtype} rank={self.state.ranklist} />
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