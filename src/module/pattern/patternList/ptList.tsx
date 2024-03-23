import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { atomLoginUser } from '@/jotai/loginUser';
import useSkillPopup from '@/module/skill/skill/useSkillPopup';
import SkillPopup from '@/module/skill/skillpopup/skillPopup';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import PTListPresenter from './ptListPresenter';
import PTListSelector from './ptListSelector';
import usePatternSelector from './usePatternSelector';
import usePTList from './usePTList';

const PTList = () => {
    const loginUser = useAtomValue(atomLoginUser);
    const { order, ver, page } = useParams();
    const { list, allPage } = usePTList({ order, ver, page });
    const {
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
    } = usePatternSelector({ order, ver, page });

    const {
        popupOpen,
        ptinfo,
        openPopup,
        closePopup,

        mid,
        musicName,
        composer,
        version,
    } = useSkillPopup(loginUser?.id);

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
                    pattern={ptinfo}
                    closePopup={closePopup}
                    mid={mid}
                    musicName={musicName}
                    composer={composer}
                    version={version}
                />
            </ContentLayout>
        </CommonLayout>
    );
};

export default PTList;
