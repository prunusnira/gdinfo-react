import React from "react";
import UserLoginInfo from "./LoginInfo";

import store from "@/mobx/store";
import { observer } from "mobx-react";
import { Anchor, Button, ThemedLink } from "@/styled/styledCommon";
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
                                <ContentLayout title={txtIndex.self.title} isHalf={true}>
                                    <UserLoginInfo />
                                    <IndexRow>
                                        <ThemedLink dark={dark.dark} to="/profile">
                                            <Button>Profile</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark.dark} to="/myskill/gf">
                                            <Button>GF Skill</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark.dark} to="/myskill/dm">
                                            <Button>DM Skill</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark.dark} to="/mybest">
                                            <Button>My Best</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark.dark} to="/tower/index">
                                            <Button>Tower</Button>
                                        </ThemedLink>
                                    </IndexRow>
                                </ContentLayout>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <ContentLayout title={txtIndex.self.title} isHalf={true}>
                                    <UserLoginInfo />
                                </ContentLayout>
                            </>
                        );
                    }
                })()}

                <ContentLayout title={txtIndex.about.title} isHalf={true}>
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

                <ContentLayout title={txtIndex.script.title} isHalf>
                    <IndexContent>{txtIndex.script.cont}</IndexContent>
                    <IndexContent>
                        <IndexScriptWrapper>
                            <IndexTitle>{txtIndex.script.scriptTitle}</IndexTitle>
                            <IndexContent>
                                {loginStatus.isSigned ? (
                                    txtIndex.script.scriptLogin
                                ) : (
                                    <b style={{ color: "blue" }}>
                                        ★{txtIndex.script.scriptNoLogin}
                                    </b>
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
                </ContentLayout>

                <ContentLayout title={`${txtIndex.howto.title} Step 1`} isHalf>
                    <IndexContent>
                        <IndexRow>{txtIndex.howto.desc1}</IndexRow>
                        <IndexRow>({txtIndex.howto.desc2})</IndexRow>
                        <IndexRow>※{txtIndex.howto.desc3}</IndexRow>
                        <IndexImg
                            alt="favo"
                            src={process.env.PUBLIC_URL + "/general-img/howto/howto2-browser.png"}
                        />
                        <IndexRow>※{txtIndex.howto.browser}</IndexRow>
                        <IndexRow>Google Chrome (for all OS), Safari (for iOS)</IndexRow>
                    </IndexContent>
                </ContentLayout>

                <ContentLayout title={`${txtIndex.howto.title} Step 2`} isHalf>
                    <IndexContent>
                        <IndexRow>{txtIndex.howto.desc4}</IndexRow>
                        <IndexRow>* {txtIndex.howto.lang}: 한국어, 日本語, English</IndexRow>
                        <IndexImg
                            alt="favo"
                            src={process.env.PUBLIC_URL + "/general-img/howto/howto3.png"}
                        />
                    </IndexContent>
                </ContentLayout>
            </IndexContainer>
        </CommonLayout>
    );
});

export default IndexPage;
