import React, {Component} from 'react';
import axios from 'axios';
import txtCntRank from './txtcntrank';
import LData from '../../Common/language';
import CountRankItem from './cntitem';
import Pager from '../../Common/pager';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

const lang = LData.lang;

class PlaycountRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            cpage: 0,
            allpage: 0
        }
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    updateData(props) {
        const page = props.match.params.page;
        axios.post("https://gitadora.info/d/cntrank/"+page)
        .then((res) => {
            const json = res.data;
            const list = [];
            
            for(let i = 0; i < json.rank.length; i++) {
                const obj = {};
                const cur = json.rank[i];
                obj.index = 30*(page - 1)+i+1;

                if(cur.opencount === "Y") {
                    if(cur.titletower === '') {
                        obj.towertitle = '';
                    }
                    else {
                        obj.towertitle = process.env.PUBLIC_URL+"/general-img/title/"+cur.titletower+".png";
                    }
                    obj.prlink = "/profile/"+cur.id;
                    obj.name = cur.name;
                }
                else {
                    obj.towertitle = '';
                    obj.prlink = "";
                    obj.name = txtCntRank.table.emptyname[lang];
                }

                obj.gfcnt = cur.countgf;
                obj.dmcnt = cur.countdm;
                obj.allcnt = cur.countgf + cur.countdm;

                list.push(obj);
            }

            this.setState({
                list: list,
                cpage: page,
                allpage: json.pages
            })
        });
    }

    render() {
        const self = this;
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Playcount Ranking</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <span>
                                            {txtCntRank.desc.desc1[lang]}<br/>
                                            {txtCntRank.desc.desc2[lang]}<br/>
                                            {txtCntRank.desc.desc3[lang]}
                                        </span>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" id="ranktable">
                                        <CountRankItem list={self.state.list} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" className="text-center" id="pager">
                                        <Pager
                                            cpage={self.state.cpage}
                                            allpage={self.state.allpage}
                                            baseUrl="/cntrank/"
                                            afterUrl="" />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlaycountRanking;