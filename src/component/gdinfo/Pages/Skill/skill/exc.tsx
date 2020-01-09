import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';

interface IMatchProps {
    gtype: string
}

class EXC extends Component<RouteComponentProps<IMatchProps>> {
    render() {
        const urlprop = this.props.match.params;
        return (
            <Redirect to={"/skill/1000/1/"+urlprop.gtype+"/1/1"} />
        )
    }
}

export default EXC;