import React from 'react';
import './footer.css';
import LData from '../js/language';
import txtHeader from '../Header/txtheader';
import txtFooter from './txtfooter';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

const lang = LData.lang;

function GDFooter() {
    return (
        <footer className="footer">
            <Container className='innerfooter'>
                <Row className='footerrow'>
                    <Col xs="6">
                        <b>{txtHeader.theme[lang]}</b><br/>
                        <a href="#no_div" onClick="themeChange(0)">White</a><br/>
                        <a href="#no_div" onClick="themeChange(1)">Black</a><br/>
                        <a href="#no_div" onClick="themeChange(2)">Orange</a>
                    </Col>
                    <Col xs="6">
                        <b>{txtHeader.langsel[lang]}</b><br/>
                        <a href="#no_div" onClick="langChange('ko')">한국어</a><br/>
                        <a href="#no_div" onClick="langChange('jp')">日本語</a><br/>
                        <a href="#no_div" onClick="langChange('en')">English</a>
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

export default GDFooter;