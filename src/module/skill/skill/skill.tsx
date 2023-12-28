import { atomLanguage } from '@/jotai/language';
import txtSkillEn from '@/lang/skill/skill/txtSkill-en';
import txtSkillJp from '@/lang/skill/skill/txtSkill-jp';
import txtSkillKo from '@/lang/skill/skill/txtSkill-ko';
import CommonData from '@/module/common/commonData';
import scrShot from '@/module/common/scrshot';
import axios from 'axios';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SkillPopup from '../skillpopup/skillPopup';
import SkillPresenter from './skillpresenter/skillPresenter';
import useSkillPopup from './useSkillPopup';
import useSkillSelector from './useSkillSelector';
import useSkillTableData from './useSkillTableData';
import useSkillTableVisibility from './useSkillTableVisibility';
import useSkillTableUpper from './useSkillUpper';
import useSTableUser from './useSTableUser';

const SkillContainer: React.FC<{ share: boolean }> = (share) => {
    const { order, ptype, userid, gtype, page } = useParams();

    const { user, ownAccount } = useSTableUser({ userid, ptype });
    const [visibleLarge, visibleLeft, visibleRight] = useSkillTableVisibility(ptype);
    const {
        skillTable1,
        skillTable2,
        skillSum1,
        skillSum2,
        allpage,
        updateTime,
    } = useSkillTableData({
        order,
        ptype,
        userid,
        gtype,
        page,
    });

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
        menuVisible,
        showTableMenu,
        switchVerState,
        switchRankState,
        switchNameState,
        switchOrderState,
        nextVer,
        nextRank,
        nextName,
        nextOrder,
        switchVer,
        switchRank,
        switchName,
        switchOrder,
    } = useSkillSelector(order);

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

    const lang = useAtomValue(atomLanguage);

    const txtSkill = lang === 'ko' ? txtSkillKo : lang === 'jp' ? txtSkillJp : txtSkillEn;

    const createSnapshot = (id: string, type: string) => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/create/${id}/${type}`).then(() => {
            alert(txtSkill.snapshot.created);
        });
    };

    if (switchVerState) {
        const exturl = new URLSearchParams(window.location.search);
        exturl.set('ver', nextVer.toString());
        return (
            <Navigate replace to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
        );
    }
    if (switchRankState) {
        const exturl = new URLSearchParams(window.location.search);
        exturl.set('rank', nextRank);
        return (
            <Navigate replace to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
        );
    }
    if (switchNameState) {
        const exturl = new URLSearchParams(window.location.search);
        exturl.set('name', nextName);
        return (
            <Navigate replace to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
        );
    }
    if (switchOrderState) {
        return (
            <Navigate replace
                      to={`/skill/0/${userid}/${gtype}/${page}/${nextOrder}${window.location.search}`}
            />
        );
    }
    return (
        <>
            <SkillPresenter
                // share table
                share={share.share}
                // url query
                ptype={ptype}
                userid={userid}
                gtype={gtype}
                page={page}
                order={order}
                // data
                lang={lang}
                // 스킬표 상단 타이틀
                tableTxtGType={tableTxtGType}
                tableTxtDesc={tableTxtDesc}
                // 스킬표 상단 데이터
                statLeftTitle={statLeftTitle}
                statLeft={statLeft}
                statMidTitle={statMidTitle}
                statMid={statMid}
                statRightTitle={statRightTitle}
                statRight={statRight}
                updateTime={updateTime}
                // states
                ownAccount={ownAccount}
                menuVisible={menuVisible}
                visibleLarge={visibleLarge}
                visibleLeft={visibleLeft}
                visibleRight={visibleRight}
                allpage={allpage}
                user={user}
                skillTable1={skillTable1}
                skillTable2={skillTable2}
                // methods
                createSnapshot={createSnapshot}
                showTableMenu={showTableMenu}
                scrShot={scrShot}
                // methods for ptype 0 menus
                switchVer={switchVer}
                switchRank={switchRank}
                switchName={switchName}
                switchOrder={switchOrder}
                // popup
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
        </>
    );
};

export default SkillContainer;
