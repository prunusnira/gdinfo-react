import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import txtSnapshot from './txtsnapshot';
import LData from '../../Common/language';

import {
    Row,
    Col,
    Button
} from 'reactstrap';

interface Props {
    date: Array<string>,
    id: string,
    gtype: string
}

class SnapshotItem extends Component<Props> {
    lang = LData.lang;

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
                                        {(txtSnapshot.btnN as any)[this.lang]}
                                    </Button>
                                    <Button tag={Link} to={"/skill/snapshot/view/sh/"+uid+"/"+d+"/"+gtype}>
                                        {(txtSnapshot.btnS as any)[this.lang]}
                                    </Button>
                                    <Button charset='UTF-8' tag={Link} to={"/file/snapshot/"+uid+"/"+d+"_"+gtype+".json"}>
                                        {(txtSnapshot.btnD as any)[this.lang]}
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