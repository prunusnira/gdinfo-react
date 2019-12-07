import React from 'react';
import LData from '../Common/language';

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap';

const lang = LData.lang;
const text = LData.text;

const Error500 = () => {
    return (
        <Container>
            <Card>
                <CardHeader>
                    <h3>500 ERROR</h3>
                </CardHeader>
                <CardBody>
                    <CardText>
                        {text.error.e500.e500_1[lang]}<br/><br/>
                        {text.error.e500.e500_2[lang]}<br/>
                        {text.error.e500.e500_3[lang]}<br/><br/>
                        {text.error.e500.e500_4[lang]}<br/>
                        {text.error.e500.e500_5[lang]}<br/><br/>
                        {text.error.e500.e500_6[lang]}
                        <a target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/SIN_Navigator">
                            @SIN_Navigator
                        </a>
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Error500;