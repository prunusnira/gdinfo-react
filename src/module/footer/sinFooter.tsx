import { atomLanguage } from '@/jotai/language';
import txtFooterEn from '@/lang/footer/txtfooter-en';
import txtFooterJp from '@/lang/footer/txtfooter-jp';
import txtFooterKo from '@/lang/footer/txtfooter-ko';
import { useAtom } from 'jotai';
import React from 'react';
import { Footer, FooterLogo, FooterOuter, FooterRow, FooterSection } from './sinFooter.style';

const SinFooter = () => {
    const [lang, setLang] = useAtom(atomLanguage);

    const langChange = (type: string) => {
        setLang(type);
    };

    const txtFooter = lang === 'ko' ? txtFooterKo : lang === 'jp' ? txtFooterJp : txtFooterEn;

    return (
        <FooterOuter>
            <Footer>
                <FooterRow>
                    <FooterSection>
                        <FooterLogo
                            alt="icon"
                            src={`${process.env.PUBLIC_URL}/general-img/header/logoidx.png`}
                        />
                        <br />
                        <span>
                            (c) 2016 Nira <a href="https://twitter.com/_nira_one">@_nira_one</a>
                        </span>
                        <br />
                    </FooterSection>
                    <FooterSection>
                        <b>{txtFooter.langsel}</b>
                        <br />
                        <div onClick={() => langChange('ko')}>
                            한국어
                        </div>
                        <br />
                        <div onClick={() => langChange('jp')}>
                            日本語
                        </div>
                        <br />
                        <div onClick={() => langChange('en')}>
                            English
                        </div>
                    </FooterSection>
                </FooterRow>
                <FooterRow>
                    <FooterSection>{txtFooter.fanpage}</FooterSection>
                </FooterRow>
                <FooterRow>
                    <FooterSection>
                        Icons by
                        <br />
                        Smashicons from flaticon(CC 3.0 BY)
                        https://www.flaticon.com/authors/smashicons
                        <br />
                        Linkware http://www.iconsmind.com required
                        <br />
                        Design Contest http://www.designcontest.com
                    </FooterSection>
                </FooterRow>
            </Footer>
        </FooterOuter>
    );
};

export default SinFooter;
