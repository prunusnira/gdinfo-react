import React, { useState } from "react"

type UseSearchReturn =
    [
        SearchType,
        boolean,
        (b: boolean) => void,
        (e: React.KeyboardEvent<HTMLInputElement>) => void,
        () => void,
        () => void,
        (type: SearchType) => void,
    ]

export enum SearchType {
    music,
    gskill,
    dskill,
    player
}

const useSearch = (searchTxt: string): UseSearchReturn => {
    const [searchType, setSearchType] = useState(SearchType.music)
    const [searchTypeDlg, openSearchTypeDlg] = useState(false)

    const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            window.location.href =
                `/search/${getSearchTypeTxt(searchType)}/${e.currentTarget.value}/1`
        }
    }

    const searchClick = () => {
        window.location.href =
            `/search/${getSearchTypeTxt(searchType)}/${searchTxt}/1`
    }

    const closeSearchTypeDlg = () => {
        openSearchTypeDlg(false)
    }

    const changeSearchType = (type: SearchType) => {
        setSearchType(type)
        closeSearchTypeDlg()
    }

    const getSearchTypeTxt = (type: SearchType) => {
        let rtn = ''
        switch(type) {
            case SearchType.gskill:
                rtn = 'gskill'
                break
            case SearchType.dskill:
                rtn = 'dskill'
                break
            case SearchType.player:
                rtn = 'player'
                break
            case SearchType.music:
            default:
                rtn = 'music'
                break
        }
        return rtn
    }

    return [
        searchType, searchTypeDlg,
        openSearchTypeDlg,
        searchEnter, searchClick,
        closeSearchTypeDlg, changeSearchType
    ]
}

export default useSearch