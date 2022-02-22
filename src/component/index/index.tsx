import React from "react";
import UserLoginInfo from "./LoginInfo";

import "./index.css";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import { BodyContent, BodyHeader, ItemCol, ItemRow, Button } from "@/styled/styledCommon";
import { Link } from "react-router-dom";

import txtIndexKo from "@/lang/index/txtIndex-ko";
import txtIndexJp from "@/lang/index/txtIndex-jp";
import txtIndexEn from "@/lang/index/txtIndex-en";
import { IndexContainer, IndexLoginDiv } from "./index.style";

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
                            <IndexLoginDiv>
                                <ItemRow>
                                    <BodyHeader>
                                        <h4>{txtIndex.self.title}</h4>
                                    </BodyHeader>
                                    <BodyContent style={{ textAlign: "center" }}>
                                        <UserLoginInfo />
                                    </BodyContent>
                                    <BodyHeader>
                                        <h4>Quick Links</h4>
                                    </BodyHeader>
                                    <BodyContent style={{ textAlign: "center" }}>
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
                                    </BodyContent>
                                </ItemRow>
                            </IndexLoginDiv>
                        );
                    } else {
                        return (
                            <IndexLoginDiv>
                                <ItemRow>
                                    <BodyHeader>
                                        <h4>{txtIndex.self.title}</h4>
                                    </BodyHeader>
                                    <BodyContent style={{ textAlign: "center" }}>
                                        <UserLoginInfo />
                                    </BodyContent>
                                </ItemRow>
                            </IndexLoginDiv>
                        );
                    }
                })()}

                <ItemRow>
                    <ItemCol isFlatUnderLg={true}>
                        <BodyHeader>
                            <h4>{txtIndex.about.title}</h4>
                        </BodyHeader>
                        <BodyContent>
                            {txtIndex.about.cont}
                            <br />
                            <a href="https://twitter.com/_nira_one">@_nira_one</a>
                        </BodyContent>

                        <BodyHeader>
                            <h4>{txtIndex.howto.title}</h4>
                        </BodyHeader>
                        <BodyContent>{txtIndex.howto.desc}</BodyContent>
                        <BodyContent>
                            <ItemRow
                                style={{
                                    border: "1px solid white",
                                }}
                                setVertical={true}
                            >
                                <BodyHeader>{txtIndex.howto.script}</BodyHeader>
                                <BodyContent>
                                    <ItemRow>
                                        {(function () {
                                            if (loginStatus.isSigned) {
                                                return txtIndex.howto.addrLogin;
                                            } else {
                                                return (
                                                    <b style={{ color: "yellow" }}>
                                                        ★{txtIndex.howto.addrNoLogin}
                                                    </b>
                                                );
                                            }
                                        })()}
                                    </ItemRow>
                                    <ItemRow style={{ wordBreak: "break-all" }}>
                                        {(function () {
                                            if (loginStatus.isSigned) {
                                                return (
                                                    <b>
                                                        javascript:$.getScript('https://sindata.nira.one/$/update?token=
                                                        {loginUser.user.token}');
                                                    </b>
                                                );
                                            } else {
                                                return <b>Please login first</b>;
                                            }
                                        })()}
                                    </ItemRow>
                                </BodyContent>
                            </ItemRow>

                            <ItemRow>{txtIndex.howto.desc2}</ItemRow>
                            <ItemRow>({txtIndex.howto.desc3})</ItemRow>

                            <ItemRow>
                                <img
                                    alt="favo"
                                    className="howto-img"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/general-img/howto/howto1-register.png"
                                    }
                                />
                            </ItemRow>
                            <ItemRow>※{txtIndex.howto.desc4}</ItemRow>

                            <ItemRow>
                                <img
                                    alt="favo"
                                    className="howto-img2"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/general-img/howto/howto2-browser.png"
                                    }
                                />
                            </ItemRow>
                            <ItemRow>※{txtIndex.howto.desc4}</ItemRow>
                            <ItemRow>※{txtIndex.howto.browser}</ItemRow>
                            <ItemRow>Google Chrome (for all OS), Safari (for iOS)</ItemRow>

                            <ItemRow keepDirHor={true}>
                                <ItemCol size={5}>
                                    <img
                                        alt="favo"
                                        className="howto-img2"
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/general-img/howto/howto3-k.png"
                                        }
                                    />
                                </ItemCol>
                                <ItemCol size={5}>
                                    <img
                                        alt="favo"
                                        className="howto-img2"
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/general-img/howto/howto3-j.png"
                                        }
                                    />
                                </ItemCol>
                            </ItemRow>
                        </BodyContent>
                    </ItemCol>
                </ItemRow>
            </IndexContainer>
        </>
    );
});

export default IndexPage;
