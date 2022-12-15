import store from "@/mobx/store";
import { Anchor } from "@/styled/styledCommon";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import SearchBarComp from "../../searchBar/searchBar";
import SearchTypeModal from "../../searchModal/searchTypeModal";
import useSearch from "../../useSearch";
import { getSideBarList } from "../data/sidebarData";
import {
    LevelDiff,
    LvDiffDiv,
    SideBarContainer,
    SideBarInner,
} from "./sidebar.style";
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
                <SideBarInner>
                    <SearchBarComp
                        searchType={searchType}
                        openSearchTypeDlg={openSearchTypeDlg}
                        setSearchTxt={setSearchTxt}
                        searchEnter={searchEnter}
                        searchClick={searchClick}
                    />
                    {sideBarList.map((x, i) => (
                        <SideBarItem
                            key={`sidebar${i}`}
                            iconSrc={x.iconSrc}
                            text={x.text}
                            href={x.href}
                            sub={x.sub}
                        />
                    ))}
                    <LevelDiff>
                        <LvDiffDiv>{`>> FUZZ-UP vs HIGH-VOLTAGE <<`}</LvDiffDiv>
                        <LvDiffDiv>
                            <Anchor dark={dark.dark} href={`/lvdiff/gf`}>
                                GuitarFreaks
                            </Anchor>
                        </LvDiffDiv>
                        <LvDiffDiv>
                            <Anchor dark={dark.dark} href={`/lvdiff/dm`}>
                                DrumMania
                            </Anchor>
                        </LvDiffDiv>
                    </LevelDiff>
                </SideBarInner>
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
