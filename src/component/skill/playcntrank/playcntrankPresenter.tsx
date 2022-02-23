import React from "react";
import PlayCntRankItem from "./playcntitem";
import Pager from "@/component/common/pager";
import store from "@/mobx/store";
import { BodyContent, BodyHeader, Container, ItemRow } from "@/styled/styledCommon";
import PlaycntRankData from "./playcntrankData";

import txtCntRankKo from "@/lang/skill/playcntrank/txtCountRank-ko";
import txtCntRankJp from "@/lang/skill/playcntrank/txtCountRank-jp";
import txtCntRankEn from "@/lang/skill/playcntrank/txtCountRank-en";
import {
    PCRContainer,
    PCRDesc,
    PCRListWrapper,
    PCRPagerWrapper,
    PCRTitle,
} from "./playcntrankPresenter.style";

interface Props {
    list: Array<PlaycntRankData>;
    page: string;
    allPage: number;
}

const PlaycountRankingPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtCntRank = lang === "ko" ? txtCntRankKo : lang === "jp" ? txtCntRankJp : txtCntRankEn;

    return (
        <PCRContainer>
            <PCRTitle>
                <h4>{txtCntRank.title}</h4>
            </PCRTitle>
            <PCRDesc>
                {txtCntRank.desc.desc1}
                <br />
                {txtCntRank.desc.desc2}
                <br />
                {txtCntRank.desc.desc3}
            </PCRDesc>
            <PCRListWrapper>
                <PlayCntRankItem list={props.list} />
            </PCRListWrapper>
            <PCRPagerWrapper>
                <Pager
                    cpage={parseInt(props.page)}
                    allpage={props.allPage}
                    baseUrl="/cntrank/"
                    afterUrl=""
                />
            </PCRPagerWrapper>
        </PCRContainer>
    );
};

export default PlaycountRankingPresenter;
