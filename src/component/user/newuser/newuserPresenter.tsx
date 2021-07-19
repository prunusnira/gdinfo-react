import React from 'react'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'
import store from '../../../mobx/store'

import txtNewuserKo from '../../../lang/user/newuser/txtNewUser-ko'
import txtNewuserJp from '../../../lang/user/newuser/txtNewUser-jp'
import txtNewuserEn from '../../../lang/user/newuser/txtNewUser-en'

interface Props {
    addNewUser: () => void,
    dropUser: () => void
}

const NewUserPresenter = (props: Props) => {
    const lang = store.language.lang

    const txtNewuser =
        lang === 'ko' ? txtNewuserKo :
            lang === 'jp' ? txtNewuserJp : txtNewuserEn
            
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Sign Up</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <h4>{txtNewuser.title}</h4>
                        <span>{txtNewuser.desc}</span>
                    </ItemRow>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={5}>
                            <Button style={{width: '100%'}} onClick={props.addNewUser}>
                                {txtNewuser.btnsign}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5}>
                            <Button style={{width: '100%'}} onClick={props.dropUser}>
                                {txtNewuser.btndecline}
                            </Button>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default NewUserPresenter