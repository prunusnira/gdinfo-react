import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {
    Row,
    Col,
    Button
} from 'reactstrap';

class RivalTable extends Component {
    render() {
        if(this.props.empty) {
            return <span></span>
        }
        else {
            this.props.rival.map((c, i) => {
                return (
                    <Row>
                        <Col xs="12">
                            <a class='innerhref' href={c.proflink}>
                                {c.name} ⓟ
                            </a>
                        </Col>
                        <Col xs="6" className='blackandwhite dskill'>{c.skill}</Col>
                        <Col xs="6">
                            <Button tag={Link} to={c.compbtn}>{c.comptxt}</Button>
                            <Button tag={Link} to={c.remove}>{c.removetxt}</Button>
                        </Col>
                    </Row>
                )
            });
        }
    }
}

export default RivalTable;