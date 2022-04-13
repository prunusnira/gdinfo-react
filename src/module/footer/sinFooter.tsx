import React from "react";
import { observer } from "mobx-react";
import store from "@/mobx/store";
import { Footer, FooterSection, FooterLogo, FooterOuter, FooterRow } from "./sinFooter.style";
import txtFooterKo from "@/lang/footer/txtfooter-ko";
import txtFooterJp from "@/lang/footer/txtfooter-jp";
import txtFooterEn from "@/lang/footer/txtfooter-en";

const SinFooter = observer(() => {
    const lang = store.language.lang;

    const langChange = (type: string) => {
        store.language.setLang(type);
    };

    const txtFooter = lang === "ko" ? txtFooterKo : lang === "jp" ? txtFooterJp : txtFooterEn;

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
                        <a href="#no_div" onClick={() => langChange("ko")}>
                            한국어
                        </a>
                        <br />
                        <a href="#no_div" onClick={() => langChange("jp")}>
                            日本語
                        </a>
                        <br />
                        <a href="#no_div" onClick={() => langChange("en")}>
                            English
                        </a>
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
});

export default SinFooter;
