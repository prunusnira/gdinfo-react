import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import txtSnapshot from './txtsnapshot';
import LData from '../../Common/language';

import {
    Row,
    Col,
    Button
} from 'reactstrap';

const lang = LData.lang;

class SnapshotItem extends Component {
    render() {
        const date = this.props.date;
        const uid = this.props.id;
        const gtype = this.props.gtype;
        return(
            <Fragment>
                {
                    date.map((d, i) => {
                        return (
                            <Row>
                                <Col md="5">
                                    {d}
                                </Col>
                                <Col md="7" className="btn-group">
                                    <Button tag={Link} to={"/skill/snapshot/view/nr/"+uid+"/"+d+"/"+gtype}>
                                        {txtSnapshot.btnN[lang]}
                                    </Button>
                                    <Button tag={Link} to={"/skill/snapshot/view/sh/"+uid+"/"+d+"/"+gtype}>
                                        {txtSnapshot.btnS[lang]}
                                    </Button>
                                    <Button charset='UTF-8' tag={Link} to={"/file/snapshot/"+uid+"/"+d+"_"+gtype+".json"}>
                                        {txtSnapshot.btnD[lang]}
                                    </Button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default SnapshotItem;