import useUserData from '@/module/common/useUserData';
import React from 'react';
import { useParams } from 'react-router-dom';
import PlayCountPresenter from './playcountPresenter';
import usePlayCount from './usePlayCount';

const PlayCount = () => {
    const { id } = useParams();
    const { userName, titleTower } = useUserData(id);
    const { plist, glist, dlist, mlist } = usePlayCount(id);

    return (
        <PlayCountPresenter
            userName={userName}
            id={id}
            towerTitle={titleTower}
            plist={plist}
            glist={glist}
            dlist={dlist}
            mlist={mlist}
        />
    );
};

export default PlayCount;
