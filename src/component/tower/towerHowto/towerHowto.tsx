import React from 'react';
import txtTower from '../txttower';
import store from '../../../mobx/store';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../styled/styledCommon';

const TowerHowto = () => {
    const lang = store.language.lang

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>The Tower - How to Update</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow className="about-part">
                        <span>{(txtTower.howto.step1 as any)[lang]}</span>
                    </ItemRow>
                    <ItemRow className="about-part">
                        <img alt="towerhowto1" style={{width:"50%"}} src={`${process.env.PUBLIC_URL}/general-img/towerhowto/okiniiri.jpg`} />
                    </ItemRow>
                    <ItemRow className="about-part">
                        <span>{(txtTower.howto.step2 as any)[lang]}</span>
                    </ItemRow>
                    <ItemRow className="about-part" keepDirHor={true}>
                        <img alt="towerhowto2" style={{width:"40%"}} src={`${process.env.PUBLIC_URL}/general-img/towerhowto/update.jpg`} />
                        <img alt="towerhowto3" style={{width:"40%"}} src={`${process.env.PUBLIC_URL}/general-img/towerhowto/update2.jpg`} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default TowerHowto