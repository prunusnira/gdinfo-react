import React from 'react';
import store from '../../../../mobx/store';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../../styled/styledCommon';
import txtTerms from './txtterms';

const Terms = () => {
    const lang = store.language.lang

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{(txtTerms.title as any)[lang]}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <h4>{(txtTerms.s1t as any)[lang]}</h4>
                        <span>{(txtTerms.s1c1 as any)[lang]}</span>
                        <span>{(txtTerms.s1c2 as any)[lang]}</span>
                        <span>{(txtTerms.s1c3 as any)[lang]}</span>
                        <span>{(txtTerms.s1c4 as any)[lang]}</span>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <h4>{(txtTerms.s2t as any)[lang]}</h4>
                        <span>{(txtTerms.s2c1 as any)[lang]}</span>
                        <span>{(txtTerms.s2c2 as any)[lang]}</span>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <h4>{(txtTerms.s3t as any)[lang]}</h4>
                        <span>{(txtTerms.s3c1 as any)[lang]}</span>
                        <span>{(txtTerms.s3c2 as any)[lang]}</span>
                        <span>{(txtTerms.s3c3 as any)[lang]}</span>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <span>{(txtTerms.s4 as any)[lang]}</span>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default Terms;