import React from "react";
import { Button, ThemedLink } from "@/styled/styledCommon";
import SkillRankingItem from "./rankingItem";
import Pager from "@/module/common/pager";
import store from "@/mobx/store";
import SRankData from "./srankData";

import txtSrankKo from "@/lang/skill/ranking/txtSkillRank-ko";
import txtSrankJp from "@/lang/skill/ranking/txtSkillRank-jp";
import txtSrankEn from "@/lang/skill/ranking/txtSkillRank-en";
import {
    SRIndex,
    SRIndexWrapper,
    SRListWrapper,
    SRPagerWrapper,
    SRTypeWrapper,
} from "./skillRankingPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { observer } from "mobx-react";

interface Props {
    gtype: string;
    rankList: Array<SRankData>;
    page: string;
    allPage: number;
}

const SkillRankingPresenter = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtSrank = lang === "ko" ? txtSrankKo : lang === "jp" ? txtSrankJp : txtSrankEn;

    return (
        <CommonLayout>
            <ContentLayout
                title={`${txtSrank.title} ${props.gtype === "gf" ? `GuitarFreaks` : `DrumMania`}`}
            >
                <SRTypeWrapper>
                    <ThemedLink dark={dark.dark} to="/rank/gf/1">
                        <Button>GuitarFreaks Ranking</Button>
                    </ThemedLink>
                    <ThemedLink dark={dark.dark} to="/rank/dm/1">
                        <Button>DrumMania Ranking</Button>
                    </ThemedLink>
                </SRTypeWrapper>
                <SRIndexWrapper>
                    <SRIndex>GF</SRIndex>
                    <SRIndex>DM</SRIndex>
                </SRIndexWrapper>
                <SRListWrapper>
                    <SkillRankingItem gtype={props.gtype} rank={props.rankList} />
                </SRListWrapper>
                <SRPagerWrapper>
                    <Pager
                        cpage={parseInt(props.page)}
                        allpage={props.allPage}
                        baseUrl={`/rank/${props.gtype}/`}
                        afterUrl=""
                    />
                </SRPagerWrapper>
            </ContentLayout>
        </CommonLayout>
    );
});

export default SkillRankingPresenter;
