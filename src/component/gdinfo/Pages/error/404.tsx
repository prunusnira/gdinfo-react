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

const Error404 = () => {
    return (
        <Container>
            <Card>
            <CardHeader>
                <h3>404 ERROR</h3>
            </CardHeader>
                <CardBody>
                    <CardText>
                        {(TxtCommon.error.e404_1 as any)[lang]}<br/>
                        {(TxtCommon.error.e404_2 as any)[lang]}<br/>
                        Twitter <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/_nira_one">@_nira_one</a>
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Error404;