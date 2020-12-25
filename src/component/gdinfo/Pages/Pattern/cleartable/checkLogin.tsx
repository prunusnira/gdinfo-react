import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoginInfo} from '../../../Redux/action';
import { StoreState } from '../../../Redux/reducer';

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

class CTLoginChk extends Component<Props> {
    render() {
        if(this.props.login) {
            return <Redirect to={"/cleartable/"+this.props.userinfo.id} />
        }
        else {
            return <Redirect to={"/error/500"} />
        }
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(CTLoginChk);