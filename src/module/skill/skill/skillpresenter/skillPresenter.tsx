import React from "react";
import { Anchor, Button, ItemCol, ItemRow, ThemedLink } from "@/styled/styledCommon";
import Pager from "@/module/common/pager";
import ProfileData from "@/module/user/profile/profileData";
import SkillItemData from "../skillItem/skillItemData";
import SkillMenu from "../skillMenu";
import SkillTableNR from "./skillTableNR";
import SkillTableSH from "./skillTableSH";
import * as Time from "@/module/common/time";
import { skillPageVersion } from "@/module/common/version";

import txtSkillKo from "@/lang/skill/skill/txtSkill-ko";
import txtSkillJp from "@/lang/skill/skill/txtSkill-jp";
import txtSkillEn from "@/lang/skill/skill/txtSkill-en";
import {
    SkillBody,
    SkillHeader,
    SkillRow,
    SkillTableOuterSH,
    SkillTableWrapper,
    SkillTableWrapperSH,
} from "./skillPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import store from "@/mobx/store";
import { observer } from "mobx-react";

interface Props {
    // share table
    share: boolean;

    // url query
    ptype: string;
    userid: string;
    gtype: string;
    page: string;
    order: string;

    // data
    lang: string;

    // 스킬표 상단 타이틀
    tableTxtGType: string;
    tableTxtDesc: string;

    // 스킬표 상단 데이터
    statLeftTitle: string;
    statLeft: string;
    statMidTitle: string;
    statMid: string;
    statRightTitle: string;
    statRight: string;
    updateTime: string;

    // states
    ownAccount: boolean;
    menuVisible: boolean;

    visibleLarge: boolean;
    visibleLeft: boolean;
    visibleRight: boolean;
    allpage: number;

    user: ProfileData;
    skillTable1: Array<SkillItemData>;
    skillTable2: Array<SkillItemData>;

    // methods
    createSnapshot: (userid: string, gtype: string) => void;
    showTableMenu: () => void;
    scrShot: (divname: string, filename: string) => void;

    // methods for ptype 0 menus
    switchVer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    switchRank: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    switchName: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    switchOrder: (order: number) => void;

    // popup
    openPopup: (mid: number) => void;
}

