import React from 'react'
import {Redirect} from 'react-router-dom';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon';
import txtPattern from './txtpattern';
import Pager from '../../common/pager';
import PatternListItem from './ptListItem';
import { PatternData } from './patternData';
import store from '../../../mobx/store';

interface Props {
    switchHot: boolean,
    switchOther: boolean,
    switchVer: boolean,
    switchOrder: boolean,
    
    switchHotMethod: () => void,
    switchOtherMethod: () => void,
    switchVerMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    switchOrderMethod: (type: number) => void,

    order: string,
    nextVer: string,
    nextOrder: string,

    list: Array<PatternData>,
    page: string,
    allPage: number,
    ver: string,
}

const PatternPresenter = (props: Props) => {
    const lang = store.language.lang

    if(props.switchHot) {
        if(!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=h`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=h`}/>
    }
    if(props.switchOther) {
        if(!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=o`))
            return <Redirect to={`/pattern/00/${props.order}/1?hot=o`}/>
    }
    if(props.switchVer) {
        if(!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.order}/1`))
            return <Redirect to={`/pattern/${props.nextVer}/${props.order}/1`}/>
    }
    if(props.switchOrder) {
        if(!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`))
            return <Redirect to={`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`}/>
    }
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Pattern List</h3>
                </BodyHeader>
                <BodyContent>
                    <span>
                        {(txtPattern.desc1 as any)[lang]}<br/>
                        {(txtPattern.desc2 as any)[lang]}
                    </span>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Search Options</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <ItemRow>Hot/Other</ItemRow>
                            <ItemRow keepDirHor={true}>
                                <ItemCol size={5}>
                                    <Button
                                        style={{width: '100%'}}
                                        onClick={props.switchHotMethod}>
                                        Hot
                                    </Button>
                                </ItemCol>
                                <ItemCol size={5}>
                                    <Button
                                        style={{width: '100%'}}
                                        onClick={props.switchOtherMethod}>
                                        Other
                                    </Button>
                                </ItemCol>
                            </ItemRow>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <ItemRow>Version</ItemRow>
                            <ItemRow>
                                <select onChange={props.switchVerMethod} className="form-control">
                                    <option value="--">SELECT</option>
                                    <option value="00">All</option>
                                    <option value="01">GF1</option>
                                    <option value="02">GF2dm1</option>
                                    <option value="03">GF3dm2</option>
                                    <option value="04">GF4dm3</option>
                                    <option value="05">GF5dm4</option>
                                    <option value="06">GF6dm5</option>
                                    <option value="07">GF7dm6</option>
                                    <option value="08">GF8dm7</option>
                                    <option value="09">GF9dm8</option>
                                    <option value="10">GF10dm9</option>
                                    <option value="11">GF11dm10</option>
                                    <option value="12">ee'mall</option>
                                    <option value="13">V</option>
                                    <option value="14">V2</option>
                                    <option value="15">V3</option>
                                    <option value="16">V4</option>
                                    <option value="17">V5</option>
                                    <option value="18">V6</option>
                                    <option value="19">XG</option>
                                    <option value="20">XG2</option>
                                    <option value="21">XG3</option>
                                    <option value="22">GD</option>
                                    <option value="23">GD OD</option>
                                    <option value="24">GD TB</option>
                                    <option value="25">GD TBRE</option>
                                    <option value="26">GD MX</option>
                                    <option value="27">GD EX</option>
                                    <option value="28">GD NX</option>
                                </select>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                    <ItemRow setVertical={true}>
                        <ItemRow>Order</ItemRow>
                        <ItemRow keepDirHor={true}>
                            <ItemCol size={5}>
                                <Button
                                     style={{width: '100%'}}
                                     onClick={() => props.switchOrderMethod(0)}>
                                    {(txtPattern.filter.btn.title as any)[lang]} ▲/▼
                                </Button>
                            </ItemCol>
                            <ItemCol size={5}>
                                <Button
                                     style={{width: '100%'}}
                                     onClick={() => props.switchOrderMethod(1)}>
                                    {(txtPattern.filter.btn.version as any)[lang]} ▲/▼
                                </Button>
                            </ItemCol>
                        </ItemRow>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h4>{(txtPattern.ptinfo as any)[lang]}</h4>
                </BodyHeader>
                <BodyContent>
                    <PatternListItem list={props.list}/>
                    <ItemRow keepDirHor={true}>
                        <Pager cpage={parseInt(props.page)}
                                allpage={props.allPage}
                                baseUrl={`/pattern/${props.ver}/${props.order}/`}
                                afterUrl={window.location.search} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default PatternPresenter