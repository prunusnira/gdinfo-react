import { ITowerList } from '@/data/tower/ITowerList';
import { atomDarkmode } from '@/jotai/darkmode';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { TowerItemImg } from './toweritem.style';

interface Props {
    list: Array<ITowerList>;
}

const TowerListImg = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            {props.list.map((tower, i) => (
                <ThemedLink
                    $dark={dark}
                    key={i}
                    to={tower.link}
                    data-testid="towerUrl">
                    <TowerItemImg alt="towerimg" src={tower.img} />
                </ThemedLink>
            ))}
        </>
    );
};

export default TowerListImg;
