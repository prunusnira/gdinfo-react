import React, {Component} from 'react';
import TableData from './tableData';

interface Props {
    list: Array<TableData>
}

class ClearTableRow extends Component<Props> {
    render() {
        return (
            this.props.list.map((clear, i) => {
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
        )
    }
}

export default ClearTableRow;