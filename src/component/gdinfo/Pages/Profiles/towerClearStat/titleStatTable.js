import React, {Component, Fragment} from 'react';

import {
    Col
} from 'reactstrap';

class TitleStatTable extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((t, i) => {
                        return (
                            <Col xs="12" className="text-left">
                                <img className="towertitle50" src={t.src} />
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