import React from 'react'
import {Redirect} from 'react-router-dom'
import { BodyContent, BodyHeader, ItemRow } from '@/styled/styledCommon'
import Pager from '@/component/common/pager'
import PatternListItem from './ptListItem'
import { PatternData } from './patternData'
import store from '@/mobx/store'

import txtPatternKo from '@/lang/pattern/pattern/txtPattern-ko'
import txtPatternJp from '@/lang/pattern/pattern/txtPattern-jp'
import txtPatternEn from '@/lang/pattern/pattern/txtPattern-en'

interface Props {
    switchHot: boolean,
    switchOther: boolean,
    switchVer: boolean,
    switchOrder: boolean,

    order: string,
    nextVer: string,
    nextOrder: string,

    list: Array<PatternData>,
    page: string,
    allPage: number,
    ver: string,
}

const PTListPresenter = (props: Props) => {
    const lang = store.language.lang
    
    const txtPattern =
        lang === 'ko' ? txtPatternKo :
            lang === 'jp' ? txtPatternJp : txtPatternEn

    if(props.switchHot) {
        if(!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=h`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=h`}/>
    }
    if(props.switchOther) {
        if(!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=o`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=o`}/>
    }
    if(props.switchVer) {
        if(!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.order}/1`))
            return <Redirect to={`/pattern/${props.nextVer}/${props.order}/1`}/>
    }
    if(props.switchOrder) {
        if(!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`))
            return <Redirect to={`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`}/>
    }
    return (
        <ItemRow setVertical={true}>
            <BodyHeader>
                <h4>{txtPattern.ptinfo}</h4>
            </BodyHeader>
            <BodyContent>
                <PatternListItem list={props.list}/>
                <ItemRow keepDirHor={true}>
                    <Pager cpage={parseInt(props.page)}
                            allpage={props.allPage}
                            baseUrl={`/pattern/${props.ver}/${props.order}/`}
                            afterUrl={window.location.search} />
                </ItemRow>
            </BodyContent>
        </ItemRow>
    )
}

export default PTListPresenter