import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {
    Row,
    Col,
    Button
} from 'reactstrap';

class SkillMenu extends Component {
    render() {
        if(parseInt(this.props.ptype) !== 1000) {
            return (
                <Fragment>
                    <Row>
                        <Col xs="12">
                            Tri-Boost
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/4/"+this.props.id+"/gf/1/skilldesc"
                                }>GF 100</Button>
                            <Button tag={Link} to={
                                    "/skill/6/"+this.props.id+"/gf/1/1"
                                }>GF Skill</Button>
                            <Button tag={Link} to={
                                    "/skill/4/"+this.props.id+"/dm/1/skilldesc"
                                }>DM 100</Button>
                            <Button tag={Link} to={
                                    "/skill/6/"+this.props.id+"/gf/1/1"
                                }>DM Skill</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            Tri-Boost Re:Evolve
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/3/"+this.props.id+"/gf/1/skilldesc"
                                }>GF 100</Button>
                            <Button tag={Link} to={
                                    "/skill/5/"+this.props.id+"/gf/1/1"
                                }>GF Skill</Button>
                            <Button tag={Link} to={
                                    "/skill/3/"+this.props.id+"/dm/1/skilldesc"
                                }>DM 100</Button>
                            <Button tag={Link} to={
                                    "/skill/5/"+this.props.id+"/gf/1/1"
                                }>DM Skill</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            Matixx
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/7/"+this.props.id+"/gf/1/skilldesc"
                                }>GF 100</Button>
                            <Button tag={Link} to={
                                    "/skill/8/"+this.props.id+"/gf/1/1"
                                }>GF Skill</Button>
                            <Button tag={Link} to={
                                    "/skill/7/"+this.props.id+"/dm/1/skilldesc"
                                }>DM 100</Button>
                            <Button tag={Link} to={
                                    "/skill/8/"+this.props.id+"/dm/1/1"
                                }>DM Skill</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            EXCHAIN
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/2/"+this.props.id+"/gf/1/1"
                                }>GF Skill</Button>
                            <Button tag={Link} to={
                                    "/skill/0/"+this.props.id+"/gf/1/skilldesc"
                                }>GF All</Button>
                            <Button tag={Link} to={
                                    "/skill/2/"+this.props.id+"/dm/1/1"
                                }>DM Skill</Button>
                            <Button tag={Link} to={
                                    "/skill/0/"+this.props.id+"/dm/1/skilldesc"
                                }>DM All</Button>
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/gf/1/y?hot=h"
                                }>GF Hot(S)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/gf/1/y?hot=o"
                                }>GF Other(S)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/dm/1/y?hot=h"
                                }>DM Hot(S)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/dm/1/y?hot=o"
                                }>DM Other(S)</Button>
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/gf/1/n?hot=h"
                                }>GF Hot(NS)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/gf/1/n?hot=o"
                                }>GF Other(NS)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/dm/1/n?hot=h"
                                }>DM Hot(NS)</Button>
                            <Button tag={Link} to={
                                    "/skill/1/"+this.props.id+"/dm/1/n?hot=o"
                                }>DM Other(NS)</Button>
                        </Col>
                    </Row>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Row>
                        <Col xs="12">
                            Theorical Skill Value
                        </Col>
                        <Col xs="12" className="btn-group">
                            <Button tag={Link} to={
                                "/exc/gf"
                            }>GF EXCELLENT</Button>
                            <Button tag={Link} to={
                                "/exc/dm"
                            }>DM EXCELLENT</Button>
                        </Col>
                    </Row>
                </Fragment>
            )
        }
    }
}

export default SkillMenu;