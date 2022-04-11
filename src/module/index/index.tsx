import React from "react";
import UserLoginInfo from "./LoginInfo";

import store from "@/mobx/store";
import { observer } from "mobx-react";
import { Anchor, Button } from "@/styled/styledCommon";
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
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

const IndexPage = observer(() => {
    const { language, loginUser, loginStatus, dark } = store;
    const lang = language.lang;

    const txtIndex = lang === "ko" ? txtIndexKo : lang === "jp" ? txtIndexJp : txtIndexEn;

    return (
        <CommonLayout>
            <IndexContainer>
                {(function () {
                    if (loginStatus.isSigned) {
                        return (
                            <>
                                <ContentLayout title={txtIndex.self.title}>
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
                                </ContentLayout>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <ContentLayout title={txtIndex.self.title}>
                                    <UserLoginInfo />
                                </ContentLayout>
                            </>
                        );
                    }
                })()}

                <ContentLayout title={txtIndex.about.title}>
                    <IndexContent>{txtIndex.about.cont}</IndexContent>
                    <IndexContent>
                        <Anchor
                            target="blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/_nira_one"
                            dark={dark.dark}
                        >
                            @_nira_one
                        </Anchor>
                    </IndexContent>
                </ContentLayout>

                <ContentLayout title={txtIndex.howto.title}>
                    <IndexContent>1. {txtIndex.howto.desc}</IndexContent>
                    <IndexContent>
                        <IndexScriptWrapper>
                            <IndexTitle>{txtIndex.howto.script}</IndexTitle>
                            <IndexContent>
                                {loginStatus.isSigned ? (
                                    txtIndex.howto.addrLogin
                                ) : (
                                    <b style={{ color: "blue" }}>★{txtIndex.howto.addrNoLogin}</b>
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
                </ContentLayout>
            </IndexContainer>
        </CommonLayout>
    );
});

export default IndexPage;
