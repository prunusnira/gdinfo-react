import React from "react";
import TowerFloorItem from "./towerFloorItem";
import { TowerStatData } from "./towerStatData";
import { ItemRow } from "@/styled/styledCommon";
import TitleType from "./data/titleType";
import store from "@/mobx/store";
import {
    StatFloorClear,
    StatFloorClearImg,
    StatFloorItemWrapper,
    StatFloorRow,
    StatFloorTitle,
    StatFloorUserTitle,
    StatFloorUserTitleBtn,
    StatFloorWrapper,
} from "./towerStatList.style";

interface Props {
    list: Array<TowerStatData>;
    id: string;
    setTitleToBeChanged: (t: TitleType) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerStatList = (props: Props) => {
    const lang = store.language.lang;

    const divopen = (i: string) => {
        const div = document.getElementById(i);

        if (div) {
            if (div.style.display === "none") {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        }
    };

    return (
        <>
            {props.list.map((tl, i) => {
                return (
                    <StatFloorWrapper>
                        <StatFloorRow onClick={() => divopen(tl.floorid)}>
                            <StatFloorTitle>
                                {tl.opbtn} Floor {tl.floor}
                            </StatFloorTitle>
                            <StatFloorClear>
                                <StatFloorClearImg alt="floorclear" src={tl.floorclear} />
                            </StatFloorClear>
                            <StatFloorUserTitle>
                                <StatFloorUserTitleBtn
                                    disabled={tl.btnchangable === false}
                                    onClick={() => {
                                        props.setTitleToBeChanged(tl.titlechange);
                                        props.setTitleChangeModal(true);
                                    }}
                                >
                                    {tl.titlechangable}
                                </StatFloorUserTitleBtn>
                            </StatFloorUserTitle>
                        </StatFloorRow>
                        <StatFloorItemWrapper id={tl.floorid}>
                            <div>
                                <span style={{ padding: "10px" }}>{tl.clearnotice}</span>
                            </div>
                            <TowerFloorItem
                                list={tl.floorlist}
                                setTitleChangeModal={props.setTitleChangeModal}
                                setTitleToBeChanged={props.setTitleToBeChanged}
                            />
                        </StatFloorItemWrapper>
                    </StatFloorWrapper>
                );
            })}
        </>
    );
};

export default TowerStatList;
