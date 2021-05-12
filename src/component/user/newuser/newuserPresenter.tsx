import React from 'react'
import txtNewuser from './txtnewuser'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'

interface Props {
    lang: string,
    addNewUser: () => void,
    dropUser: () => void
}

const NewUserPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Sign Up</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <h4>{(txtNewuser.title as any)[props.lang]}</h4>
                        <span>{(txtNewuser.desc as any)[props.lang]}</span>
                    </ItemRow>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={5}>
                            <Button style={{width: '100%'}} onClick={props.addNewUser}>
                                {(txtNewuser.btnsign as any)[props.lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5}>
                            <Button style={{width: '100%'}} onClick={props.dropUser}>
                                {(txtNewuser.btndecline as any)[props.lang]}
                            </Button>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default NewUserPresenter