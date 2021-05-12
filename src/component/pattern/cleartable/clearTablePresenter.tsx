import {Link} from 'react-router-dom'
import ClearTableRow from './clearTableRow'
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../styled/styledCommon'
import React from 'react'
import ClearTableData from './clearTableData'

interface Props {
    profileLink: string,
    titleTower: string,
    userName: string,
    glist: Array<ClearTableData>,
    dlist: Array<ClearTableData>,
}

const ClearTablePresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Clear Status Table</h3>
                </BodyHeader>
                <BodyContent id="profile" className="text-center">
                    <Link to={props.profileLink} className='innerhref'
                        style={{fontSize:"130%"}}>
                            {
                                (function() {
                                    if(props.titleTower !== '') {
                                        return <img alt="titletower"
                                            src={`${process.env.PUBLIC_URL}/general-img/title/${props.titleTower}.png`} />
                                    }
                                })()
                            }
                        {props.userName} ⓟ
                    </Link>
                </BodyContent>
            </ItemRow>
            {/* Rank table for GF */}
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>GuitarFreaks</h3>
                </BodyHeader>
                <BodyContent>
                    <div className="div-table" id="gcleartable">
                        <div className="div-table-header">
                            <div className="div-table-cell">Rank</div>
                            <div className="div-table-cell">EXC</div>
                            <div className="div-table-cell">SS</div>
                            <div className="div-table-cell">S</div>
                            <div className="div-table-cell">A</div>
                            <div className="div-table-cell">B</div>
                            <div className="div-table-cell">C</div>
                            <div className="div-table-cell">Failed</div>
                            <div className="div-table-cell">NoPlay</div>
                            <div className="div-table-cell">Total</div>
                        </div>
                        <ClearTableRow list={props.glist} />
                    </div>
                </BodyContent>
            </ItemRow>
            {/* Rank table for DM */}
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>DrumMania</h3>
                </BodyHeader>
                <BodyContent>
                    <div className="div-table" id="dcleartable">
                        <div className="div-table-header">
                            <div className="div-table-cell">Rank</div>
                            <div className="div-table-cell">EXC</div>
                            <div className="div-table-cell">SS</div>
                            <div className="div-table-cell">S</div>
                            <div className="div-table-cell">A</div>
                            <div className="div-table-cell">B</div>
                            <div className="div-table-cell">C</div>
                            <div className="div-table-cell">Failed</div>
                            <div className="div-table-cell">NoPlay</div>
                            <div className="div-table-cell">Total</div>
                        </div>
                        <ClearTableRow list={props.dlist} />
                    </div>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default ClearTablePresenter