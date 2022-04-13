import React from "react";
import SingleSkillColorChanger from "@/module/common/skillcolor";
import SRankData from "./srankData";
import { observer } from "mobx-react";
import store from "@/mobx/store";

import txtSrankKo from "@/lang/skill/ranking/txtSkillRank-ko";
import txtSrankJp from "@/lang/skill/ranking/txtSkillRank-jp";
import txtSrankEn from "@/lang/skill/ranking/txtSkillRank-en";
import {
    SRIcon,
    SRInfoWrapper,
    SRItemWrapper,
    SRNum,
    SRSkillVal,
    SRSkillWrapper,
    SRUpdate,
    SRUser,
} from "./rankingItem.style";
import { ThemedLink } from "@/styled/styledCommon";

interface Props {
    rank: Array<SRankData>;
    gtype: string;
}

const SkillRankingItem = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtSrank = lang === "ko" ? txtSrankKo : lang === "jp" ? txtSrankJp : txtSrankEn;

    return (
        <>
            {props.rank.map((r) => {
                return (
                    <SRItemWrapper dark={dark.dark}>
                        <SRNum>{r.index}</SRNum>
                        <SRInfoWrapper>
                            <SRUser>
                                {r.towertitle !== "" && <SRIcon src={r.towertitle} />}
                                <ThemedLink dark={dark.dark} href="#no_div" to={r.profile}>
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
                );
            })}
        </>
    );
});

export default SkillRankingItem;
