import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PTListPresenter from "./ptListPresenter";
import usePTList from "./usePTList";
import usePatternSelector from "./usePatternSelector";
import PTListSelector from "./ptListSelector";
import SkillPopup from "@/module/skill/skillpopup/skillPopup";
import useSkillPopup from "@/module/skill/skill/useSkillPopup";
import store from "@/mobx/store";
import ContentLayout from "@/component/content/standardContent";
import CommonLayout from "@/component/layout/commonLayout";

interface MatchProps {
    order: string;
    ver: string;
    page: string;
}

const PTList = observer(() => {
    const { order, ver, page } = useParams<MatchProps>();
    const [list, allPage] = usePTList(order, ver, page);
    const [
        switchHot,
        switchHotMethod,
        switchOther,
        switchOtherMethod,
        switchVer,
        switchVerMethod,
        switchOrder,
        switchOrderMethod,
        nextVer,
        nextOrder,
    ] = usePatternSelector(order, ver, page);

    const {
        popupOpen,
        patternlist,
        openPopup,
        closePopup,

        mid,
        musicName,
        composer,
        version,
    } = useSkillPopup(store.loginUser.user.id);

    return (
        <CommonLayout>
            <ContentLayout title={`Pattern List`}>
                <PTListSelector
                    switchHotMethod={switchHotMethod}
                    switchOtherMethod={switchOtherMethod}
                    switchVerMethod={switchVerMethod}
                    switchOrderMethod={switchOrderMethod}
                />
                <PTListPresenter
                    switchHot={switchHot}
                    switchOther={switchOther}
                    switchVer={switchVer}
                    switchOrder={switchOrder}
                    order={order}
                    nextVer={nextVer}
                    nextOrder={nextOrder}
                    list={list}
                    page={page}
                    allPage={allPage}
                    ver={ver}
                    openPopup={openPopup}
                />
                <SkillPopup
                    popupOpen={popupOpen}
                    pattern={patternlist}
                    closePopup={closePopup}
                    mid={mid}
                    musicName={musicName}
                    composer={composer}
                    version={version}
                />
            </ContentLayout>
        </CommonLayout>
    );
});

export default PTList;
