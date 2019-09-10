import React, {Component} from 'react';

import {

} from 'reactstrap';

class ClearTableRow extends Component {
    render() {
        return (
            this.props.list.map((clear, i) => {
                return (
                    <div class="div-table-row">
                        <div class="div-table-cell">{clear.level}</div>
                        <div class="div-table-cell">{clear.exc}</div>
                        <div class="div-table-cell">{clear.ss}</div>
                        <div class="div-table-cell">{clear.s}</div>
                        <div class="div-table-cell">{clear.a}</div>
                        <div class="div-table-cell">{clear.b}</div>
                        <div class="div-table-cell">{clear.c}</div>
                        <div class="div-table-cell">{clear.f}</div>
                        <div class="div-table-cell">{clear.n}</div>
                        <div class="div-table-cell">{clear.all}</div>
                    </div>
                )
            })
        )
    }
}

export default ClearTableRow;