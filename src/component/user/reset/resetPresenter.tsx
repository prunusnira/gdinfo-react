import React from 'react'
import {Link} from 'react-router-dom';
import txtReset from './txtreset';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon';

interface Props {
    lang: string,
    resetData: () => void
}

const ResetPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Data Reset</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <BodyHeader>
                            <h3>{(txtReset.title as any)[props.lang]}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <p>{(txtReset.desc1 as any)[props.lang]}</p>
                        </BodyContent>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <BodyHeader>
                            <h3>{(txtReset.desc2t as any)[props.lang]}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <p>{(txtReset.desc2s as any)[props.lang]}</p>
                            <p>{(txtReset.desc3 as any)[props.lang]}</p>
                            <p>{(txtReset.desc4 as any)[props.lang]}</p>
                            <p>{(txtReset.desc5 as any)[props.lang]}</p>
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