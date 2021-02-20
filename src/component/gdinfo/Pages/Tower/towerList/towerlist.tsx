import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TowerListImg from './toweritem';
import axios from 'axios';
import txtTower from '../txttower';
import LData from '../../Common/language';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import CommonData from '../../Common/commonData';
import TowerListData from './towerlistData';

interface State {
    towergf: Array<TowerListData>,
    towerdm: Array<TowerListData>,
    towersp: Array<TowerListData>
}

class TowerList extends Component<{}, State> {
    lang = LData.lang;

    state = {
        towergf: [],
        towerdm: [],
        towersp: []
    }

    componentDidMount() {
        this.loadTowerList();
    }

    loadTowerList() {
        axios.post(CommonData.dataUrl+"towerlist")
        .then((res) => {
            const json = res.data;
            const towerlist = JSON.parse(json.towerlist);
            const towernum = towerlist.length;

            const towergf = new Array<TowerListData>();
            const towerdm = new Array<TowerListData>();
            const towersp = new Array<TowerListData>();

            for(let i = 0; i < towernum; i++) {
                const obj = new TowerListData();
                let l = 'ko';
                if(this.lang === 'en') l = 'ko';
                else if(this.lang === 'jp') l = 'jp';
                obj.img = process.env.PUBLIC_URL+'/general-img/tower/'+towerlist[i]+'_'+l+'.jpg';
                obj.link = '/tower/stat/'+towerlist[i];

                if(towerlist[i].startsWith("towerGf")) {
                    towergf.push(obj);
                }
                else if(towerlist[i].startsWith("towerDm")) {
                    towerdm.push(obj);
                }
                else if(towerlist[i].startsWith("towerSp")) {
                    towersp.push(obj);
                }
            }

            this.setState({
                towergf: towergf,
                towerdm: towerdm,
                towersp: towersp
            });
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
                                <h3>The Tower</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <span>{(txtTower.main.desc as any)[this.lang]}</span>
                                    </Col>
                                    <Col xs="12">
                                        <span>
                                            <Button tag={Link} to={"/tower/howto"}>
                                                {(txtTower.main.howto as any)[this.lang]}
                                            </Button>
                                        </span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row id="towerlist">
                    <Col sm="6">
                        <Card>
                            <CardHeader>
                                <h3>{(txtTower.main.skilltower as any)[this.lang]}&nbsp;GuitarFreaks</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <TowerListImg list={self.state.towergf} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card>
                            <CardHeader>
                                <h3>{(txtTower.main.skilltower as any)[this.lang]}&nbsp;DrumMania</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <TowerListImg list={self.state.towerdm} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{(txtTower.main.sptower as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <TowerListImg list={self.state.towersp} />
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

export default TowerList;