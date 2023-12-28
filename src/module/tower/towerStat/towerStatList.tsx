import { ITowerStat } from '@/data/tower/ITowerStat';
import { ITowerTitle } from '@/data/tower/ITowerTitle';
import { atomDarkmode } from '@/jotai/darkmode';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import TowerFloorItem from './towerFloorItem';
import {
    StatFloorClear,
    StatFloorClearImg,
    StatFloorItemWrapper,
    StatFloorRow,
    StatFloorTitle,
    StatFloorUserTitle,
    StatFloorUserTitleBtn,
    StatFloorWrapper,
} from './towerStatList.style';

interface Props {
    list: Array<ITowerStat>;
    id: string;
    setTitleToBeChanged: (t: ITowerTitle) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerStatList = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);

    const divopen = (i: string) => {
        const div = document.getElementById(i);

        if (div) {
            if (div.style.display === 'none') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        }
    };

    return (
        <>
            {props.list.map((tl, i) => (
                <StatFloorWrapper key={`towerStat${i}`}>
                    <StatFloorRow dark={dark} onClick={() => divopen(tl.floorid)}>
                        <StatFloorTitle>
                            {tl.opbtn} Floor {tl.floor}
                        </StatFloorTitle>
                        <StatFloorClear>
                            <StatFloorClearImg alt="floorclear" src={tl.floorclear} />
                        </StatFloorClear>
                        <StatFloorUserTitle>
                            <StatFloorUserTitleBtn
                                disabled={!tl.btnchangable}
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
                            <span style={{ padding: '10px' }}>{tl.clearnotice}</span>
                        </div>
                        <TowerFloorItem
                            list={tl.floorlist}
                            setTitleChangeModal={props.setTitleChangeModal}
                            setTitleToBeChanged={props.setTitleToBeChanged}
                        />
                    </StatFloorItemWrapper>
                </StatFloorWrapper>
            ))}
        </>
    );
};

export default TowerStatList;
