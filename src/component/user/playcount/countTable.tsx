import React, {Component} from 'react';
import txtPlayCount from './txtplaycount';

import {
    Row,
    Col
} from 'reactstrap';
import PlaycountData from './playcountData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';

interface Props {
    data: Array<PlaycountData>
}

const CountTable = observer((props: Props) => {
    const lang = store.language.lang

    return (
        <Row>
        {
            props.data.map(d => {
                return (
                    <Col key={d.key} lg="2" xs="4" sm="3" className="text-center" style={{height:"200px"}}>
                        <span style={{display:"block", margin:"0 auto"}}>
                            <img alt="jacket-img" className='listimg-skill' src={d.jacket}
                                onError={(e) => {
                                    e.currentTarget.onerror = null
                                    e.currentTarget.src=process.env.PUBLIC_URL+"/general-img/empty.jpg";
                                }} /><br/>
                            {
                                (function() {
                                    if(d.pattern !== "") {
                                        // 이미지
                                        return <img alt="pattern-type" style={{width:"90px"}} src={d.pattern} />
                                    }
                                    else {
                                        // 빈칸
                                        return <span></span>
                                    }
                                })()
                            }
                        </span>
                        <span style={{fontSize:"80%"}}>
                            {d.number}. {d.name}<br/>
                            {d.count}{(txtPlayCount.table.time as any)[lang]}
                        </span>
                    </Col>
                )
            })
        }
        </Row>
    )
})

export default CountTable;