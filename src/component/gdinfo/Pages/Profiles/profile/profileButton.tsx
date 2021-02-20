import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import txtProfile from './txtprofile';
import LData from '../../Common/language';
import {
    Col,
    Button
} from 'reactstrap';

import CommonData from '../../Common/commonData';

interface Props {
    self: boolean,
    id: string
}

class ProfileButton extends Component<Props> {
    lang = LData.lang;

    towerUpdate() {
		if(window.confirm((txtProfile.towerupdate.alert as any)[this.lang])) {
			axios.post(CommonData.dataUrl+'profile/towerupdate/'+this.props.id)
			.then((res) => {
				alert((txtProfile.towerupdate.done as any)[this.lang]);
			});
		}
    }

    render() {
        if(this.props.self) {
            return (
                <Fragment>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} tag={Link} to={"/mybest/"+this.props.id}>
                            {(txtProfile.button.mybest as any)[this.lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/cleartable/"+this.props.id}>
                            {(txtProfile.button.clearRankTable as any)[this.lang]}
                        </Button>
                    </Col>
                    <Col xs="12" className="btn-group">
                        <Button style={{width:"100%"}} onClick={this.towerUpdate}>
                            {(txtProfile.button.towerupdate as any)[this.lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/profile/towerstatus/"+this.props.id}>
                            {(txtProfile.button.towerstatus as any)[this.lang]}
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
                            {(txtProfile.button.clearRankTable as any)[this.lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/mybest/"+this.props.id}>
                            {(txtProfile.button.mybest as any)[this.lang]}
                        </Button>
                        <Button style={{width:"100%"}} tag={Link} to={"/profile/towerstatus/"+this.props.id}>
                            {(txtProfile.button.towerstatus as any)[this.lang]}
                        </Button>
                    </Col>
                </Fragment>
            )
        }
    }
}

export default ProfileButton;