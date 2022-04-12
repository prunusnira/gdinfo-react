import React from "react";
import TowerListImg from "./toweritem";
import TowerListData from "./towerlistData";
import store from "@/mobx/store";
import { Button, ThemedLink } from "@/styled/styledCommon";

import txtTowerKo from "@/lang/tower/txtTower-ko";
import txtTowerJp from "@/lang/tower/txtTower-jp";
import txtTowerEn from "@/lang/tower/txtTower-en";
import { TowerHowTo, TowerListImgs } from "./towerListPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { observer } from "mobx-react";

interface Props {
    towerGF: Array<TowerListData>;
    towerDM: Array<TowerListData>;
    towerSP: Array<TowerListData>;
}

const TowerListPresenter = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtTower = lang === "ko" ? txtTowerKo : lang === "jp" ? txtTowerJp : txtTowerEn;

    return (
        <CommonLayout>
            <ContentLayout title={"Tower"}>
                <TowerHowTo>
                    {txtTower.main.desc}
                    <br />
                    <ThemedLink dark={dark.dark} to={"/tower/howto"}>
                        <Button>{txtTower.main.howto}</Button>
                    </ThemedLink>
                </TowerHowTo>

                <ContentLayout title={`${txtTower.main.skilltower} GuitarFreaks`}>
                    <TowerListImgs>
                        <TowerListImg list={props.towerGF} />
                    </TowerListImgs>
                </ContentLayout>

                <ContentLayout title={`${txtTower.main.skilltower} DrumMania`}>
                    <TowerListImgs>
                        <TowerListImg list={props.towerDM} />
                    </TowerListImgs>
                </ContentLayout>

                <ContentLayout title={txtTower.main.sptower}>
                    <TowerListImgs>
                        <TowerListImg list={props.towerSP} />
                    </TowerListImgs>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
});

export default TowerListPresenter;
