import React from 'react'
import store from '../../mobx/store'
import { BodyContent, BodyHeader, Container } from '../../styled/styledCommon'
import TxtCommon from '../common/txtCommon'

const Error500 = () => {
    const lang = store.language.lang
    
    return (
        <Container>
            <BodyHeader>
                <h3>500 ERROR</h3>
            </BodyHeader>
            <BodyContent>
                {(TxtCommon.error.e500.e500_1 as any)[lang]}<br/><br/>
                {(TxtCommon.error.e500.e500_2 as any)[lang]}<br/>
                {(TxtCommon.error.e500.e500_3 as any)[lang]}<br/><br/>
                {(TxtCommon.error.e500.e500_4 as any)[lang]}<br/>
                {(TxtCommon.error.e500.e500_5 as any)[lang]}<br/><br/>
                {(TxtCommon.error.e500.e500_6 as any)[lang]}
                <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/_nira_one">
                    @_nira_one
                </a>
            </BodyContent>
        </Container>
    )
}

export default Error500;