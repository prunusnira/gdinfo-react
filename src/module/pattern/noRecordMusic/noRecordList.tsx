import React from "react";
import { useParams } from "react-router-dom";
import NoRecordPresenter from "./noRecordPresenter";
import NoRecordTitle from "./noRecordTitle";
import NoRecordSelector from "./noRecordSelector";
import useNoRecordData from "./useNoRecordData";
import useNoRecordSelector from "./useNoRecordSelector";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface MatchProps {
    gtype: string;
    userid: string;
    vertype: string;
    page: string;
}

const NoRecordMusicList = () => {
    const { gtype, userid, vertype, page } = useParams<MatchProps>();
    const [list, allPage] = useNoRecordData(gtype, userid, vertype, page);
    const [
        lv,
        ver,
        switchLv,
        switchLvMethod,
        switchVer,
        switchVerMethod,
        switchHot,
        switchHotMethod,
        switchOther,
        switchOtherMethod,
        switchClear,
        switchClearMethod,
    ] = useNoRecordSelector();

    return (
        <CommonLayout>
            <ContentLayout title={"Patterns with no records"}>
                <NoRecordTitle />
                <NoRecordSelector
                    userid={userid}
                    switchLvMethod={switchLvMethod}
                    switchVerMethod={switchVerMethod}
                    switchHotMethod={switchHotMethod}
                    switchOtherMethod={switchOtherMethod}
                    switchClearMethod={switchClearMethod}
                />
                <NoRecordPresenter
                    switchLv={switchLv}
                    switchVer={switchVer}
                    switchHot={switchHot}
                    switchOther={switchOther}
                    switchClear={switchClear}
                    lv={lv}
                    ver={ver}
                    allPage={allPage}
                    list={list}
                    gtype={gtype}
                    userid={userid}
                    vertype={vertype}
                    page={page}
                />
            </ContentLayout>
        </CommonLayout>
    );
};

export default NoRecordMusicList;