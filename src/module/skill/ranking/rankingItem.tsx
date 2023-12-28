import { ISkillRank } from '@/data/ISkillRank';
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
    rank: Array<ISkillRank>;
    gtype: string;
}

const SkillRankingItem = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtSrank = lang === 'ko' ? txtSrankKo : lang === 'jp' ? txtSrankJp : txtSrankEn;

    return (
        <>
            {props.rank.map((r) => (
                <SRItemWrapper dark={dark}>
                    <SRNum>{r.index}</SRNum>
                    <SRInfoWrapper>
                        <SRUser>
                            {r.towertitle !== '' && <SRIcon src={r.towertitle} />}
                            <ThemedLink dark={dark} to={r.profile}>
                                {r.username}
                            </ThemedLink>
                        </SRUser>
                        <SRUpdate>
                            {txtSrank.table.uptime} {r.time}
                        </SRUpdate>
                    </SRInfoWrapper>
                    <SRSkillWrapper>
                        <SRSkillVal>
                            <SingleSkillColorChanger
                                skill={parseFloat(r.gskill)}
                                link={r.glink}
                            />
                        </SRSkillVal>
                        <SRSkillVal>
                            <SingleSkillColorChanger
                                skill={parseFloat(r.dskill)}
                                link={r.dlink}
                            />
                        </SRSkillVal>
                    </SRSkillWrapper>
                </SRItemWrapper>
            ))}
        </>
    );
};

export default SkillRankingItem;
