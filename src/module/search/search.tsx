import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchPresenter from './searchPresenter';
import useMusicSearch from './useMusicSearch';
import useUserSearch from './useUserSearch';

const SearchResult = () => {
    const [allpage, setAllPage] = useState(0);
    const { type, page, value } = useParams();
    const { userlist } = useUserSearch({ type, page, value, setAllPage });
    const { musiclist } = useMusicSearch({ type, page, value, setAllPage });

    return (
        <SearchPresenter
            userlist={userlist}
            musiclist={musiclist}
            type={type}
            page={page}
            value={value}
            allpage={allpage} />
    );
};

export default SearchResult;