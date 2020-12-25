import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoginInfo} from '../../../Redux/action';
import { StoreState } from '../../../Redux/reducer';

interface IMatchprops {
    gtype: string
}

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

class ProfileLoginCheck extends Component<RouteComponentProps<IMatchprops> & Props> {
    render() {
        if(this.props.login) {
            if(this.props.match.params.gtype === "gf") {
                return <Redirect to={"/skill/2/"+this.props.userinfo.id+"/gf/1/1"} />
            }
            else {
                return <Redirect to={"/skill/2/"+this.props.userinfo.id+"/dm/1/1"} />
            }
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

export default connect(mapStateToProps)(ProfileLoginCheck);