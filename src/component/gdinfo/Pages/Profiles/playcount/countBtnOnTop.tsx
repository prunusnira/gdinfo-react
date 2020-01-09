import React, {Component, Fragment} from 'react';
import LData from '../../Common/language';
import txtPlayCount from './txtplaycount';
import {Button} from 'reactstrap';

interface Props {
    changeDiv: (type: number) => void
}

export class CountBtnType1 extends Component<Props> {
    lang = LData.lang;

    render() {
        return (
            <Fragment>
                <Button style={{width:"100%"}} onClick={() => this.props.changeDiv(0)}>
                    {(txtPlayCount.button.pt as any)[this.lang]}
                </Button>
                <Button style={{width:"100%"}} onClick={() => this.props.changeDiv(1)}>
                    {(txtPlayCount.button.music as any)[this.lang]}
                </Button>
            </Fragment>
        )
    }
}

export class CountBtnType2 extends Component<Props> {
    lang = LData.lang;

    render() {
        return (
            <Fragment>
                <Button style={{width:"100%"}} onClick={() => this.props.changeDiv(2)}>
                    {(txtPlayCount.button.gf as any)[this.lang]}
                </Button>
                <Button style={{width:"100%"}} onClick={() => this.props.changeDiv(3)}>
                    {(txtPlayCount.button.dm as any)[this.lang]}
                </Button>
            </Fragment>
        )
    }
}