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
import commonData from '../../Common/commonData';
import CntrankData from './cntrankData';
import { RouteComponentProps } from 'react-router-dom';

interface IMatchProps {
    page: string
}

interface State {
    list: Array<CntrankData>,
    cpage: number,
    allpage: number
}

class PlaycountRanking extends Component<RouteComponentProps<IMatchProps>, State> {
    lang = LData.lang;

    state = {
        list: new Array<CntrankData>(),
        cpage: 0,
        allpage: 0
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchProps>) {
        this.updateData(nextProps);
    }

    updateData(props: RouteComponentProps<IMatchProps>) {
        const page = props.match.params.page;
        axios.post(commonData.commonDataURL+"cntrank/"+page)
        .then((res) => {
            const json = res.data;
            const list = new Array<CntrankData>();
            const rank = JSON.parse(json.rank);

            for(let i = 0; i < rank.length; i++) {
                const obj = new CntrankData();;
                const cur = rank[i];
                obj.index = 30*(parseInt(page) - 1)+i+1;

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
                    obj.name = (txtCntRank.table.emptyname as any)[this.lang];
                }

                obj.gfcnt = cur.countgf;
                obj.dmcnt = cur.countdm;
                obj.allcnt = cur.countgf + cur.countdm;

                list.push(obj);
            }

            this.setState({
                list: list,
                cpage: parseInt(page),
                allpage: json.pages
            })
        });
    }

    render() {
        const self = this;
        return (
            <Container fluid={true}>
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
                                            {(txtCntRank.desc.desc1 as any)[this.lang]}<br/>
                                            {(txtCntRank.desc.desc2 as any)[this.lang]}<br/>
                                            {(txtCntRank.desc.desc3 as any)[this.lang]}
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