import React from "react";
import TitleType from "./data/titleType";
import { FloorItemData } from "./towerStatData";

import txtTowerKo from "@/lang/tower/txtTower-ko";
import txtTowerJp from "@/lang/tower/txtTower-jp";
import txtTowerEn from "@/lang/tower/txtTower-en";
import store from "@/mobx/store";
import {
    FIClear,
    FIClearImg,
    FICondition,
    FIDiff,
    FIImg,
    FIImgWrapper,
    FIInfo,
    FITitle,
    FIUserTitle,
    FloorItemWrapper,
} from "./towerFloorItem.style";

interface Props {
    list: Array<FloorItemData>;
    setTitleToBeChanged: (t: TitleType) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerFloorItem = (props: Props) => {
    const lang = store.language.lang;
    const txtTower = lang === "ko" ? txtTowerKo : lang === "jp" ? txtTowerJp : txtTowerEn;

    return (
        <>
            {props.list.map((fl, i) => {
                console.log(fl.title);
                return (
                    <>
                        <FloorItemWrapper>
                            <FIImgWrapper>
                                <FIImg alt="jacket-img" src={fl.jacket} />
                            </FIImgWrapper>
                            <FIInfo>
                                <FITitle>{fl.name}</FITitle>
                                <FIDiff>
                                    {fl.pattern} / {fl.lv}
                                </FIDiff>
                            </FIInfo>
                            <FICondition>
                                {`Rate `}
                                {fl.rate > fl.condRate ? (
                                    <span style={{ color: "red" }}>{fl.rate}</span>
                                ) : fl.rate < fl.condRate ? (
                                    <span style={{ color: "blue" }}>{fl.rate}</span>
                                ) : (
                                    fl.rate
                                )}
                                % / {fl.condRate}%
                                <br />
                                {fl.condFc ? "FC Req" : "Non-FC OK"}
                                {fl.fc ? "(FC)" : "(No)"}
                            </FICondition>
                            <FIClear>
                                <FIClearImg src={fl.clear} />
                                {
                                    <FIUserTitle
                                        disabled={fl.title.type === 0}
                                        onClick={() => {
                                            props.setTitleToBeChanged(fl.title!);
                                            props.setTitleChangeModal(true);
                                        }}
                                    >
                                        {txtTower.detail.btntitlechange}
                                    </FIUserTitle>
                                }
                            </FIClear>
                        </FloorItemWrapper>
                    </>
                );
            })}
        </>
    );
};

export default TowerFloorItem;
