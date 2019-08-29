import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import txtProfile from './txtprofile';
import LData from '../../js/language';
import {
    Row,
    Col,
    Button
} from 'reactstrap';

const lang = LData.lang;

class ProfileButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.self) {
            return (
                <Fragment>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:100+'%'}} tag={Link} to={"/skill/2/"+this.props.id+"/gf/1/skilldesc"}>
                            {txtProfile.button.chkpskill[lang]} GF
                        </Button>
                        <Button style={{width:100+'%'}} tag={Link} to={"/skill/2/"+this.props.id+"/dm/1/skilldesc"}>
                            {txtProfile.button.chkpskill[lang]} DM
                        </Button>
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:100+'%'}}></Button>
                        <Button style={{width:100+'%'}}></Button>
    
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:100+'%'}}></Button>
                        <Button style={{width:100+'%'}}></Button>
    
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:100+'%'}}></Button>
                        <Button style={{width:100+'%'}}></Button>
    
                    </Col>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Col xs="12" className="btn-group">
                    <Button style={{width:100+'%'}}></Button>
                    <Button style={{width:100+'%'}}></Button>
                </Col>
                <Col xs="12" className="btn-group">
                    <Button style={{width:100+'%'}}></Button>
                    <Button style={{width:100+'%'}}></Button>

                </Col>
                <Col xs="12" className="btn-group">
                    <Button style={{width:100+'%'}}></Button>
                    <Button style={{width:100+'%'}}></Button>

                </Col>
                <Col xs="12" className="btn-group">
                    <Button style={{width:100+'%'}}></Button>
                    <Button style={{width:100+'%'}}></Button>

                </Col>
            </Fragment>
        )
    }
}

export default ProfileButton;