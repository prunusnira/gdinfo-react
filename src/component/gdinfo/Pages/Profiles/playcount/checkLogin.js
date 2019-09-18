import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/index';

class PlayCountLoginCheck extends Component {
    render() {
        if(this.props.login) {
            return <Redirect to={"/mybest/"+this.props.userinfo.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayCountLoginCheck);