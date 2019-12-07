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
import commonData from '../../Common/commonData';

const lang = LData.lang;

class TowerList extends Component {
    state = {
        towergf: [],
        towerdm: [],
        towersp: []
    }

    componentDidMount() {
        this.loadTowerList();
    }

    loadTowerList() {
        axios.post(commonData.commonDataURL+"towerlist")
        .then((res) => {
            const json = res.data;
            const towernum = json.towerlist.length;

            const towergf = [];
            const towerdm = [];
            const towersp = [];

            for(let i = 0; i < towernum; i++) {
                const obj = {};
                let l = 'ko';
                if(lang === 'en') l = 'ko';
                else if(lang === 'jp') l = 'jp';
                obj.img = process.env.PUBLIC_URL+'/general-img/tower/'+json.towerlist[i]+'_'+l+'.jpg';
                obj.link = '/tower/stat/'+json.towerlist[i];

                if(json.towerlist[i].startsWith("towerGf")) {
                    towergf.push(obj);
                }
                else if(json.towerlist[i].startsWith("towerDm")) {
                    towerdm.push(obj);
                }
                else if(json.towerlist[i].startsWith("towerSp")) {
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
                                        <span>{txtTower.main.desc[lang]}</span>
                                    </Col>
                                    <Col xs="12">
                                        <span>
                                            <Button tag={Link} to={"/tower/howto"}>
                                                {txtTower.main.howto[lang]}
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
                                <h3>{txtTower.main.skilltower[lang]}&nbsp;GuitarFreaks</h3>
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
                                <h3>{txtTower.main.skilltower[lang]}&nbsp;DrumMania</h3>
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
                                <h3>{txtTower.main.sptower[lang]}</h3>
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