import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import { atomDarkmode } from '@/jotai/darkmode';
import DataError from '@/module/error/dataError';
import SkillTableHeader from '@/module/skill/skill/skillpresenter/header/skillTableHeader';
import SkillTableSummary from '@/module/skill/skill/skillpresenter/header/skillTableSummary';
import SkillTopMenu from '@/module/skill/skill/skillpresenter/header/skillTopMenu';
import { SkillBody } from '@/module/skill/skill/skillpresenter/skillTableBody.style';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import SkillPopup from '../skillpopup/skillPopup';
import SkillTableBody from './skillpresenter/skillTableBody';
import useSkillPopup from './useSkillPopup';
import useSkillTableData from './useSkillTableData';
import useSkillTableVisibility from './useSkillTableVisibility';
import useSkillTableUpper from './useSkillUpper';
import useSTableUser from './useSTableUser';

const SkillContainer: React.FC<{ share: boolean }> = (share) => {
    const {
        order,
        ptype,
        userid,
        gtype,
        page,
    } = useParams<{order: string, ptype: string, userid: string, gtype: string, page: string}>();

    const {
        user,
        ownAccount,
        isUserLoading,
        isUserError,
    } = useSTableUser({ userid, ptype });

    const [visibleLarge, visibleLeft, visibleRight] = useSkillTableVisibility(ptype);
    const {
        skillTable1,
        skillTable2,
        skillSum1,
        skillSum2,
        allpage,
        updateTime,
        isLoading,
        isError,
    } = useSkillTableData();

    const {
        tableTxtGType,
        tableTxtDesc,
        statLeftTitle,
        statLeft,
        statMidTitle,
        statMid,
        statRightTitle,
        statRight,
    } = useSkillTableUpper({ user, skillSum1, skillSum2, order, ptype, gtype });

    const {
        popupOpen,
        ptinfo,
        openPopup,
        closePopup,

        mid,
        musicName,
        composer,
        version,
    } = useSkillPopup(userid);

    const dark = useAtomValue(atomDarkmode);

    return (
        <CommonLayout>
            <ContentLayout title={'Skill Menu'}>
                <SkillTopMenu
                    share={share.share}
                />
            </ContentLayout>
            <ContentLayout title={'Skill Table'}>
                {isLoading ? <Loading /> : <></>}
                {isError ? <DataError /> : <></>}
                <SkillBody id="scrTable" dark={dark}>
                    <SkillTableHeader
                        updateTime={updateTime}
                        tableTxtGType={tableTxtGType}
                        tableTxtDesc={tableTxtDesc}
                        user={user}
                    />
                    <SkillTableSummary
                        statLeftTitle={statLeftTitle}
                        statLeft={statLeft}
                        statMidTitle={statMidTitle}
                        statMid={statMid}
                        statRightTitle={statRightTitle}
                        statRight={statRight}
                    />
                    <SkillTableBody
                        // share table
                        share={share.share}
                        // 스킬표 상단 데이터
                        updateTime={updateTime}
                        // states
                        visibleLarge={visibleLarge}
                        visibleLeft={visibleLeft}
                        visibleRight={visibleRight}
                        allpage={allpage}
                        user={user}
                        skillTable1={skillTable1}
                        skillTable2={skillTable2}
                        // popup
                        openPopup={openPopup}
                    />
                </SkillBody>
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

export default SkillContainer;
