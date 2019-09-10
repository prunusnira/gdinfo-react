import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class PTListItemRow extends Component {
    render() {
        return (
            <Fragment>
            {
                this.props.list.map((diff, i) => {
                    return (
                        <div className='div-table-row'>
                            <div className='div-table-cell'>
                                {diff.diff}
                            </div>
                            <div className='div-table-cell'>
                                <Link className='innerhref' to={diff.glink}>
                                    {diff.glv}
                                </Link>
                            </div>
                            <div className='div-table-cell'>
                                <Link className='innerhref' to={diff.blink}>
                                    {diff.blv}
                                </Link>
                            </div>
                            <div className='div-table-cell'>
                                <Link className='innerhref' to={diff.dlink}>
                                    {diff.dlv}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default PTListItemRow;