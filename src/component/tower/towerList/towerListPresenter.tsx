import React from "react";
import { Link } from "react-router-dom";
import TowerListImg from "./toweritem";
import TowerListData from "./towerlistData";
import store from "@/mobx/store";
import { Button } from "@/styled/styledCommon";

import txtTowerKo from "@/lang/tower/txtTower-ko";
import txtTowerJp from "@/lang/tower/txtTower-jp";
import txtTowerEn from "@/lang/tower/txtTower-en";
import {
    TowerHowTo,
    TowerListImgs,
    TowerListObj,
    TowerListSection,
    TowerListTitle,
    TowerListWrapper,
} from "./towerListPresenter.style";

interface Props {
    towerGF: Array<TowerListData>;
    towerDM: Array<TowerListData>;
    towerSP: Array<TowerListData>;
}

const TowerListPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtTower = lang === "ko" ? txtTowerKo : lang === "jp" ? txtTowerJp : txtTowerEn;

    return (
        <TowerListWrapper>
            <TowerListTitle>
                <h4>Skill Navigator Tower</h4>
            </TowerListTitle>
            <TowerListSection>
                <TowerHowTo>
                    {txtTower.main.desc}
                    <br />
                    <Link to={"/tower/howto"}>
                        <Button>{txtTower.main.howto}</Button>
                    </Link>
                </TowerHowTo>
                <TowerListObj>
                    <TowerListTitle>
                        <h4>{txtTower.main.skilltower}&nbsp;GuitarFreaks</h4>
                    </TowerListTitle>
                    <TowerListImgs>
                        <TowerListImg list={props.towerGF} />
                    </TowerListImgs>
                </TowerListObj>
                <TowerListObj>
                    <TowerListTitle>
                        <h4>{txtTower.main.skilltower}&nbsp;DrumMania</h4>
                    </TowerListTitle>
                    <TowerListImgs>
                        <TowerListImg list={props.towerDM} />
                    </TowerListImgs>
                </TowerListObj>
                <TowerListObj>
                    <TowerListTitle>
                        <h4>{txtTower.main.sptower}</h4>
                    </TowerListTitle>
                    <TowerListImgs>
                        <TowerListImg list={props.towerSP} />
                    </TowerListImgs>
                </TowerListObj>
            </TowerListSection>
        </TowerListWrapper>
    );
};

export default TowerListPresenter;
