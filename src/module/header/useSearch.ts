import { ESearchType } from '@/data/ESearchType';
import React, { useState } from 'react';

const useSearch = (searchTxt: string) => {
    const [searchType, setSearchType] = useState(ESearchType.MUSIC);
    const [searchTypeDlg, openSearchTypeDlg] = useState(false);

    const getSearchTypeTxt = (type: ESearchType) => {
        let rtn;
        switch (type) {
            case ESearchType.GSKILL:
                rtn = 'gskill';
                break;
            case ESearchType.DSKILL:
                rtn = 'dskill';
                break;
            case ESearchType.PLAYER:
                rtn = 'player';
                break;
            case ESearchType.MUSIC:
            default:
                rtn = 'music';
                break;
        }
        return rtn;
    };

    const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            window.location.href =
                `/search/${getSearchTypeTxt(searchType)}/${e.currentTarget.value}/1`;
        }
    };

    const searchClick = () => {
        window.location.href =
            `/search/${getSearchTypeTxt(searchType)}/${searchTxt}/1`;
    };

    const closeSearchTypeDlg = () => {
        openSearchTypeDlg(false);
    };

    const changeSearchType = (type: ESearchType) => {
        setSearchType(type);
        closeSearchTypeDlg();
    };

    return {
        searchType, searchTypeDlg,
        openSearchTypeDlg,
        searchEnter, searchClick,
        closeSearchTypeDlg, changeSearchType,
    };
};

export default useSearch;