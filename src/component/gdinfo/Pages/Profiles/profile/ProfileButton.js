import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import txtProfile from './txtprofile';
import LData from '../../Common/language';
import {
    Col,
    Button
} from 'reactstrap';

const lang = LData.lang;

class ProfileButton extends Component {
    addAsRival(gtype) {
        axios.get("/d/rivaladd/"+this.props.id+"/gf"+gtype)
        .then((res) => {
            if(res.data === true) {
                alert("Rival is added successfully");
            }
            else {
                return <Redirect push to="/rivalfail" />
            }
        });
    }

    towerUpdate() {
		if(window.confirm(txtProfile.towerupdate.alert[lang])) {
			axios.post('/d/profile/towerupdate/'+this.props.id)
			.then((res) => {
				alert(txtProfile.towerupdate.done[lang]);
			});
		}
    }

    render() {
        if(this.props.self) {
            return (
                <Fragment>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} tag={Link} to={"/mybest/"+this.props.id}>
                            {txtProfile.button.mybest[lang]}
                        </Button>
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} onClick={this.towerUpdate}>
                            {txtProfile.button.towerupdate[lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/profile/towerstatus/"+this.props.id}>
                            {txtProfile.button.towerstatus[lang]}
                        </Button>
                    </Col>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} tag={Link} to={"/cleartable/"+this.props.id}>
                            {txtProfile.button.clearRankTable[lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/mybest/"+this.props.id}>
                            {txtProfile.button.mybest[lang]}
                        </Button>
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} onClick={() => this.addAsRival("gf")}>
                            {"GF "+txtProfile.button.rivaladd[lang]}
                        </Button>
                        <Button style={{width:"100%"}} onClick={() => this.addAsRival("dm")}>
                            {"DM "+txtProfile.button.rivaladd[lang]}
                        </Button>
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} tag={Link} to={"/comparison/"+this.props.id+"/gf/1"}>
                            {txtProfile.button.compare[lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/profile/towerstatus/"+this.props.id}>
                            {txtProfile.button.towerstatus[lang]}
                        </Button>
                    </Col>
                </Fragment>
            )
        }
    }
}

export default ProfileButton;