import React from "react";
import { Redirect } from "react-router-dom";
import Pager from "@/module/common/pager";
import PatternListItem from "./ptListItem";
import { PatternData } from "./patternData";
import store from "@/mobx/store";

import txtPatternKo from "@/lang/pattern/pattern/txtPattern-ko";
import txtPatternJp from "@/lang/pattern/pattern/txtPattern-jp";
import txtPatternEn from "@/lang/pattern/pattern/txtPattern-en";
import { PTListBody } from "./ptList.style";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    switchHot: boolean;
    switchOther: boolean;
    switchVer: boolean;
    switchOrder: boolean;

    order: string;
    nextVer: string;
    nextOrder: string;

    list: Array<PatternData>;
    page: string;
    allPage: number;
    ver: string;

    openPopup: (mid: number) => void;
}

const PTListPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtPattern = lang === "ko" ? txtPatternKo : lang === "jp" ? txtPatternJp : txtPatternEn;

    if (props.switchHot) {
        if (!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=h`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=h`} />;
    }
    if (props.switchOther) {
        if (!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=o`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=o`} />;
    }
    if (props.switchVer) {
        if (!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.order}/1`))
            return <Redirect to={`/pattern/${props.nextVer}/${props.order}/1`} />;
    }
    if (props.switchOrder) {
        if (
            !window.location.href.endsWith(
                `/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`
            )
        )
            return (
                <Redirect
                    to={`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`}
                />
            );
    }
    return (
        <>
            <PTListBody>
                {txtPattern.desc1}
                <br />
                {txtPattern.desc2}
            </PTListBody>
            <ContentLayout title={txtPattern.ptinfo}>
                <PatternListItem list={props.list} openPopup={props.openPopup} />
            </ContentLayout>
            <PTListBody>
                <Pager
                    cpage={parseInt(props.page)}
                    allpage={props.allPage}
                    baseUrl={`/pattern/${props.ver}/${props.order}/`}
                    afterUrl={window.location.search}
                />
            </PTListBody>
        </>
    );
};

export default PTListPresenter;
