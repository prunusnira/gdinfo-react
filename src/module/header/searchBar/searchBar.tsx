import { ESearchType } from '@/data/common/ESearchType';
import { atomDarkmode } from '@/jotai/darkmode';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { SearchBar, SearchBarSection, SearchButton, SearchTypeButton } from './searchBar.style';

interface Props {
    searchType: ESearchType;
    openSearchTypeDlg: (b: boolean) => void;
    setSearchTxt: (s: string) => void;
    searchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchClick: () => void;
}

const SearchBarComp = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <>
            <SearchTypeButton dark={dark} onClick={() => props.openSearchTypeDlg(true)}>
                {(function() {
                    switch (props.searchType) {
                        case ESearchType.GSKILL:
                            return 'GSkill';
                        case ESearchType.DSKILL:
                            return 'DSkill';
                        case ESearchType.PLAYER:
                            return 'Player';
                        case ESearchType.MUSIC:
                        default:
                            return 'Music';
                    }
                })()}
            </SearchTypeButton>
            <SearchBarSection>
                <SearchBar
                    placeholder={'Search'}
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
