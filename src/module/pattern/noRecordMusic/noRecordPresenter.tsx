import React from "react";
import Pager from "@/module/common/pager";
import NpItem from "./npItem";
import { Redirect } from "react-router-dom";
import NPData from "./NPData";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    switchLv: boolean;
    switchVer: boolean;
    switchHot: boolean;
    switchOther: boolean;
    switchClear: boolean;

    lv: number;
    ver: string;
    allPage: number;
    list: Array<NPData>;

    gtype: string;
    userid: string;
    vertype: string;
    page: string;
}

const NoRecordPresenter = (props: Props) => {
    if (props.switchLv) {
        return (
            <Redirect
                to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?lv=${props.lv}`}
            />
        );
    }
    if (props.switchVer) {
        return (
            <Redirect
                to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?ver=${props.ver}`}
            />
        );
    }
    if (props.switchHot) {
        return (
            <Redirect to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?hot=h`} />
        );
    }
    if (props.switchOther) {
        return (
            <Redirect to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?hot=o`} />
        );
    }
    if (props.switchClear) {
        return <Redirect to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1`} />;
    }
    return (
        <ContentLayout
            title={`${props.gtype === "gf" ? "GuitarFreaks" : "DrumMania"} No record list`}
        >
            <NpItem list={props.list} />
            <div style={{ width: "100%", textAlign: "center" }}>
                <h3>
                    {(function () {
                        if (props.list.length === 0) return "List is empty";
                    })()}
                </h3>
            </div>
            <Pager
                cpage={parseInt(props.page)}
                allpage={props.allPage}
                baseUrl={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/`}
                afterUrl={window.location.search}
            />
        </ContentLayout>
    );
};

export default NoRecordPresenter;