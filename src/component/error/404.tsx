import React from 'react'
import store from '../../mobx/store'
import { BodyContent, BodyHeader, Container } from '../../styled/styledCommon'

import TxtError404Ko from '../../lang/error/e404-ko'
import TxtError404Jp from '../../lang/error/e404-jp'
import TxtError404En from '../../lang/error/e404-en'

const Error404 = () => {
    const lang = store.language.lang
    
    const TxtError404 =
        lang === 'ko' ? TxtError404Ko :
            lang === 'jp' ? TxtError404Jp : TxtError404En

    return (
        <Container>
            <BodyHeader>
                <h3>404 ERROR</h3>
            </BodyHeader>
            <BodyContent>
                {TxtError404.e404_1}<br/>
                {TxtError404.e404_2}<br/>
                Twitter <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/_nira_one">@_nira_one</a>
            </BodyContent>
        </Container>
    )
}

export default Error404