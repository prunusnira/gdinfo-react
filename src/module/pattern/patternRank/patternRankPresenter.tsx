import React from "react";
import { Button, ThemedLink } from "@/styled/styledCommon";
import PatternRankRow from "./ptRankRow";
import Pager from "@/module/common/pager";
import store from "@/mobx/store";
import CommonData from "@/module/common/commonData";
import PTRankData from "./ptrankData";

import txtPTRankKo from "@/lang/pattern/patternRank/txtPTRank-ko";
import txtPTRankJp from "@/lang/pattern/patternRank/txtPTRank-jp";
import txtPTRankEn from "@/lang/pattern/patternRank/txtPTRank-en";
import { PRBody, PRCol, PRRow } from "./patternRankPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { observer } from "mobx-react";

interface Props {
    mid: string;
    pattern: string;
    level: string;
    mname: string;
    composer: string;
    ptcode: string;
    list: Array<PTRankData>;
    page: string;
    allPage: number;
    isLoading: boolean;
}

const PatternRankPresenter = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtPTRank =
        lang === "ko" ? txtPTRankKo : lang === "jp" ? txtPTRankJp : txtPTRankEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtPTRank.title}>
                <PRBody>{txtPTRank.desc}</PRBody>
                <ContentLayout title={txtPTRank.table.ptinfo}>
                    <PRRow>
                        <PRCol>
                            <img
                                alt="jacket-img"
                                src={`${CommonData.jacketUrl}${props.mid}.jpg`}
                                onError={(e) => {
                                    e.currentTarget.src = `${CommonData.jacketUrl}empty.jpg`;
                                }}
                                style={{ width: "75%", maxWidth: "100px" }}
                            />
                            <img
                                alt="pattern"
                                src={props.pattern}
                                style={{ width: "75%", maxWidth: "100px" }}
                            />
                            <span>{props.level}</span>
                        </PRCol>
                        <PRCol>
                            <span>{props.mname}</span>
                            <span>{props.composer}</span>
                        </PRCol>
                    </PRRow>
                </ContentLayout>
                <ContentLayout title={txtPTRank.table.ranking}>
                    <PRRow>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=30`}
                        >
                            <Button className="rank30">FU</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=29`}
                        >
                            <Button className="rank29">HV</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=28`}
                        >
                            <Button className="rank28">NX</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=27`}
                        >
                            <Button className="rank27">EX</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=26`}
                        >
                            <Button className="rank26">MX</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=25`}
                        >
                            <Button className="rank25">RE</Button>
                        </ThemedLink>
                        <ThemedLink
                            dark={dark.dark}
                            to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=24`}
                        >
                            <Button className="rank24">TB</Button>
                        </ThemedLink>
                    </PRRow>
                    <PatternRankRow list={props.list} />
                    {(function () {
                        if (props.isLoading) {
                            return <div id="empty">Loading...</div>;
                        } else if (props.list.length === 0) {
                            return <div id="empty">No records</div>;
                        }
                    })()}
                    <Pager
                        cpage={parseInt(props.page)}
                        allpage={props.allPage}
                        baseUrl={`/ptrank/${props.mid}/${props.ptcode}/`}
                        afterUrl={window.location.search}
                    />
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
});

export default PatternRankPresenter;
