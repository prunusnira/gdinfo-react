import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class TowerListImg extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((tower, i) => {
                        return (
                            <Link to={tower.link}>
                                <img alt="towerimg"
                                    style={{width:"48%", height:"auto"}}
                                    src={tower.img} />
                            </Link>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default TowerListImg;