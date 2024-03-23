import Loading from '@/component/loading/loading';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtIndexEn from '@/lang/index/txtIndex-en';
import txtIndexJp from '@/lang/index/txtIndex-jp';
import txtIndexKo from '@/lang/index/txtIndex-ko';
import SingleSkillColorChanger from '@/module/common/skillcolor';
import { LIIcon, LIName, LIRow, LISkillRow, LIType, LIVal, LIWrapper } from '@/module/index/logininfo.style';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import useLoginInfo from './useLoginInfo';

const UserLoginInfo = () => {
    const { profile, isLoading, isError } = useLoginInfo();
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtIndex = lang === 'ko' ? txtIndexKo : lang === 'jp' ? txtIndexJp : txtIndexEn;

    if (isLoading) {
        return (
            <LIWrapper>
                <LIRow>
                    <Loading />
                </LIRow>
            </LIWrapper>
        );
    }
    if (isError) {
        return (
            <LIWrapper>
                <LIRow>
                    Failed to load data
                </LIRow>
            </LIWrapper>
        );
    }
    if (profile) {
        const imgurl = `${process.env.PUBLIC_URL}/general-img/title/${profile.titletower}.png`;
        return (
            <LIWrapper>
                <LIRow>({profile.title})</LIRow>

                <LIRow>
                    {profile.titletower !== '' && (
                        <LIIcon alt="titletower" className="towertitle35" src={imgurl} />
                    )}
                    <LIName>{profile.name}</LIName>
                </LIRow>
                <LISkillRow>
                    <LIType>
                        <b>GF</b>
                    </LIType>
                    <LIVal>
                        <SingleSkillColorChanger
                            link={`/skill/2/${profile.id}/gf/1/1`}
                            skill={profile.gskill}
                        />
                    </LIVal>
                    <LIType>
                        <b>DM</b>
                    </LIType>
                    <LIVal>
                        <SingleSkillColorChanger
                            link={`/skill/2/${profile.id}/dm/1/1`}
                            skill={profile.dskill}
                        />
                    </LIVal>
                </LISkillRow>
            </LIWrapper>
        );
    }
    return (
        <LIWrapper>
            <ThemedLink dark={dark} to="/login">
                {txtIndex.self.login}
            </ThemedLink>
            {txtIndex.self.loginFirst}
        </LIWrapper>
    );
};

export default UserLoginInfo;