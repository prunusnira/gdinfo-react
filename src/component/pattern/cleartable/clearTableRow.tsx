import React from 'react';
import ClearTableData from './clearTableData';

interface Props {
    list: Array<ClearTableData>
}

const ClearTableRow = (props: Props) => {
    const data = props.list.map(clear => {
        return (
            <div className="div-table-row">
                <div className="div-table-cell">{clear.level}</div>
                <div className="div-table-cell">{clear.exc}</div>
                <div className="div-table-cell">{clear.ss}</div>
                <div className="div-table-cell">{clear.s}</div>
                <div className="div-table-cell">{clear.a}</div>
                <div className="div-table-cell">{clear.b}</div>
                <div className="div-table-cell">{clear.c}</div>
                <div className="div-table-cell">{clear.f}</div>
                <div className="div-table-cell">{clear.n}</div>
                <div className="div-table-cell">{clear.all}</div>
            </div>
        )
    })
    
    return (
        <>{data}</>
    )
}

export default ClearTableRow