import store from "@/mobx/store";
import { ThemedLink } from "@/styled/styledCommon";
import { observer } from "mobx-react";
import React from "react";
import { TowerItemImg } from "./toweritem.style";
import TowerListData from "./towerlistData";

interface Props {
    list: Array<TowerListData>;
}

const TowerListImg = observer((props: Props) => {
    const { dark } = store;
    return (
        <>
            {props.list.map((tower, i) => {
                return (
                    <ThemedLink dark={dark.dark} key={i} to={tower.link} data-testid="towerUrl">
                        <TowerItemImg alt="towerimg" src={tower.img} />
                    </ThemedLink>
                );
            })}
        </>
    );
});

export default TowerListImg;
