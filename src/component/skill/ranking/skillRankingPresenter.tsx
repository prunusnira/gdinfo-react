import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/styled/styledCommon";
import SkillRankingItem from "./rankingItem";
import Pager from "@/component/common/pager";
import store from "@/mobx/store";
import SRankData from "./srankData";

import txtSrankKo from "@/lang/skill/ranking/txtSkillRank-ko";
import txtSrankJp from "@/lang/skill/ranking/txtSkillRank-jp";
import txtSrankEn from "@/lang/skill/ranking/txtSkillRank-en";
import {
    SRContainer,
    SRIndex,
    SRIndexWrapper,
    SRListWrapper,
    SRPagerWrapper,
    SRTitle,
    SRTypeWrapper,
} from "./skillRankingPresenter.style";

interface Props {
    gtype: string;
    rankList: Array<SRankData>;
    page: string;
    allPage: number;
}

const SkillRankingPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtSrank = lang === "ko" ? txtSrankKo : lang === "jp" ? txtSrankJp : txtSrankEn;

    return (
        <SRContainer>
            <SRTitle>
                <h4>
                    {txtSrank.title}
                    {props.gtype === "gf" ? `GuitarFreaks` : `DrumMania`}
                </h4>
            </SRTitle>
            <SRTypeWrapper>
                <Link to="/rank/gf/1">
                    <Button>GuitarFreaks Ranking</Button>
                </Link>
                <Link to="/rank/dm/1">
                    <Button>DrumMania Ranking</Button>
                </Link>
                {/* <Link to="/rank/all/1">
                    <Button>GF+DM Rank</Button>
                </Link> */}
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
        </SRContainer>
    );
};

export default SkillRankingPresenter;
