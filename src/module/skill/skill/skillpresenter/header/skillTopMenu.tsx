import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtSkillEn from '@/lang/skill/skill/txtSkill-en';
import txtSkillJp from '@/lang/skill/skill/txtSkill-jp';
import txtSkillKo from '@/lang/skill/skill/txtSkill-ko';
import CommonData from '@/module/common/commonData';
import scrShot from '@/module/common/scrshot';
import * as Time from '@/module/common/time';
import SkillMenu from '@/module/skill/skill/skillMenu';
import { SkillBody, SkillHeader, SkillRow } from '@/module/skill/skill/skillpresenter/skillTableBody.style';
import useSkillSelector from '@/module/skill/skill/useSkillSelector';
import useSTableUser from '@/module/skill/skill/useSTableUser';
import { Anchor, Button, ItemCol, ItemRow, ThemedLink } from '@/styled/styledCommon';
import axios from 'axios';
import { useAtomValue } from 'jotai/index';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Props {
    share: boolean;
}

const SkillTopMenu = ({ share }: Props) => {
    const navigate = useNavigate();

    const {
        order,
        ptype,
        userid,
        gtype,
        page,
    } = useParams<{ order: string, ptype: string, userid: string, gtype: string, page: string }>();

    const {
        ownAccount,
        isUserLoading,
        isUserError,
    } = useSTableUser({ userid, ptype });

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

    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);
    const txtSkill =
        lang === 'ko'
            ? txtSkillKo
            : lang === 'jp'
                ? txtSkillJp
                : txtSkillEn;

    const createSnapshot = (id: string, type: string) => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/create/${id}/${type}`).then(() => {
            alert(txtSkill.snapshot.created);
        });
    };

    useEffect(() => {
        if (switchVerState) {
            const exturl = new URLSearchParams(window.location.search);
            exturl.set('ver', nextVer.toString());
            navigate(`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`);
            navigate(0);
        }
    }, [switchVerState]);

    useEffect(() => {
        if (switchRankState) {
            const exturl = new URLSearchParams(window.location.search);
            exturl.set('rank', nextRank);
            navigate(`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`);
            navigate(0);
        }
    }, [switchRankState]);

    useEffect(() => {
        if (switchNameState) {
            const exturl = new URLSearchParams(window.location.search);
            exturl.set('name', nextName);
            navigate(`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`);
            navigate(0);
        }
    }, [switchNameState]);

    useEffect(() => {
        if (switchOrderState) {
            navigate(`/skill/0/${userid}/${gtype}/${page}/${nextOrder}${window.location.search}`);
            navigate(0);
        }
    }, [switchOrderState]);

    return (
        <>
            <SkillBody dark={dark}>
                <SkillRow justifyContent={'center'} alignItems={'center'}>
                    {share ? (
                        <ThemedLink
                            dark={dark}
                            to={`/skill/${ptype}/${userid}/${gtype}/${page}/${order}${window.location.search}`}
                        >
                            <Button>{txtSkill.btnNormalTable}</Button>
                        </ThemedLink>
                    ) : (
                        <ThemedLink
                            dark={dark}
                            to={`/skillscr/${ptype}/${userid}/${gtype}/${page}/${order}${window.location.search}`}
                        >
                            <Button>{txtSkill.btnShareTable}</Button>
                        </ThemedLink>
                    )}
                    <Button
                        onClick={() =>
                            scrShot(
                                'scrTable',
                                `${userid}_${gtype}_all_${
                                    page
                                }_${Time.getTimeScr()}.jpg`,
                            )
                        }
                    >
                        {txtSkill.scrshot}
                    </Button>
                    {
                        // 본인 계정인 경우 snapshot 생성
                        (function() {
                            if (ownAccount && userid && gtype) {
                                return (
                                    <Button
                                        onClick={() => {
                                            if (userid && gtype) {
                                                createSnapshot(
                                                    userid,
                                                    gtype);
                                            }
                                        }}
                                    >
                                        {txtSkill.snapshot.button}
                                    </Button>
                                );
                            }
                            return <></>;
                        })()
                    }
                </SkillRow>

                <SkillRow justifyContent={'center'} alignItems={'center'}>
                    <Anchor dark={dark} onClick={showTableMenu}>
                        {txtSkill.float}
                    </Anchor>
                </SkillRow>
                <SkillRow
                    style={{
                        display: menuVisible ? 'block' : 'none',
                    }}
                >
                    <SkillMenu ptype={ptype} id={userid} />
                </SkillRow>
            </SkillBody>

            {
                ptype && ptype === '0' ? (
                    <>
                        <SkillHeader>
                            <h4>Search Options</h4>
                        </SkillHeader>
                        <SkillBody dark={dark}>
                            <SkillRow>
                                <ItemCol
                                    size={3.3}
                                    isFlatUnderLg={true}
                                >
                                    <ItemRow>Version</ItemRow>
                                    <ItemRow>
                                        <select
                                            onChange={
                                                switchVer
                                            }
                                            className="form-control"
                                        >
                                            <option value="--">
                                                SELECT
                                            </option>
                                            <option value="00">
                                                All
                                            </option>
                                            <option value="01">
                                                GF1
                                            </option>
                                            <option value="02">
                                                GF2dm1
                                            </option>
                                            <option value="03">
                                                GF3dm2
                                            </option>
                                            <option value="04">
                                                GF4dm3
                                            </option>
                                            <option value="05">
                                                GF5dm4
                                            </option>
                                            <option value="06">
                                                GF6dm5
                                            </option>
                                            <option value="07">
                                                GF7dm6
                                            </option>
                                            <option value="08">
                                                GF8dm7
                                            </option>
                                            <option value="09">
                                                GF9dm8
                                            </option>
                                            <option value="10">
                                                GF10dm9
                                            </option>
                                            <option value="11">
                                                GF11dm10
                                            </option>
                                            <option value="12">
                                                ee'mall
                                            </option>
                                            <option value="13">
                                                V
                                            </option>
                                            <option value="14">
                                                V2
                                            </option>
                                            <option value="15">
                                                V3
                                            </option>
                                            <option value="16">
                                                V4
                                            </option>
                                            <option value="17">
                                                V5
                                            </option>
                                            <option value="18">
                                                V6
                                            </option>
                                            <option value="19">
                                                XG
                                            </option>
                                            <option value="20">
                                                XG2
                                            </option>
                                            <option value="21">
                                                XG3
                                            </option>
                                            <option value="22">
                                                GD
                                            </option>
                                            <option value="23">
                                                GD OD
                                            </option>
                                            <option value="24">
                                                GD TB
                                            </option>
                                            <option value="25">
                                                GD TBRE
                                            </option>
                                            <option value="26">
                                                GD MX
                                            </option>
                                            <option value="27">
                                                GD EX
                                            </option>
                                            <option value="28">
                                                GD NX
                                            </option>
                                            <option value="29">
                                                GD HV
                                            </option>
                                            <option value="30">
                                                GD FU
                                            </option>
                                            <option value="31">
                                                GD GW
                                            </option>
                                        </select>
                                    </ItemRow>
                                </ItemCol>
                                <ItemCol
                                    size={3.3}
                                    isFlatUnderLg={true}
                                >
                                    <ItemRow>Rank</ItemRow>
                                    <ItemRow>
                                        <select
                                            onChange={
                                                switchRank
                                            }
                                            className="form-control"
                                        >
                                            <option value="--">
                                                SELECT
                                            </option>
                                            <option value="0">
                                                ALL
                                            </option>
                                            <option value="9">
                                                EXC
                                            </option>
                                            <option value="8">
                                                SS
                                            </option>
                                            <option value="7">
                                                S
                                            </option>
                                            <option value="6">
                                                A
                                            </option>
                                            <option value="5">
                                                B
                                            </option>
                                            <option value="4">
                                                C
                                            </option>
                                            <option value="3">
                                                D
                                            </option>
                                            <option value="2">
                                                E
                                            </option>
                                            <option value="1">
                                                F
                                            </option>
                                        </select>
                                    </ItemRow>
                                </ItemCol>
                                <ItemCol
                                    size={3.3}
                                    isFlatUnderLg={true}
                                >
                                    <ItemRow>Name</ItemRow>
                                    <ItemRow>
                                        <select
                                            onChange={
                                                switchName
                                            }
                                            className="form-control"
                                        >
                                            <option value="-">
                                                SELECT
                                            </option>
                                            <option value="0">
                                                ALL
                                            </option>
                                            <option value="1">
                                                Number
                                            </option>
                                            <option value="2">
                                                A
                                            </option>
                                            <option value="3">
                                                B
                                            </option>
                                            <option value="4">
                                                C
                                            </option>
                                            <option value="5">
                                                D
                                            </option>
                                            <option value="6">
                                                E
                                            </option>
                                            <option value="7">
                                                F
                                            </option>
                                            <option value="8">
                                                G
                                            </option>
                                            <option value="9">
                                                H
                                            </option>
                                            <option value="10">
                                                I
                                            </option>
                                            <option value="11">
                                                J
                                            </option>
                                            <option value="12">
                                                K
                                            </option>
                                            <option value="13">
                                                L
                                            </option>
                                            <option value="14">
                                                M
                                            </option>
                                            <option value="15">
                                                N
                                            </option>
                                            <option value="16">
                                                O
                                            </option>
                                            <option value="17">
                                                P
                                            </option>
                                            <option value="18">
                                                Q
                                            </option>
                                            <option value="19">
                                                R
                                            </option>
                                            <option value="20">
                                                S
                                            </option>
                                            <option value="21">
                                                T
                                            </option>
                                            <option value="22">
                                                U
                                            </option>
                                            <option value="23">
                                                V
                                            </option>
                                            <option value="24">
                                                W
                                            </option>
                                            <option value="25">
                                                X
                                            </option>
                                            <option value="26">
                                                Y
                                            </option>
                                            <option value="27">
                                                Z
                                            </option>
                                            <option value="28">
                                                あ
                                            </option>
                                            <option value="29">
                                                か
                                            </option>
                                            <option value="30">
                                                さ
                                            </option>
                                            <option value="31">
                                                た
                                            </option>
                                            <option value="32">
                                                な
                                            </option>
                                            <option value="33">
                                                は
                                            </option>
                                            <option value="34">
                                                ま
                                            </option>
                                            <option value="35">
                                                や
                                            </option>
                                            <option value="36">
                                                ら
                                            </option>
                                            <option value="37">
                                                わ
                                            </option>
                                        </select>
                                    </ItemRow>
                                </ItemCol>
                            </SkillRow>
                            <ItemRow>Order</ItemRow>
                            <ItemRow keepDirHor={true}>
                                <ItemCol size={5}>
                                    <Button
                                        style={{
                                            width: '100%',
                                        }}
                                        onClick={() =>
                                            switchOrder(0)
                                        }
                                    >
                                        {txtSkill.filter.btn.title}{' '}
                                        ▲/▼
                                    </Button>
                                </ItemCol>
                                <ItemCol size={5}>
                                    <Button
                                        style={{
                                            width: '100%',
                                        }}
                                        onClick={() =>
                                            switchOrder(1)
                                        }
                                    >
                                        {
                                            txtSkill.filter.btn
                                                .version
                                        }{' '}
                                        ▲/▼
                                    </Button>
                                </ItemCol>
                            </ItemRow>
                        </SkillBody>
                    </>
                )
                    :
                <></>
            }
        </>
    );
};

export default SkillTopMenu;