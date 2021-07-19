import React from 'react'
import {Link} from 'react-router-dom'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'

import txtResetKo from '../../../lang/user/reset/txtReset-ko'
import txtResetJp from '../../../lang/user/reset/txtReset-jp'
import txtResetEn from '../../../lang/user/reset/txtReset-en'

interface Props {
    lang: string,
    resetData: () => void
}

const ResetPresenter = (props: Props) => {
    const txtReset =
        props.lang === 'ko' ? txtResetKo :
            props.lang === 'jp' ? txtResetJp : txtResetEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Data Reset</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <BodyHeader>
                            <h3>{txtReset.title}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <p>{txtReset.desc1}</p>
                        </BodyContent>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <BodyHeader>
                            <h3>{txtReset.desc2t}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <p>{txtReset.desc2s}</p>
                            <p>{txtReset.desc3}</p>
                            <p>{txtReset.desc4}</p>
                            <p>{txtReset.desc5}</p>
                        </BodyContent>
                    </ItemRow>
                    
                    <ItemRow>
                        <ItemCol size={5}>
                            <Button onClick={props.resetData} style={{width:"100%"}}>YES</Button>
                        </ItemCol>
                        <ItemCol size={5}>
                            <Link to="/index">
                                <Button style={{width:"100%"}}>NO</Button>
                            </Link>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default ResetPresenter