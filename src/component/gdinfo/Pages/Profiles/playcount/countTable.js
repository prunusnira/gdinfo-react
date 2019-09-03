import React, {Component} from 'react';

import {
    Row,
    Col
} from 'reactstrap';

class CountTable extends Component {
    render() {
        const data = this.props.data;
        return (
            <Row>
            {
                data.map((d, i) => {
                    return (
                        <Col key={d.key} xs="4" sm="3" className="text-center" style={{height:"200px"}}>
                            <span style={{display:"block", margin:"0 auto"}}>
                                <img className='listimg-skill' src={d.jacket} onerror='this.src="/img/music/empty.jpg"' /><br/>
                                {
                                    (function() {
                                        if(d.pattern != null || d.pattern != "") {
                                            // 이미지
                                            return <img style={{width:"90px"}} src={d.pattern} />
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
                                {d.count}{d.countstr}
                            </span>
                        </Col>
                    )
                })
            }
            </Row>
        )
    }
}

export default CountTable;