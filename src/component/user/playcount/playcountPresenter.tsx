import React from 'react'
import txtPlayCount from './txtplaycount';
import CountTable from './countTable';
import scrShot from '../../common/scrshot';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon';
import PlaycountData from './playcountData';

interface Props {
    lang: string,
    userName: string,
    id: string,
    towerTitle: string,
    display0: string,
    display1: string,
    display2: string,
    display3: string,
    plist: Array<PlaycountData>,
    glist: Array<PlaycountData>,
    dlist: Array<PlaycountData>,
    mlist: Array<PlaycountData>,
    changeDiv: (n: number) => void,
}

const PlayCountPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Play Count</h3>
                </BodyHeader>
                <BodyContent className="text-center">
                    <ItemRow>
                        <Button style={{width:"100%"}} onClick={() => scrShot("scrshot", `${props.id}_mybest.jpg`)}>
                            {(txtPlayCount.button.scrshot as any)[props.lang]}
                        </Button>
                    </ItemRow>
                    <ItemRow>
                        {(txtPlayCount.desc_1 as any)[props.lang]}
                        <span style={{color:"red"}}>
                            {(txtPlayCount.desc_2 as any)[props.lang]}
                        </span>
                        {(txtPlayCount.desc_3 as any)[props.lang]}
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow id="scrshot" setVertical={true}>
                <BodyHeader className="text-center" id="userinfo">
                    <h4>Most Played List</h4>
                    <span>Player:&nbsp;
                        <img
                            alt="titletower"
                            style={{width:"30px"}}
                            src={`${process.env.PUBLIC_URL}/general-img/title/${props.towerTitle}.png`} />
                        {props.userName}
                    </span>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => props.changeDiv(0)}>
                                {(txtPlayCount.button.pt as any)[props.lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => props.changeDiv(1)}>
                                {(txtPlayCount.button.music as any)[props.lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => props.changeDiv(2)}>
                                {(txtPlayCount.button.gf as any)[props.lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => props.changeDiv(3)}>
                                {(txtPlayCount.button.dm as any)[props.lang]}
                            </Button>
                        </ItemCol>
                    </ItemRow>
                    <ItemRow style={{display:props.display0}}>
                        <CountTable data={props.plist}></CountTable> {/*AllPattern*/}
                    </ItemRow>
                    <ItemRow style={{display:props.display1}}>
                        <CountTable data={props.mlist}></CountTable> {/*GF*/}
                    </ItemRow>
                    <ItemRow style={{display:props.display2}}>
                        <CountTable data={props.glist}></CountTable> {/*DM*/}
                    </ItemRow>
                    <ItemRow style={{display:props.display3}}>
                        <CountTable data={props.dlist}></CountTable> {/*Music*/}
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default PlayCountPresenter