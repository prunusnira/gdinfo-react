import { ISkillRank } from '@/data/skill/ISkillRank';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtSrankEn from '@/lang/skill/ranking/txtSkillRank-en';
import txtSrankJp from '@/lang/skill/ranking/txtSkillRank-jp';
import txtSrankKo from '@/lang/skill/ranking/txtSkillRank-ko';
import SingleSkillColorChanger from '@/module/common/skillcolor';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import {
    SRIcon,
    SRInfoWrapper,
    SRItemWrapper,
    SRNum,
    SRSkillVal,
    SRSkillWrapper,
    SRUpdate,
    SRUser,
} from './rankingItem.style';

interface Props {
    rank: ISkillRank;
}

const SkillRankingItem = ({ rank }: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtSrank = lang === 'ko' ? txtSrankKo : lang === 'jp' ? txtSrankJp : txtSrankEn;

    return (
        <SRItemWrapper dark={dark}>
            <SRNum>{rank.index}</SRNum>
            <SRInfoWrapper>
                <SRUser>
                    {rank.towertitle !== '' && <SRIcon src={rank.towertitle} />}
                    <ThemedLink dark={dark} to={rank.profile}>
                        {rank.username}
                    </ThemedLink>
                </SRUser>
                <SRUpdate>
                    {txtSrank.table.uptime} {rank.time}
                </SRUpdate>
            </SRInfoWrapper>
            <SRSkillWrapper>
                <SRSkillVal>
                    <SingleSkillColorChanger
                        skill={parseFloat(rank.gskill)}
                        link={rank.glink}
                    />
                </SRSkillVal>
                <SRSkillVal>
                    <SingleSkillColorChanger
                        skill={parseFloat(rank.dskill)}
                        link={rank.dlink}
                    />
                </SRSkillVal>
            </SRSkillWrapper>
        </SRItemWrapper>
    );
};

export default SkillRankingItem;
