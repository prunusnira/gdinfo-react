import React from 'react'
import store from '@/mobx/store'
import { BodyContent, BodyHeader, Container } from '@/styled/styledCommon'
import { observer } from 'mobx-react'

import TxtError500Ko from '@/lang/error/e500-ko'
import TxtError500Jp from '@/lang/error/e500-jp'
import TxtError500En from '@/lang/error/e500-en'

const Error500 = observer(() => {
    const lang = store.language.lang
    
    const TxtError500 =
        lang === 'ko' ? TxtError500Ko :
            lang === 'jp' ? TxtError500Jp : TxtError500En
    
    return (
        <Container>
            <BodyHeader>
                <h3>500 ERROR</h3>
            </BodyHeader>
            <BodyContent>
                {TxtError500.e500_1}<br/><br/>
                {TxtError500.e500_2}<br/>
                {TxtError500.e500_3}<br/><br/>
                {TxtError500.e500_4}<br/>
                {TxtError500.e500_5}<br/><br/>
                {TxtError500.e500_6}
                <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/_nira_one">
                    @_nira_one
                </a>
            </BodyContent>
        </Container>
    )
})

export default Error500;