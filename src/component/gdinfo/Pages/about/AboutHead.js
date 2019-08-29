import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import txtAboutHead from './txtabouthead';
import LData from '../../js/language';

import {
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

const lang = LData.lang;

function AboutHead() {
    return (
        <Card>
            <CardHeader>
                <h3>How to update</h3>
            </CardHeader>
            <CardBody className="text-center">
                <span>
                    {txtAboutHead.desc[lang]}
                </span><br/>
                <span className="btn-group">
                    <Button tag={Link} to="/about0p">
                        {txtAboutHead.update_au[lang]}
                    </Button>
                    <Button tag={Link} to="/about1">
                        {txtAboutHead.update_man[lang]}
                    </Button>
                    <Button tag={Link} to="/about2">
                        {txtAboutHead.filter_rival[lang]}
                    </Button>
                </span>
            </CardBody>
        </Card>
    )
}

export default AboutHead;