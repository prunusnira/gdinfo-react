import React, {Component} from 'react';
import axios from 'axios';
import txtTowerStat from './txttowerstat';
import LData from '../../Common/language';
import {titlesp} from '../../Tower/titletxt';
import TowerStatTable from './towerStatTable';
import TitleStatTable from './titleStatTable';
import {TowerClearData, TowerFloorData, FloorClearData} from './towerClearData';
import {towerName} from '../../Tower/towername';

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
import { RouteComponentProps } from 'react-router-dom';

interface IMatchProps {
    id: string
}

interface State {
    towerlist: Array<TowerClearData>,
    titlelist: Array<FloorClearData>
}

class TowerClearStat extends Component<RouteComponentProps<IMatchProps>, State> {
    lang = LData.lang;
    
    state: State = {
        towerlist: [],
        titlelist: []
    };

    componentDidMount() {
        this.loadTowerClearData(this.props.match.params);
        this.loadFloorClearData(this.props.match.params);
    }

    loadTowerClearData(prop: IMatchProps) {
        axios.post(CommonData.dataUrl+"profile/towerstatus/tower/"+prop.id)
        .then((res) => {
            const json = res.data;
            const list = JSON.parse(json.list);
            const tower = JSON.parse(json.tower);
            const towerlist = new Array<TowerClearData>();

            for(let i = 0; i < list.length; i++) {
                const obj = new TowerClearData();
                obj.tower = (towerName as any)[list[i]][this.lang];
                // Eval을 사용한 트릭
                obj.floors = new Array<TowerFloorData>();
                
                for(let j = 0; j < tower.length; j++) {
                    if(list[i] === tower[j].tower) {
                        const floor = (tower[j].floor+1)+(txtTowerStat.floor as any)[this.lang];
                        let clear = "";
                        if(tower[j].clear === "Y") clear = "Cleared";
                        else clear = "Not cleared";
                        obj.floors.push({floor:floor, clear: clear});
                    }
                }
                if(obj.cont === "") obj.cont = (txtTowerStat.nodata as any)[this.lang];
                towerlist.push(obj);
            }

            this.setState({
                towerlist: towerlist
            });
        });
    }

    loadFloorClearData(prop: IMatchProps) {
        axios.post(CommonData.dataUrl+"profile/towerstatus/floor/"+prop.id)
        .then((res) => {
            const json = res.data;
            const floor = JSON.parse(json.floor);
            const titlelist = [];

            for(let i = 0; i < floor.length; i++) {
                const t = (titlesp as any)[floor[i].mid];
                if(t != null) {
                    if(t.type === 0 && t[floor[i].ptcode] != null) {
                        const obj = new FloorClearData();
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                        obj.name = t[floor[i].ptcode][this.lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 1) {
                        const obj = new FloorClearData();
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj.name = t[this.lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 2) {
                        if(t[floor[i].ptcode] != null) {
                            const obj = new FloorClearData();
                            obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                            obj.name = t[floor[i].ptcode][this.lang];
                            titlelist.push(obj);
                        }
                        const obj2 = new FloorClearData();
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
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <h3>Tower clear status</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" id="top">
                        <Button href='#titlesection'>
                            {(txtTowerStat.btntitle as any)[self.lang]}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h4>{(txtTowerStat.towerhead as any)[self.lang]}</h4>
                            </CardHeader>
                            <CardBody>
                                <TowerStatTable list={self.state.towerlist} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button href='#top'>
                            {(txtTowerStat.btntop as any)[self.lang]}
                        </Button>
                    </Col>
                </Row>
                <Row id='titlesection'>
                    <Col xs="12">
                        <Card className="text-center">
                            <CardHeader>
                                <h4>{(txtTowerStat.titlehead as any)[self.lang]}</h4>
                            </CardHeader>
                            <CardBody id='titlelist'>
                                <Row>
                                    <Col xs="12">
                                        {(txtTowerStat.duplicate as any)[self.lang]}
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
                            {(txtTowerStat.btntop as any)[self.lang]}
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TowerClearStat;