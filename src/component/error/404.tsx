import React from 'react'
import store from '../../mobx/store'
import { BodyContent, BodyHeader, Container } from '../../styled/styledCommon'
import TxtCommon from '../common/txtCommon'

const Error404 = () => {
    const lang = store.language.lang
    
    return (
        <Container>
            <BodyHeader>
                <h3>404 ERROR</h3>
            </BodyHeader>
            <BodyContent>
                {(TxtCommon.error.e404_1 as any)[lang]}<br/>
                {(TxtCommon.error.e404_2 as any)[lang]}<br/>
                Twitter <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/_nira_one">@_nira_one</a>
            </BodyContent>
        </Container>
    )
}

export default Error404