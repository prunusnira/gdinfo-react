import { IFloorItem } from '@/data/tower/IFloorItem';
import { ITowerTitle } from '@/data/tower/ITowerTitle';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtTowerEn from '@/lang/tower/txtTower-en';
import txtTowerJp from '@/lang/tower/txtTower-jp';
import txtTowerKo from '@/lang/tower/txtTower-ko';
import { useAtomValue } from 'jotai/index';
import React, { Fragment } from 'react';
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
} from './towerFloorItem.style';

interface Props {
    list: Array<IFloorItem>;
    setTitleToBeChanged: (t: ITowerTitle) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerFloorItem = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);
    const txtTower = lang === 'ko' ? txtTowerKo : lang === 'jp' ? txtTowerJp : txtTowerEn;

    return (
        <>
            {props.list.map((fl, i) => (
                <Fragment key={`floorItem${i}`}>
                    <FloorItemWrapper dark={dark}>
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
                                <span style={{ color: 'red' }}>{fl.rate}</span>
                            ) : fl.rate < fl.condRate ? (
                                <span style={{ color: 'blue' }}>{fl.rate}</span>
                            ) : (
                                fl.rate
                            )}
                            % / {fl.condRate}%
                            <br />
                            {fl.condFc ? 'FC Req' : 'Non-FC OK'}
                            {fl.fc ? '(FC)' : '(No)'}
                        </FICondition>
                        <FIClear>
                            <FIClearImg src={fl.clear} />
                            {
                                <FIUserTitle
                                    disabled={fl.title.type === 0}
                                    onClick={() => {
                                        props.setTitleToBeChanged(fl.title);
                                        props.setTitleChangeModal(true);
                                    }}
                                >
                                    {txtTower.detail.btntitlechange}
                                </FIUserTitle>
                            }
                        </FIClear>
                    </FloorItemWrapper>
                </Fragment>
            ))}
        </>
    );
};

export default TowerFloorItem;
