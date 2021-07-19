import React, { useState } from "react"
import { HeaderNav } from "../../styled/styledHeader"
import { Header } from "../../styled/styledOverall"
import HeaderNavBar from "./navbar/headernav"
import SearchBarComp from "./searchBar/searchBar"
import SearchTypeModal from "./searchModal/searchTypeModal"
import useHeader from "./useHeader"
import useSearch from "./useSearch"

const SinHeader = () => {
    const [searchTxt, setSearchTxt] = useState('')
    const [isMenuOpen, toggleMenu, closeMenu] = useHeader()
    const [
        searchType, searchTypeDlg,
        openSearchTypeDlg,
        searchEnter, searchClick,
        closeSearchTypeDlg, changeSearchType
    ] = useSearch(searchTxt)

    return (
        <>
            <Header>
                <HeaderNav>
                    <HeaderNavBar
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        closeMenu={closeMenu} />
                    <SearchBarComp
                        searchType={searchType}
                        openSearchTypeDlg={openSearchTypeDlg}
                        setSearchTxt={setSearchTxt}
                        searchEnter={searchEnter}
                        searchClick={searchClick} />
                </HeaderNav>
            </Header>
            <SearchTypeModal
                isOpen={searchTypeDlg}
                currentType={searchType}
                cancel={closeSearchTypeDlg}
                ok={changeSearchType} />
        </>
    )
}

export default SinHeader