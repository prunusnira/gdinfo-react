import React from "react"
import { ButtonSM } from "../../../styled/styledCommon"
import { SearchBar, SearchBarSection } from "../../../styled/styledHeader"
import store from "../../../mobx/store"

import HeaderNavDataKo from '../../../lang/header/headerNavData-ko'
import HeaderNavDataJp from '../../../lang/header/headerNavData-jp'
import HeaderNavDataEn from '../../../lang/header/headerNavData-en'

type SearchBarProps = {
    searchType: string,
    openSearchTypeDlg: (b: boolean) => void,
    setSearchTxt: (s: string) => void,
    searchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    searchClick: () => void,
}

const SearchBarComp = (props: SearchBarProps) => {
    const lang = store.language.lang
    
    const HeaderNavData =
        lang === 'ko' ? HeaderNavDataKo :
            lang === 'jp' ? HeaderNavDataJp : HeaderNavDataEn

    return (
        <SearchBarSection>
            <ButtonSM onClick={() => props.openSearchTypeDlg(true)}>
                {
                    (function() {
                        switch(props.searchType) {
                            case 'music': return 'Music'
                            case 'gskill': return 'GSkill'
                            case 'dskill': return 'DSkill'
                            case 'player': return 'Player'
                        }
                    })()
                }
            </ButtonSM>
            <SearchBar
                placeholder={'Search Bar'}
                onChange={(e) => props.setSearchTxt(e.currentTarget.value)}
                onKeyDown={props.searchEnter} />
            <ButtonSM onClick={props.searchClick}>
                {HeaderNavData.search}
            </ButtonSM>
        </SearchBarSection>
    )
}

export default SearchBarComp