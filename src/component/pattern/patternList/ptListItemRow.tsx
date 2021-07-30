import React from 'react';
import {Link} from 'react-router-dom';
import { EachDiff } from './patternData';

interface Props {
    list: Array<EachDiff>
}

const PTListItemRow = (props: Props) => {
    return (
        <>
        {
            props.list.map((diff, i) => {
                return (
                    <div className='div-table-row' key={`r${i}`}>
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
        </>
    )
}

export default PTListItemRow;