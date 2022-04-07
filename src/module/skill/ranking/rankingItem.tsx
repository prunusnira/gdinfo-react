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
    SRLink,
    SRNum,
    SRSkillVal,
    SRSkillWrapper,
    SRUpdate,
    SRUser,
} from "./rankingItem.style";

interface Props {
    rank: Array<SRankData>;
    gtype: string;
}

const SkillRankingItem = observer((props: Props) => {
    const lang = store.language.lang;

    const txtSrank = lang === "ko" ? txtSrankKo : lang === "jp" ? txtSrankJp : txtSrankEn;

    return (
        <>
            {props.rank.map((r) => {
                return (
                    <SRItemWrapper>
                        <SRNum>{r.index}</SRNum>
                        <SRInfoWrapper>
                            <SRUser>
                                {r.towertitle !== "" && <SRIcon src={r.towertitle} />}
                                <SRLink href="#no_div" to={r.profile}>
                                    {r.username}
                                </SRLink>
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
