import useUserData from '@/module/common/useUserData';
import React from 'react';
import { useParams } from 'react-router-dom';
import ClearTablePresenter from './clearTablePresenter';
import useClearTable from './useClearTable';

const ClearTable = () => {
    const { userid } = useParams();
    const glist = useClearTable({ userid, type: 'gf' });
    const dlist = useClearTable({ userid, type: 'dm' });
    const { userName, profileLink, titleTower } = useUserData(userid);

    return (
        <ClearTablePresenter
            profileLink={profileLink}
            titleTower={titleTower}
            userName={userName}
            glist={glist}
            dlist={dlist}
        />
    );
};

export default ClearTable;
