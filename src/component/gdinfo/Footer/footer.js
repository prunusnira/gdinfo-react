import React, {Component} from 'react';
import './footer.css';
import LData from '../Pages/Common/language';
import txtFooter from './txtfooter';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

const lang = LData.lang;

class GDFooter extends Component {
    langChange(type) {
        document.cookie = "lang="+type+"; path=/";
        window.location.reload();
    }

    render() {
        return (
            <footer className="footer">
                <Container className='innerfooter'>
                    <Row className='footerrow'>
                        <Col xs="6">
                            <b>{txtFooter.langsel[lang]}</b><br/>
                            <a href="#no_div" onClick={() => this.langChange('ko')}>한국어</a><br/>
                            <a href="#no_div" onClick={() => this.langChange('jp')}>日本語</a><br/>
                            <a href="#no_div" onClick={() => this.langChange('en')}>English</a>
                        </Col>
                        <Col xs="6">
    
                        </Col>
                    </Row>
                    <Row className='footerrow'>
                        <Col xs="12">
                            <span dangerouslySetInnerHTML={{__html: txtFooter.p1}} /><br/>
                            <span dangerouslySetInnerHTML={{__html: txtFooter.p2}} /><br/>
                            <span>{txtFooter.about[lang]}</span>
                        </Col>
                    </Row>
                    <Row className='footerrow'>
                        <Col xs="12">
                            <span>
                                Icons by<br/>
                                Smashicons from flaticon(CC 3.0 BY) https://www.flaticon.com/authors/smashicons<br/>
                                Linkware http://www.iconsmind.com required<br/>
                                Design Contest http://www.designcontest.com
                            </span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}

export default GDFooter;