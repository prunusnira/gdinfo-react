import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/index';

class ProfileLoginCheck extends Component {
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

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: () => {
            dispatch(action.setLogout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLoginCheck);