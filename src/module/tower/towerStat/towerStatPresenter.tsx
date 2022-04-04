import React from "react";
import TowerStatList from "./towerStatList";
import { TowerStatData } from "./towerStatData";
import TitleType from "./data/titleType";
import store from "@/mobx/store";

import { towerName, towerDesc } from "@/lang/tower/towername";
import {
    TowerStatDesc,
    TowerStatTable,
    TowerStatTitle,
    TowerStatWrapper,
} from "./towerStatPresenter.style";

interface Props {
    name: string;
    isPassed: string;
    list: Array<TowerStatData>;

    showTitleChangeModal: boolean;
    setTitleToBeChanged: (t: TitleType) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerStatPresenter = (props: Props) => {
    const lang = store.language.lang;
    const id = store.loginUser.user.id;

    return (
        <TowerStatWrapper>
            <TowerStatTitle>
                <h4>
                    {(towerName as any)[props.name] !== undefined
                        ? (towerName as any)[props.name][lang]
                        : ""}
                </h4>
            </TowerStatTitle>
            <TowerStatDesc>
                {(towerDesc as any)[props.name] !== undefined
                    ? (towerDesc as any)[props.name][lang]
                    : ""}
            </TowerStatDesc>
            <TowerStatTable>
                <TowerStatList
                    id={id}
                    list={props.list}
                    setTitleChangeModal={props.setTitleChangeModal}
                    setTitleToBeChanged={props.setTitleToBeChanged}
                />
            </TowerStatTable>
        </TowerStatWrapper>
    );
};

export default TowerStatPresenter;
