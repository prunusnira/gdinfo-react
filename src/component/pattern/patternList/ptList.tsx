import React from 'react'
import {useParams} from 'react-router-dom'
import { observer } from 'mobx-react'
import PTListPresenter from './ptListPresenter'
import usePTList from './usePTList'
import usePatternSelector from './usePatternSelector'
import PTListSelector from './ptListSelector'
import PTListTitle from './ptListTitle'
import { Container } from '@/styled/styledCommon'

interface MatchProps {
    order: string,
    ver: string,
    page: string
}

const PTList = observer(() => {
    const {order, ver, page} = useParams<MatchProps>()
    const [list, allPage] = usePTList(order, ver, page)
    const [
        switchHot, switchHotMethod,
        switchOther, switchOtherMethod,
        switchVer, switchVerMethod,
        switchOrder, switchOrderMethod,
        nextVer, nextOrder
    ] = usePatternSelector(order, ver, page)

    return (
        <Container>
            <PTListTitle />
            <PTListSelector
                switchHotMethod={switchHotMethod}
                switchOtherMethod={switchOtherMethod}
                switchVerMethod={switchVerMethod}
                switchOrderMethod={switchOrderMethod} />
            <PTListPresenter
                switchHot={switchHot}
                switchOther={switchOther}
                switchVer={switchVer}
                switchOrder={switchOrder}

                order={order}
                nextVer={nextVer}
                nextOrder={nextOrder}
                
                list={list}
                page={page}
                allPage={allPage}
                ver={ver} />
        </Container>
    )
})

export default PTList