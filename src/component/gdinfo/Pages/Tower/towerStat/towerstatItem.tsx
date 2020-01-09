import React, {Component, Fragment} from 'react';
import TowerFloorItem from './towerFloorItem';
import txtTower from '../txttower';
import LData from '../../Common/language';
import * as towerMethod from '../towertitle';

import {
    Row,
    Col,
    Button
} from 'reactstrap';
import { TowerStatData } from './towerStatData';

interface Props {
    list: Array<TowerStatData>,
    id: string
}

class TowerStatList extends Component<Props> {
    lang = LData.lang;

	divopen(i: string) {
		const div = document.getElementById(i+"c");

        if(div) {
            if(div.style.display === "none") {
                div.style.display = "block";
            }
            else {
                div.style.display = "none";
            }
        }
    }
    
    render() {
        const self = this;
        return (
            <Fragment>
            {
                this.props.list.map((tl, i) => {
                    return (
                        <Row>
                            <Col xs="12">
                                <Row>
                                    <Col xs="2" id={tl.btnid}
                                        style={{fontSize:"125%"}}>
                                        <a className='innerhref' style={{width:"100%", height:"auto"}}
                                            href='#no_div' id={tl.topid} onClick={() => this.divopen(tl.topid)}>
                                            {tl.opbtn}
                                        </a>
                                    </Col>
                                    <Col xs="5">
                                        <a className='innerhref' style={{width:"100%", height:"auto"}}
                                            href='#no_div' id={tl.topid} onClick={() => this.divopen(tl.topid)}>
                                            Floor {tl.floor}
                                        </a>
                                    </Col>
                                    <Col xs="2">
                                        <img style={{width:"50px"}} src={tl.floorclear} />
                                    </Col>
                                    <Col xs="3">
                                        {tl.titlechangable}<br/>
                                        {
                                            (function() {
                                                if(tl.btnchangable === true) {
                                                    return (
                                                        <Button onClick={() => towerMethod.floorTitlePopup(
                                                            tl.titlechange.tower,
                                                            tl.titlechange.floor,
                                                            tl.titlechange.rate,
                                                            tl.titlechange.allfloors
                                                        )}>
                                                            {(txtTower.detail.btntitlechange as any)[self.lang]}
                                                        </Button>
                                                    )
                                                }
                                            })()
                                        }
                                    </Col>
                                </Row>
                                <div style={{display:"none"}} id={tl.floorid}>
                                    <Row>
                                        <Col xs="12">
                                            <span style={{padding:"10px"}}>
                                                {tl.clearnotice}
                                            </span>
                                        </Col>
                                    </Row>
                                    <TowerFloorItem list={tl.floorlist} />
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default TowerStatList;