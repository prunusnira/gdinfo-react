import React from "react";
import { SearchBar, SearchBarSection, SearchButton, SearchTypeButton } from "./searchBar.style";
import store from "@/mobx/store";
import { SearchType } from "../useSearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";

type SearchBarProps = {
    searchType: SearchType;
    openSearchTypeDlg: (b: boolean) => void;
    setSearchTxt: (s: string) => void;
    searchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchClick: () => void;
};

const SearchBarComp = observer((props: SearchBarProps) => {
    const { dark } = store;

    return (
        <>
            <SearchTypeButton dark={dark.dark} onClick={() => props.openSearchTypeDlg(true)}>
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
            </SearchTypeButton>
            <SearchBarSection>
                <SearchBar
                    placeholder={"Search"}
                    onChange={(e) => props.setSearchTxt(e.currentTarget.value)}
                    onKeyDown={props.searchEnter}
                />
                <SearchButton onClick={props.searchClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchButton>
            </SearchBarSection>
        </>
    );
});

export default SearchBarComp;
