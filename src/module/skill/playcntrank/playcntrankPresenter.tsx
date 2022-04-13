import React from "react";
import PlayCntRankItem from "./playcntitem";
import Pager from "@/module/common/pager";
import store from "@/mobx/store";
import PlaycntRankData from "./playcntrankData";

import txtCntRankKo from "@/lang/skill/playcntrank/txtCountRank-ko";
import txtCntRankJp from "@/lang/skill/playcntrank/txtCountRank-jp";
import txtCntRankEn from "@/lang/skill/playcntrank/txtCountRank-en";
import { PCRDesc, PCRListWrapper, PCRPagerWrapper } from "./playcntrankPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    list: Array<PlaycntRankData>;
    page: string;
    allPage: number;
}

const PlaycountRankingPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtCntRank = lang === "ko" ? txtCntRankKo : lang === "jp" ? txtCntRankJp : txtCntRankEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtCntRank.title}>
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
            </ContentLayout>
        </CommonLayout>
    );
};

export default PlaycountRankingPresenter;
