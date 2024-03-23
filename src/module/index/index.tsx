import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import { atomLoginUser } from '@/jotai/loginUser';
import txtIndexEn from '@/lang/index/txtIndex-en';
import txtIndexJp from '@/lang/index/txtIndex-jp';
import txtIndexKo from '@/lang/index/txtIndex-ko';
import ComponentIndexScript from '@/module/index/script/componentIndexScript';
import { Anchor, Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import {
    IndexContainer,
    IndexContent,
    IndexImg,
    IndexRow,
} from './index.style';
import UserLoginInfo from './LoginInfo';
import IndexNotice from './notice/notice';

const IndexPage = () => {
    const lang = useAtomValue(atomLanguage);
    const loginUser = useAtomValue(atomLoginUser);
    const dark = useAtomValue(atomDarkmode);

    const txtIndex = lang === 'ko' ? txtIndexKo : lang === 'jp' ? txtIndexJp : txtIndexEn;

    return (
        <CommonLayout>
            <IndexContainer>
                {(function() {
                    if (loginUser) {
                        return (
                            <>
                                <ContentLayout title={txtIndex.self.title} isHalf={true}>
                                    <UserLoginInfo />
                                    <IndexRow>
                                        <ThemedLink dark={dark} to="/profile">
                                            <Button>Profile</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark} to="/myskill/gf">
                                            <Button>GF Skill</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark} to="/myskill/dm">
                                            <Button>DM Skill</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark} to="/mybest">
                                            <Button>My Best</Button>
                                        </ThemedLink>
                                        <ThemedLink dark={dark} to="/tower/index">
                                            <Button>Tower</Button>
                                        </ThemedLink>
                                    </IndexRow>
                                </ContentLayout>
                            </>
                        );
                    }
                    return (
                        <>
                            <ContentLayout title={txtIndex.self.title} isHalf={true}>
                                <UserLoginInfo />
                            </ContentLayout>
                        </>
                    );
                })()}

                <ContentLayout title={txtIndex.about.title} isHalf={true}>
                    <IndexContent>{txtIndex.about.cont}</IndexContent>
                    <IndexContent>
                        <Anchor
                            target="blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/_nira_one"
                            dark={dark}
                        >
                            @_nira_one
                        </Anchor>
                    </IndexContent>
                </ContentLayout>

                <ContentLayout title={txtIndex.script.title} isHalf>
                    <ComponentIndexScript />
                </ContentLayout>

                <ContentLayout
                    title={`${txtIndex.notice2.title}`}
                    isHalf
                    hasMore={true}
                    moreHref={"/notice/1"}
                >
                    <IndexNotice />
                </ContentLayout>

                <ContentLayout title={`${txtIndex.howto.title} Step 1`} isHalf>
                    <IndexContent>
                        <IndexRow>{txtIndex.howto.desc1}</IndexRow>
                        <IndexRow>({txtIndex.howto.desc2})</IndexRow>
                        <IndexRow>※{txtIndex.howto.desc3}</IndexRow>
                        <IndexImg
                            alt="favo"
                            src={`${process.env.PUBLIC_URL}/general-img/howto/howto2-browser.png`}
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
                            src={`${process.env.PUBLIC_URL}/general-img/howto/howto3.png`}
                        />
                    </IndexContent>
                </ContentLayout>
            </IndexContainer>
        </CommonLayout>
    );
};

export default IndexPage;
