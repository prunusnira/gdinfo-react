import store from "@/mobx/store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import SearchBarComp from "../../searchBar/searchBar";
import SearchTypeModal from "../../searchModal/searchTypeModal";
import useSearch from "../../useSearch";
import { getSideBarList } from "../data/sidebarData";
import { SideBarButton, SideBarContainer } from "./sidebar.style";
import SideBarItem from "./sidebarItem";

const SideBar = observer(() => {
    const lang = store.language.lang;
    const [isOpen, setOpen] = useState(false);
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
            <SideBarButton onClick={() => setOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </SideBarButton>
            <SideBarContainer isOpen={isOpen}>
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