const SkillPresenter = observer((props: Props) => {
    const txtSkill =
        props.lang === "ko" ? txtSkillKo : props.lang === "jp" ? txtSkillJp : txtSkillEn;

    const { dark } = store;
    return (
        <CommonLayout>
            <ContentLayout title={"Skill Menu"}>
                <SkillBody>
                    <SkillRow justifyContent={"center"} alignItems={"center"}>
                        {props.share ? (
                            <ThemedLink
                                dark={dark.dark}
                                to={`/skill/${props.ptype}/${props.userid}/${props.gtype}/${props.page}/${props.order}${window.location.search}`}
                            >
                                <Button>{txtSkill.btnNormalTable}</Button>
                            </ThemedLink>
                        ) : (
                            <ThemedLink
                                dark={dark.dark}
                                to={`/skillscr/${props.ptype}/${props.userid}/${props.gtype}/${props.page}/${props.order}${window.location.search}`}
                            >
                                <Button>{txtSkill.btnShareTable}</Button>
                            </ThemedLink>
                        )}
                        <Button
                            onClick={() =>
                                props.scrShot(
                                    "scrTable",
                                    `${props.userid}_${props.gtype}_all_${
                                        props.page
                                    }_${Time.getTimeScr()}.jpg`
                                )
                            }
                        >
                            {txtSkill.scrshot}
                        </Button>
                        {
                            // 본인 계정인 경우 snapshot 생성
                            (function () {
                                if (props.ownAccount) {
                                    return (
                                        <Button
                                            onClick={() =>
                                                props.createSnapshot(props.userid, props.gtype)
                                            }
                                        >
                                            {txtSkill.snapshot.button}
                                        </Button>
                                    );
                                }
                            })()
                        }
                    </SkillRow>

                    <SkillRow justifyContent={"center"} alignItems={"center"}>
                        <Anchor dark={dark.dark} onClick={props.showTableMenu}>
                            {txtSkill.float}
                        </Anchor>
                    </SkillRow>
                    <SkillRow style={{ display: props.menuVisible ? "block" : "none" }}>
                        <SkillMenu ptype={props.ptype} id={props.userid} />
                    </SkillRow>
                </SkillBody>

                {
                    // ptype 0일때만 출현하도록 함
                    (function () {
                        if (parseInt(props.ptype) === 0) {
                            return (
                                <>
                                    <SkillHeader>
                                        <h4>Search Options</h4>
                                    </SkillHeader>
                                    <SkillBody>
                                        <SkillRow>
                                            <ItemCol size={3.3} isFlatUnderLg={true}>
                                                <ItemRow>Version</ItemRow>
                                                <ItemRow>
                                                    <select
                                                        onChange={props.switchVer}
                                                        className="form-control"
                                                    >
                                                        <option value="--">SELECT</option>
                                                        <option value="00">All</option>
                                                        <option value="01">GF1</option>
                                                        <option value="02">GF2dm1</option>
                                                        <option value="03">GF3dm2</option>
                                                        <option value="04">GF4dm3</option>
                                                        <option value="05">GF5dm4</option>
                                                        <option value="06">GF6dm5</option>
                                                        <option value="07">GF7dm6</option>
                                                        <option value="08">GF8dm7</option>
                                                        <option value="09">GF9dm8</option>
                                                        <option value="10">GF10dm9</option>
                                                        <option value="11">GF11dm10</option>
                                                        <option value="12">ee'mall</option>
                                                        <option value="13">V</option>
                                                        <option value="14">V2</option>
                                                        <option value="15">V3</option>
                                                        <option value="16">V4</option>
                                                        <option value="17">V5</option>
                                                        <option value="18">V6</option>
                                                        <option value="19">XG</option>
                                                        <option value="20">XG2</option>
                                                        <option value="21">XG3</option>
                                                        <option value="22">GD</option>
                                                        <option value="23">GD OD</option>
                                                        <option value="24">GD TB</option>
                                                        <option value="25">GD TBRE</option>
                                                        <option value="26">GD MX</option>
                                                        <option value="27">GD EX</option>
                                                        <option value="28">GD NX</option>
                                                    </select>
                                                </ItemRow>
                                            </ItemCol>
                                            <ItemCol size={3.3} isFlatUnderLg={true}>
                                                <ItemRow>Rank</ItemRow>
                                                <ItemRow>
                                                    <select
                                                        onChange={props.switchRank}
                                                        className="form-control"
                                                    >
                                                        <option value="--">SELECT</option>
                                                        <option value="0">ALL</option>
                                                        <option value="9">EXC</option>
                                                        <option value="8">SS</option>
                                                        <option value="7">S</option>
                                                        <option value="6">A</option>
                                                        <option value="5">B</option>
                                                        <option value="4">C</option>
                                                        <option value="3">D</option>
                                                        <option value="2">E</option>
                                                        <option value="1">F</option>
                                                    </select>
                                                </ItemRow>
                                            </ItemCol>
                                            <ItemCol size={3.3} isFlatUnderLg={true}>
                                                <ItemRow>Name</ItemRow>
                                                <ItemRow>
                                                    <select
                                                        onChange={props.switchName}
                                                        className="form-control"
                                                    >
                                                        <option value="-">SELECT</option>
                                                        <option value="0">ALL</option>
                                                        <option value="1">Number</option>
                                                        <option value="2">A</option>
                                                        <option value="3">B</option>
                                                        <option value="4">C</option>
                                                        <option value="5">D</option>
                                                        <option value="6">E</option>
                                                        <option value="7">F</option>
                                                        <option value="8">G</option>
                                                        <option value="9">H</option>
                                                        <option value="10">I</option>
                                                        <option value="11">J</option>
                                                        <option value="12">K</option>
                                                        <option value="13">L</option>
                                                        <option value="14">M</option>
                                                        <option value="15">N</option>
                                                        <option value="16">O</option>
                                                        <option value="17">P</option>
                                                        <option value="18">Q</option>
                                                        <option value="19">R</option>
                                                        <option value="20">S</option>
                                                        <option value="21">T</option>
                                                        <option value="22">U</option>
                                                        <option value="23">V</option>
                                                        <option value="24">W</option>
                                                        <option value="25">X</option>
                                                        <option value="26">Y</option>
                                                        <option value="27">Z</option>
                                                        <option value="28">あ</option>
                                                        <option value="29">か</option>
                                                        <option value="30">さ</option>
                                                        <option value="31">た</option>
                                                        <option value="32">な</option>
                                                        <option value="33">は</option>
                                                        <option value="34">ま</option>
                                                        <option value="35">や</option>
                                                        <option value="36">ら</option>
                                                        <option value="37">わ</option>
                                                    </select>
                                                </ItemRow>
                                            </ItemCol>
                                        </SkillRow>
                                        <ItemRow>Order</ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5}>
                                                <Button
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    onClick={() => props.switchOrder(0)}
                                                >
                                                    {txtSkill.filter.btn.title} ▲/▼
                                                </Button>
                                            </ItemCol>
                                            <ItemCol size={5}>
                                                <Button
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    onClick={() => props.switchOrder(1)}
                                                >
                                                    {txtSkill.filter.btn.version} ▲/▼
                                                </Button>
                                            </ItemCol>
                                        </ItemRow>
                                    </SkillBody>
                                </>
                            );
                        }
                    })()
                }

                <SkillBody id="scrTable">
                    <SkillHeader id="targetInfo">
                        <SkillRow justifyContent={"center"}>
                            <h4>
                                <b>
                                    GITADORA {skillPageVersion(parseInt(props.ptype))}
                                    <br />
                                    {props.tableTxtGType} {props.tableTxtDesc}
                                    &nbsp;
                                    {props.ptype !== "1000" ? (
                                        <ThemedLink
                                            dark={dark.dark}
                                            className="innerhref"
                                            to={`/profile/${props.userid}`}
                                        >
                                            {props.user.name}
                                        </ThemedLink>
                                    ) : (
                                        ""
                                    )}
                                </b>
                            </h4>
                        </SkillRow>
                        <SkillRow>
                            <ItemCol size={5} style={{ textAlign: "center" }}>
                                <b>sin.nira.one</b>
                            </ItemCol>
                            <ItemCol size={5} style={{ textAlign: "center" }}>
                                Last update: {props.updateTime}
                            </ItemCol>
                        </SkillRow>
                    </SkillHeader>
                    <SkillBody>
                        <ItemRow
                            className="skillupper blackandwhite"
                            style={{ justifyContent: "center" }}
                            keepDirHor={true}
                        >
                            <ItemCol
                                size={3}
                                style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                {props.statLeftTitle}
                                <br />
                                {props.statLeft}
                            </ItemCol>
                            <ItemCol
                                size={3}
                                style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                {props.statMidTitle}
                                <br />
                                {props.statMid}
                            </ItemCol>
                            <ItemCol
                                size={3}
                                style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                {props.statRightTitle}
                                <br />
                                {props.statRight}
                            </ItemCol>
                        </ItemRow>
                    </SkillBody>
                    <SkillBody>
                        {props.share && props.visibleLarge && (
                            <SkillTableWrapperSH>
                                <SkillTableOuterSH>
                                    <SkillTableSH
                                        list={props.skillTable1}
                                        openPopup={props.openPopup}
                                    />
                                </SkillTableOuterSH>
                            </SkillTableWrapperSH>
                        )}
                        {props.share && props.visibleLeft && (
                            <SkillTableWrapperSH>
                                <SkillRow justifyContent={"center"}>
                                    <h4>HOT</h4>
                                </SkillRow>
                                <SkillTableOuterSH>
                                    <SkillTableSH
                                        list={props.skillTable1}
                                        openPopup={props.openPopup}
                                    />
                                </SkillTableOuterSH>
                            </SkillTableWrapperSH>
                        )}
                        {props.share && props.visibleRight && (
                            <SkillTableWrapperSH>
                                <SkillRow justifyContent={"center"}>
                                    <h4>Other</h4>
                                </SkillRow>
                                <SkillTableOuterSH>
                                    <SkillTableSH
                                        list={props.skillTable2}
                                        openPopup={props.openPopup}
                                    />
                                </SkillTableOuterSH>
                            </SkillTableWrapperSH>
                        )}
                        {!props.share && props.visibleLarge && (
                            <SkillTableWrapper>
                                <SkillTableNR
                                    list={props.skillTable1}
                                    openPopup={props.openPopup}
                                />
                            </SkillTableWrapper>
                        )}
                        {!props.share && props.visibleLeft && (
                            <SkillTableWrapper>
                                <SkillRow justifyContent={"center"}>
                                    <h4>HOT</h4>
                                </SkillRow>
                                <SkillTableNR
                                    list={props.skillTable1}
                                    openPopup={props.openPopup}
                                />
                            </SkillTableWrapper>
                        )}
                        {!props.share && props.visibleRight && (
                            <SkillTableWrapper>
                                <SkillRow justifyContent={"center"}>
                                    <h4>Other</h4>
                                </SkillRow>
                                <SkillTableNR
                                    list={props.skillTable2}
                                    openPopup={props.openPopup}
                                />
                            </SkillTableWrapper>
                        )}
                        <div id="skillEmpty" style={{ width: "100%", textAlign: "center" }}></div>
                        <SkillRow>
                            <Pager
                                cpage={parseInt(props.page)}
                                allpage={props.allpage}
                                baseUrl={`/skill/${props.ptype}/${props.userid}/${props.gtype}/`}
                                afterUrl={`/${props.order}${window.location.search}`}
                            />
                        </SkillRow>
                    </SkillBody>
                </SkillBody>
            </ContentLayout>
        </CommonLayout>
    );
});

export default SkillPresenter;
