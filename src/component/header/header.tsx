import React, {useRef, useState} from 'react'
import HeaderPresenter from './headerPresenter'
import SearchTypeModal from './searchModal/searchTypeModal'

const GDHeader = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [searchType, setSerachType] = useState('music')
    const [searchTypeDlg, openSearchTypeDlg] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null)

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }
    
    const closeMenu = () => {
        setMenuOpen(false)
    }

    const changeSearchType = (type: string) => {
        setSerachType(type)
        closeSearchTypeDlg()
    }

    const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            window.location.href = `/search/${searchType}/${e.currentTarget.value}/1`
        }
    }

    const searchClick = () => {
        window.location.href = `/search/${searchType}/${searchRef.current?.value}/1`
    }

    const closeSearchTypeDlg = () => {
        openSearchTypeDlg(false)
    }

    return (
        <>
            <HeaderPresenter
                isMenuOpen={isMenuOpen}

                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
                
                searchRef={searchRef}
                searchEnter={searchEnter}
                searchClick={searchClick}
                
                searchType={searchType}
                openSearchTypeDlg={openSearchTypeDlg} />
            <SearchTypeModal
                isOpen={searchTypeDlg}
                currentType={searchType}
                cancel={closeSearchTypeDlg}
                ok={changeSearchType} />
        </>
    )
}

export default GDHeader;