import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import { Anchor } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import SearchBarComp from '../../searchBar/searchBar';
import SearchTypeModal from '../../searchModal/searchTypeModal';
import useSearch from '../../useSearch';
import { getSideBarList } from '../data/sidebarData';
import { LevelDiff, LvDiffDiv, SideBarContainer, SideBarInner } from './sidebar.style';
import SideBarItem from './sidebarItem';

interface Props {
    isMenuOpen: boolean;
}

const SideBar = ({ isMenuOpen }: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);
    const [sideBarList, setSideBarList] = useState(getSideBarList(lang));
    const [searchTxt, setSearchTxt] = useState('');
    const {
        searchType,
        searchTypeDlg,
        openSearchTypeDlg,
        searchEnter,
        searchClick,
        closeSearchTypeDlg,
        changeSearchType,
    } = useSearch(searchTxt);

    useEffect(() => {
        setSideBarList(getSideBarList(lang));
    }, [lang]);

    return (
        <>
            <SideBarContainer isOpen={isMenuOpen} dark={dark}>
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
                        <LvDiffDiv
                            dark={dark}
                        >{`>> GALAXY WAVE vs FUZZ-UP <<`}</LvDiffDiv>
                        <LvDiffDiv>
                            <Anchor dark={dark} href={`/lvdiff/gf`}>
                                GuitarFreaks
                            </Anchor>
                        </LvDiffDiv>
                        <LvDiffDiv>
                            <Anchor dark={dark} href={`/lvdiff/dm`}>
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
};

export default SideBar;
