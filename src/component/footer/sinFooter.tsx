import React from 'react';

import store from '../../mobx/store';
import { Footer } from '../../styled/styledOverall';
import { FooterOuter } from '../../styled/styledFooter';
import { ItemCol, ItemRow } from '../../styled/styledCommon';

import txtFooterKo from '../../lang/footer/txtfooter-ko';
import txtFooterJp from '../../lang/footer/txtfooter-jp';
import txtFooterEn from '../../lang/footer/txtfooter-en';
import { ImageTitle } from '../../styled/styledHeader';
import { observer } from 'mobx-react';

const SinFooter = observer(() =>{
    const lang = store.language.lang

    const langChange = (type: string) => {
        store.language.setLang(type)
    }

    const txtFooter =
        lang === 'ko' ? txtFooterKo :
            lang === 'jp' ? txtFooterJp : txtFooterEn

    return (
        <Footer>
            <FooterOuter>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        <ImageTitle alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/logoidx.png`}/>
                    </ItemCol>
                    <ItemCol size={7} isFlatUnderLg={true}>
                        <span>(c) 2016 Nira</span><br/>
                        <span>Twitter <a href='https://twitter.com/_nira_one'>@_nira_one</a></span><br/>
                    </ItemCol>
                </ItemRow>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        <b>{txtFooter.langsel}</b><br/>
                        <a href="#no_div" onClick={() => langChange('ko')}>한국어</a><br/>
                        <a href="#no_div" onClick={() => langChange('jp')}>日本語</a><br/>
                        <a href="#no_div" onClick={() => langChange('en')}>English</a>
                    </ItemCol>
                    <ItemCol size={7} isFlatUnderLg={true}>
                        <span>{txtFooter.about}</span><br/>
                        <span>{txtFooter.fanpage}</span><br/>
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
})

export default SinFooter;