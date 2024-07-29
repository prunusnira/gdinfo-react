import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { ITowerList } from '@/data/tower/ITowerList';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtTowerEn from '@/lang/tower/txtTower-en';
import txtTowerJp from '@/lang/tower/txtTower-jp';
import txtTowerKo from '@/lang/tower/txtTower-ko';
import { Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import TowerListImg from './toweritem';
import { TowerHowTo, TowerListImgs } from './towerListPresenter.style';

interface Props {
    towerGF: Array<ITowerList>;
    towerDM: Array<ITowerList>;
    towerSP: Array<ITowerList>;
}

const TowerListPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtTower = lang === 'ko' ? txtTowerKo : lang === 'jp' ? txtTowerJp : txtTowerEn;

    return (
        <CommonLayout>
            <ContentLayout title={'Tower'}>
                <TowerHowTo>
                    {txtTower.main.desc}
                    <br />
                    <ThemedLink $dark={dark} to={'/tower/howto'}>
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
};

export default TowerListPresenter;
