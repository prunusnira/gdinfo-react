import React, {Component, Fragment} from 'react';

import {
    Col
} from 'reactstrap';
import { FloorClearData } from './towerClearData';

interface Props {
    list: Array<FloorClearData>
}

class TitleStatTable extends Component<Props> {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((t, i) => {
                        return (
                            <Col xs="12" className="text-left">
                                <img alt="towertitle" className="towertitle50" src={t.src} />
                                <span>{t.name}</span>
                            </Col>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default TitleStatTable;