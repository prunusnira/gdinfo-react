import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoginInfo} from '../../../Redux/action';
import { TokenState, StoreState } from '../../../Redux/reducer';

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

class NotPlayedLoginCheck extends Component<Props> {
    render() {
        if(this.props.login) {
            return <Redirect to={"/notplayed/gf/"+this.props.userinfo.id+"/0/1"} />
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

export default connect(mapStateToProps)(NotPlayedLoginCheck);