import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class EXC extends Component {
    render() {
        const urlprop = this.props.match.params;
        return (
            <Redirect to={"/skill/1000/1/"+urlprop.gtype+"/1/1"} />
        )
    }
}

export default EXC;