import React from "react";
import UserLoginInfo from "./LoginInfo";

import "./index.css";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import { Button } from "@/styled/styledCommon";
import { Link } from "react-router-dom";

import txtIndexKo from "@/lang/index/txtIndex-ko";
import txtIndexJp from "@/lang/index/txtIndex-jp";
import txtIndexEn from "@/lang/index/txtIndex-en";
import {
    IndexContainer,
    IndexContent,
    IndexImg,
    IndexRow,
    IndexScript,
    IndexScriptWrapper,
    IndexTitle,
} from "./index.style";

const IndexPage = observer(() => {
    const { language, loginUser, loginStatus } = store;
    const lang = language.lang;

    const txtIndex = lang === "ko" ? txtIndexKo : lang === "jp" ? txtIndexJp : txtIndexEn;

    return (
        <>
            <IndexContainer>
                {(function () {
                    if (loginStatus.isSigned) {
                        return (
                            <>
                                <IndexTitle>
                                    <h4>{txtIndex.self.title}</h4>
                                </IndexTitle>
                                <IndexContent>
                                    <UserLoginInfo />
                                    <IndexRow>
                                        <Link to="/profile">
                                            <Button>Profile</Button>
                                        </Link>
                                        <Link to="/myskill/gf">
                                            <Button>GF Skill</Button>
                                        </Link>
                                        <Link to="/myskill/dm">
                                            <Button>DM Skill</Button>
                                        </Link>
                                        <Link to="/mybest">
                                            <Button>My Best</Button>
                                        </Link>
                                        <Link to="/tower/index">
                                            <Button>Tower</Button>
                                        </Link>
                                    </IndexRow>
                                </IndexContent>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <IndexTitle>
                                    <h4>{txtIndex.self.title}</h4>
                                </IndexTitle>
                                <IndexContent>
                                    <UserLoginInfo />
                                </IndexContent>
                            </>
                        );
                    }
                })()}

                <IndexTitle>
                    <h4>{txtIndex.about.title}</h4>
                </IndexTitle>
                <IndexContent>
                    {txtIndex.about.cont}
                    <br />
                    <a href="https://twitter.com/_nira_one">@_nira_one</a>
                </IndexContent>

                <IndexTitle>
                    <h4>{txtIndex.howto.title}</h4>
                </IndexTitle>
                <IndexContent>1. {txtIndex.howto.desc}</IndexContent>
                <IndexContent>
                    <IndexScriptWrapper>
                        <IndexTitle>{txtIndex.howto.script}</IndexTitle>
                        <IndexContent>
                            {loginStatus.isSigned ? (
                                txtIndex.howto.addrLogin
                            ) : (
                                <b style={{ color: "yellow" }}>★{txtIndex.howto.addrNoLogin}</b>
                            )}
                        </IndexContent>
                        <IndexScript>
                            {loginStatus.isSigned ? (
                                <b>
                                    javascript:$.getScript('https://sindata.nira.one/$/update?token=
                                    {loginUser.user.token}');
                                </b>
                            ) : (
                                <b>Please login first</b>
                            )}
                        </IndexScript>
                    </IndexScriptWrapper>
                </IndexContent>
                <IndexContent>
                    <IndexRow>{txtIndex.howto.desc2}</IndexRow>
                    <IndexRow>({txtIndex.howto.desc3})</IndexRow>
                    <IndexImg
                        alt="favo"
                        src={process.env.PUBLIC_URL + "/general-img/howto/howto1-register.png"}
                    />
                    <IndexRow>※{txtIndex.howto.desc4}</IndexRow>

                    <IndexImg
                        alt="favo"
                        src={process.env.PUBLIC_URL + "/general-img/howto/howto2-browser.png"}
                    />
                    <IndexRow>※{txtIndex.howto.desc4}</IndexRow>
                    <IndexRow>※{txtIndex.howto.browser}</IndexRow>
                    <IndexRow>Google Chrome (for all OS), Safari (for iOS)</IndexRow>

                    <IndexImg
                        alt="favo"
                        src={process.env.PUBLIC_URL + "/general-img/howto/howto3-k.png"}
                    />

                    <IndexImg
                        alt="favo"
                        src={process.env.PUBLIC_URL + "/general-img/howto/howto3-j.png"}
                    />
                </IndexContent>
            </IndexContainer>
        </>
    );
});

export default IndexPage;
