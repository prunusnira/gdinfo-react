import React from 'react';
import {Link} from 'react-router-dom';
import txtFooter from './txtfooter';

import store from '../../mobx/store';
import { Footer } from '../../styled/styledOverall';
import { FooterOuter } from '../../styled/styledFooter';
import { ItemCol, ItemRow } from '../../styled/styledCommon';

const GDFooter = () =>{
    const lang = store.language.lang

    const langChange = (type: string) => {
        store.language.setLang(type)
    }

    return (
        <Footer>
            <FooterOuter>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        <b>{(txtFooter.langsel as any)[lang]}</b><br/>
                        <a href="#no_div" onClick={() => langChange('ko')}>한국어</a><br/>
                        <a href="#no_div" onClick={() => langChange('jp')}>日本語</a><br/>
                        <a href="#no_div" onClick={() => langChange('en')}>English</a>
                    </ItemCol>
                    <ItemCol size={7} isFlatUnderLg={true}>
                        <span>Skill Navigator (c) 2016 Nira | Announcement Twitter <a href='https://twitter.com/_nira_one'>@_nira_one</a></span><br/>
                        <span>{(txtFooter.about as any)[lang]}</span><br/>
                        <span>{(txtFooter.fanpage as any)[lang]}</span><br/>
                        <span>Developed with ReactJS, SpringBoot, MariaDB, MobX and styled-components</span><br/>
                        <span>Hosted on AWS S3 and Lightsail</span>
                    </ItemCol>
                </ItemRow>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        Github<br/>
                        <a href="https://github.com/prunusnira/gdinfo-react" target="_blank" rel="noopener noreferrer">Frontend</a><br/>
                        <a href="https://github.com/prunusnira/gdinfo-public" target="_blank" rel="noopener noreferrer">Backend</a>
                    </ItemCol>
                    <ItemCol size={7} isFlatUnderLg={true}>
                        <span>
                            Icons by<br/>
                            Smashicons from flaticon(CC 3.0 BY) https://www.flaticon.com/authors/smashicons<br/>
                            Linkware http://www.iconsmind.com required<br/>
                            Design Contest http://www.designcontest.com
                        </span>
                    </ItemCol>
                </ItemRow>
            </FooterOuter>
        </Footer>
    )
}

export default GDFooter;