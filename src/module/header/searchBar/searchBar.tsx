import React from "react";
import { ButtonSM } from "@/styled/styledCommon";
import { SearchBar, SearchBarSection, SearchButton } from "./searchBar.style";
import store from "@/mobx/store";
import { SearchType } from "../useSearch";

import HeaderNavDataKo from "@/lang/header/headerNavData-ko";
import HeaderNavDataJp from "@/lang/header/headerNavData-jp";
import HeaderNavDataEn from "@/lang/header/headerNavData-en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchBarProps = {
    searchType: SearchType;
    openSearchTypeDlg: (b: boolean) => void;
    setSearchTxt: (s: string) => void;
    searchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchClick: () => void;
};

const SearchBarComp = (props: SearchBarProps) => {
    const lang = store.language.lang;

    const HeaderNavData =
        lang === "ko" ? HeaderNavDataKo : lang === "jp" ? HeaderNavDataJp : HeaderNavDataEn;

    return (
        <>
            <ButtonSM onClick={() => props.openSearchTypeDlg(true)}>
                {(function () {
                    switch (props.searchType) {
                        case SearchType.music:
                            return "Music";
                        case SearchType.gskill:
                            return "GSkill";
                        case SearchType.dskill:
                            return "DSkill";
                        case SearchType.player:
                            return "Player";
                    }
                })()}
            </ButtonSM>
            <SearchBarSection>
                <SearchBar
                    placeholder={"Search Bar"}
                    onChange={(e) => props.setSearchTxt(e.currentTarget.value)}
                    onKeyDown={props.searchEnter}
                />
                <SearchButton onClick={props.searchClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchButton>
            </SearchBarSection>
        </>
    );
};

export default SearchBarComp;