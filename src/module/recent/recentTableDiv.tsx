import { IRecent } from '@/data/IRecent';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import TxtCommonEn from '@/lang/common/txtCommon-en';
import TxtCommonJp from '@/lang/common/txtCommon-jp';
import TxtCommonKo from '@/lang/common/txtCommon-ko';
import txtProfileEn from '@/lang/user/profile/txtProfile-en';
import txtProfileJp from '@/lang/user/profile/txtProfile-jp';
import txtProfileKo from '@/lang/user/profile/txtProfile-ko';
import SingleSkillColorChanger from '@/module/common/skillcolor';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import {
    EmptyUser,
    RecentSkillCol,
    RecentSkillRow,
    RecentSkillType,
    RecentUserRow,
    UpdateTime,
    UserName,
    UserNameCol,
    UserSkillCol,
} from './recentTableDiv.style';

interface Props {
    isMain: boolean;
    list: Array<IRecent>;
}

const RecentTableDiv = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtProfile = lang === 'ko' ? txtProfileKo : lang === 'jp' ? txtProfileJp : txtProfileEn;

    const TxtCommon = lang === 'ko' ? TxtCommonKo : lang === 'jp' ? TxtCommonJp : TxtCommonEn;

    const mapdata = props.list.map((user, i) => {
        const uptime = new Date(user.updatetime).getTime();
        const date = new Date().getTime() - uptime;
        const hour = date / 60000 / 60;
        const min = (date / 60000) % 60;

        return (
            <RecentUserRow key={`recent${i}`}>
                <UserNameCol>
                    <UserName>
                        {user.titletower !== '' && (
                            <img
                                alt="titletower"
                                className="towertitle35"
                                style={{ marginRight: '5px' }}
                                src={`${process.env.PUBLIC_URL}/general-img/title/${user.titletower}.png`}
                            />
                        )}
                        {user.opencount === 'Y' ? (
                            <ThemedLink dark={dark} to={`/profile/${user.id}`}>
                                {user.name !== '' ? `${user.name}` : `(NO NAME)`}
                            </ThemedLink>
                        ) : (
                            <EmptyUser dark={dark}>{txtProfile.table1.emptyname}</EmptyUser>
                        )}
                    </UserName>
                    <UpdateTime>
                        {`${Math.floor(hour)}${TxtCommon.other.hrs} ${Math.floor(min)}${
                            TxtCommon.other.mins
                        }`}
                    </UpdateTime>
                </UserNameCol>
                <UserSkillCol>
                    <RecentSkillRow>
                        <RecentSkillType>GF</RecentSkillType>
                        <RecentSkillCol>
                            <SingleSkillColorChanger
                                skill={user.gskill}
                                link={
                                    user.opencount === 'Y' ? `/skill/2/${user.id}/gf/1/1` : '#none'
                                }
                            />
                        </RecentSkillCol>
                    </RecentSkillRow>
                    <RecentSkillRow>
                        <RecentSkillType>DM</RecentSkillType>
                        <RecentSkillCol>
                            <SingleSkillColorChanger
                                skill={user.dskill}
                                link={
                                    user.opencount === 'Y' ? `/skill/2/${user.id}/dm/1/1` : '#none'
                                }
                            />
                        </RecentSkillCol>
                    </RecentSkillRow>
                </UserSkillCol>
            </RecentUserRow>
        );
    });

    return <>{mapdata}</>;
};

export default RecentTableDiv;
