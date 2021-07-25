import React, { useState } from "react"

type UseSearchReturn =
    [
        string,
        boolean,
        (b: boolean) => void,
        (e: React.KeyboardEvent<HTMLInputElement>) => void,
        () => void,
        () => void,
        (type: string) => void,
    ]

const useSearch = (searchTxt: string): UseSearchReturn => {
    const [searchType, setSearchType] = useState('music')
    const [searchTypeDlg, openSearchTypeDlg] = useState(false)

    const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            window.location.href = `/search/${searchType}/${e.currentTarget.value}/1`
        }
    }

    const searchClick = () => {
        window.location.href = `/search/${searchType}/${searchTxt}/1`
    }

    const closeSearchTypeDlg = () => {
        openSearchTypeDlg(false)
    }

    const changeSearchType = (type: string) => {
        setSearchType(type)
        closeSearchTypeDlg()
    }

    return [
        searchType, searchTypeDlg,
        openSearchTypeDlg,
        searchEnter, searchClick,
        closeSearchTypeDlg, changeSearchType
    ]
}

export default useSearch