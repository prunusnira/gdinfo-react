import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './footer.css';
import LData from '../Pages/Common/language';
import txtFooter from './txtfooter';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

class GDFooter extends Component {
    lang = LData.lang;

    langChange(type: string) {
        document.cookie = "lang="+type+"; path=/; SameSite=None; Secure";
        window.location.reload();
    }

    render() {
        return (
            <footer className="footer">
                <Container className='innerfooter'>
                    <Row className='footerrow'>
                        <Col sm="4">
                            <b>{(txtFooter.langsel as any)[this.lang]}</b><br/>
                            <a href="#no_div" onClick={() => this.langChange('ko')}>한국어</a><br/>
                            <a href="#no_div" onClick={() => this.langChange('jp')}>日本語</a><br/>
                            <a href="#no_div" onClick={() => this.langChange('en')}>English</a>
                        </Col>
                        <Col sm="8">
                            <span>Skill Navigator (c) 2016 Nira(<a href="https://twitter.com/prunusnira" target="_blank" rel="noopener noreferrer">@prunusNira</a>)</span><br/>
                            <span>Twitter <a href='https://twitter.com/_nira_one'>@_nira_one</a> | <Link to='/terms'>Terms and Conditions</Link></span><br/>
                            <span>{(txtFooter.about as any)[this.lang]}</span><br/>
                            <span>{(txtFooter.fanpage as any)[this.lang]}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            Source Code<br/>
                            <a href="https://github.com/prunusnira/gdinfo-react" target="_blank" rel="noopener noreferrer">Frontend GitHub</a>&nbsp;|&nbsp;
                            <a href="https://github.com/prunusnira/gdinfo-public" target="_blank" rel="noopener noreferrer">Backend GitHub</a>
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