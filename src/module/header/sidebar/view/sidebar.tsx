import store from "@/mobx/store";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import SearchBarComp from "../../searchBar/searchBar";
import SearchTypeModal from "../../searchModal/searchTypeModal";
import useSearch from "../../useSearch";
import { getSideBarList } from "../data/sidebarData";
import { SideBarContainer } from "./sidebar.style";
import SideBarItem from "./sidebarItem";

type Props = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
};

const SideBar = observer(({ isMenuOpen, toggleMenu }: Props) => {
    const { language, dark } = store;
    const lang = language.lang;
    const [sideBarList, setSideBarList] = useState(getSideBarList(lang));
    const [searchTxt, setSearchTxt] = useState("");
    const [
        searchType,
        searchTypeDlg,
        openSearchTypeDlg,
        searchEnter,
        searchClick,
        closeSearchTypeDlg,
        changeSearchType,
    ] = useSearch(searchTxt);

    useEffect(() => {
        setSideBarList(getSideBarList(lang));
    }, [lang]);

    return (
        <>
            <SideBarContainer isOpen={isMenuOpen} dark={dark.dark}>
                <SearchBarComp
                    searchType={searchType}
                    openSearchTypeDlg={openSearchTypeDlg}
                    setSearchTxt={setSearchTxt}
                    searchEnter={searchEnter}
                    searchClick={searchClick}
                />
                {sideBarList.map((x) => (
                    <SideBarItem iconSrc={x.iconSrc} text={x.text} href={x.href} sub={x.sub} />
                ))}
            </SideBarContainer>
            <SearchTypeModal
                isOpen={searchTypeDlg}
                currentType={searchType}
                cancel={closeSearchTypeDlg}
                ok={changeSearchType}
            />
        </>
    );
});

export default SideBar;
