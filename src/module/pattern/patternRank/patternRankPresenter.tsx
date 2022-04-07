import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/styled/styledCommon";
import PatternRankRow from "./ptRankRow";
import Pager from "@/module/common/pager";
import store from "@/mobx/store";
import CommonData from "@/module/common/commonData";
import PTRankData from "./ptrankData";

import txtPTRankKo from "@/lang/pattern/patternRank/txtPTRank-ko";
import txtPTRankJp from "@/lang/pattern/patternRank/txtPTRank-jp";
import txtPTRankEn from "@/lang/pattern/patternRank/txtPTRank-en";
import {
    PRBody,
    PRCol,
    PRContainer,
    PRRow,
    PRTitle,
    PRTitleRank,
} from "./patternRankPresenter.style";

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
}

const PatternRankPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtPTRank = lang === "ko" ? txtPTRankKo : lang === "jp" ? txtPTRankJp : txtPTRankEn;

    return (
        <PRContainer>
            <PRTitle>
                <h4>{txtPTRank.title}</h4>
            </PRTitle>
            <PRBody>{txtPTRank.desc}</PRBody>
            <PRTitle>
                <h4>{txtPTRank.table.ptinfo}</h4>
            </PRTitle>
            <PRBody>
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
            </PRBody>
            <PRTitleRank>
                <PRTitle>
                    <h4>{txtPTRank.table.ranking}</h4>
                </PRTitle>
                <PRRow>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=29`}>
                        <Button className="rank29">HV</Button>
                    </Link>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=28`}>
                        <Button className="rank28">NX</Button>
                    </Link>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=27`}>
                        <Button className="rank27">EX</Button>
                    </Link>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=26`}>
                        <Button className="rank26">MX</Button>
                    </Link>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=25`}>
                        <Button className="rank25">RE</Button>
                    </Link>
                    <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=24`}>
                        <Button className="rank24">TB</Button>
                    </Link>
                </PRRow>
            </PRTitleRank>
            <PRBody>
                <PatternRankRow list={props.list} />
                {(function () {
                    if (props.list.length === 0) {
                        return <div id="empty">Loading... or No records</div>;
                    }
                })()}
            </PRBody>
            <PRBody>
                <Pager
                    cpage={parseInt(props.page)}
                    allpage={props.allPage}
                    baseUrl={`/ptrank/${props.mid}/${props.ptcode}/`}
                    afterUrl={window.location.search}
                />
            </PRBody>
        </PRContainer>
    );
};

export default PatternRankPresenter;
