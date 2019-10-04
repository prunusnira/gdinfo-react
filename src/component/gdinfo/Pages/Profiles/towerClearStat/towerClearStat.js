import React, {Component} from 'react';
import axios from 'axios';
import txtTowerStat from './txttowerstat';
import LData from '../../Common/language';
import {towerName} from '../../Tower/towername';
import {titlesp} from '../../Tower/titletxt';
import TowerStatTable from './towerStatTable';
import TitleStatTable from './titleStatTable';

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

class TowerClearStat extends Component {
    lang = LData.lang;

    constructor(props) {
        super(props);

        this.state = {
            towerlist: [],
            titlelist: []
        };
    }

    componentDidMount() {
        this.loadTowerClearData(this.props.match.params);
        this.loadFloorClearData(this.props.match.params);
    }

    loadTowerClearData(prop) {
        axios.post(commonData.commonDataURL+"profile/towerstatus/tower/"+prop.id)
        .then((res) => {
            const json = res.data;
            const list = json.list;
            const tower = json.tower;
            const towerlist = [];

            for(let i = 0; i < list.length; i++) {
                const obj = {};
                obj.tower = towerName[list[i]][this.lang];
                obj.floors = [];
                
                for(let j = 0; j < tower.length; j++) {
                    if(list[i] === tower[j].tower) {
                        const floor = (tower[j].floor+1)+txtTowerStat.floor[this.lang];
                        let clear = "";
                        if(tower[j].clear == "Y") clear = "Cleared";
                        else clear = "Not cleared";
                        obj.floors.push({floor:floor, clear: clear});
                    }
                }
                if(obj.cont == "") obj.cont = txtTowerStat.nodata[this.lang];
                towerlist.push(obj);
            }

            this.setState({
                towerlist: towerlist
            });
        });
    }

    loadFloorClearData(prop) {
        axios.post(commonData.commonDataURL+"profile/towerstatus/floor/"+prop.id)
        .then((res) => {
            const json = res.data;
            const floor = json.floor;
            const titlelist = [];

            for(let i = 0; i < floor.length; i++) {
                const t = titlesp[floor[i].mid];
                if(t != null) {
                    if(t.type === 0 && t[floor[i].ptcode] != null) {
                        const obj = {};
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                        obj.name = t[floor[i].ptcode][this.lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 1) {
                        const obj = {};
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj.name = t[this.lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 2) {
                        if(t[floor[i].ptcode] != null) {
                            const obj = {};
                            obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                            obj.name = t[floor[i].ptcode][this.lang];
                            titlelist.push(obj);
                        }
                        const obj2 = {};
                        obj2.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj2.name = t[this.lang];
                        titlelist.push(obj2);
                    }
                }
            }

            this.setState({
                titlelist: titlelist
            });
        });
    }

    render() {
        const self = this;

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h3>Tower clear status</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" id="top">
                        <Button href='#titlesection'>
                            {txtTowerStat.btntitle[self.lang]}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h4>{txtTowerStat.towerhead[self.lang]}</h4>
                            </CardHeader>
                            <CardBody>
                                <TowerStatTable list={self.state.towerlist} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button href='#top'>{txtTowerStat.btntop[self.lang]}</Button>
                    </Col>
                </Row>
                <Row id='titlesection'>
                    <Col xs="12">
                        <Card className="text-center">
                            <CardHeader>
                                <h4>{txtTowerStat.titlehead[self.lang]}</h4>
                            </CardHeader>
                            <CardBody id='titlelist'>
                                <Row>
                                    <Col xs="12">
                                        {txtTowerStat.duplicate[self.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <TitleStatTable list={self.state.titlelist} />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button href='#top'>
                            {txtTowerStat.btntop[self.lang]}
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TowerClearStat;