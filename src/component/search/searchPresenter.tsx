import React from "react"
import store from "../../mobx/store"
import { BodyContent, BodyHeader, Container, ItemRow } from "../../styled/styledCommon"
import RecentTableDiv from "../recent/recentTableDiv"
import RecentData from "../recent/recentData"
import { PatternData } from "../pattern/patternList/patternData"
import PatternListItem from '../pattern/patternList/ptListItem'
import Pager from "../common/pager"

import txtSearchKo from '../../lang/search/txtSearch-ko'
import txtSearchJp from '../../lang/search/txtSearch-jp'
import txtSearchEn from '../../lang/search/txtSearch-en'

type SearchProps = {
    userlist: Array<RecentData>,
    musiclist: Array<PatternData>,
    type: string,
    page: string,
    value: string,
    allpage: number,
}

const SearchPresenter = (props: SearchProps) => {
    const lang = store.language.lang
    
    const txtSearch =
        lang === 'ko' ? txtSearchKo :
            lang === 'jp' ? txtSearchJp : txtSearchEn

    return (
        <Container>
            <ItemRow>
                <BodyHeader>
                    <h3>{txtSearch.title}</h3>
                    <span>{txtSearch.desc}</span>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <RecentTableDiv isMain={false} list={props.userlist} />
                    </ItemRow>
                    <ItemRow>
                        <PatternListItem list={props.musiclist} />
                    </ItemRow>
                    <Pager cpage={parseInt(props.page)} allpage={props.allpage}
                        baseUrl={`/search/${props.type}/${props.value}/`}
                        afterUrl={""} />
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default SearchPresenter