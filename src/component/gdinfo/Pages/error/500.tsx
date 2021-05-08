import React from 'react';
import LData from '../Common/language';

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap';
import TxtCommon from '../Common/txtCommon';

const lang = LData.lang;

const Error500 = () => {
    return (
        <Container>
            <Card>
                <CardHeader>
                    <h3>500 ERROR</h3>
                </CardHeader>
                <CardBody>
                    <CardText>
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
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Error500;