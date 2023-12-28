import { ESearchType } from '@/data/ESearchType';
import React, { useState } from 'react';

const useSearchType = (searchType: ESearchType) => {
    const [type, setType] = useState(searchType);

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rtn;
        switch (e.currentTarget.value) {
            case 'gskill':
                rtn = ESearchType.GSKILL;
                break;
            case 'dskill':
                rtn = ESearchType.DSKILL;
                break;
            case 'player':
                rtn = ESearchType.PLAYER;
                break;
            case 'music':
            default:
                rtn = ESearchType.MUSIC;
                break;
        }
        setType(rtn);
    };

    return { type, changeType };
};

export default useSearchType;