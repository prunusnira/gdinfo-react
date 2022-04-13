import React from "react";
import TowerStatList from "./towerStatList";
import { TowerStatData } from "./towerStatData";
import TitleType from "./data/titleType";
import store from "@/mobx/store";

import { towerName } from "@/lang/tower/towername";
import { TowerStatTable } from "./towerStatPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

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
        <CommonLayout>
            <ContentLayout
                title={(towerName as any)[props.name] && (towerName as any)[props.name][lang]}
            >
                <TowerStatTable>
                    <TowerStatList
                        id={id}
                        list={props.list}
                        setTitleChangeModal={props.setTitleChangeModal}
                        setTitleToBeChanged={props.setTitleToBeChanged}
                    />
                </TowerStatTable>
            </ContentLayout>
        </CommonLayout>
    );
};

export default TowerStatPresenter;
