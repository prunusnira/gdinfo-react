import React from "react"
import { Link } from "react-router-dom"
import { BodyContent, BodyHeader, Button, ItemCol, ItemRow } from "@/styled/styledCommon"
import store from "@/mobx/store"

import txtNoRecordKo from '@/lang/pattern/noRecord/txtNoRecord-ko'
import txtNoRecordJp from '@/lang/pattern/noRecord/txtNoRecord-jp'
import txtNoRecordEn from '@/lang/pattern/noRecord/txtNoRecord-en'

type SelectorType = {
    userid: string,
    switchLvMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    switchVerMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    switchHotMethod: () => void,
    switchOtherMethod: () => void,
    switchClearMethod: () => void,
}

const NoRecordSelector = (props: SelectorType) => {
    const lang = store.language.lang
    
    const txtNoRecord =
        lang === 'ko' ? txtNoRecordKo :
            lang === 'jp' ? txtNoRecordJp : txtNoRecordEn
            
    return (
        <>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Option Table</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <ItemRow>Level</ItemRow>
                            <ItemRow>
                                <select onChange={props.switchLvMethod} className="form-control">
                                    <option value="--">SELECT</option>
                                    <option value="0">All</option>
                                    <option value="1">1.00-1.49</option>
                                    <option value="2">1.50-1.99</option>
                                    <option value="3">2.00-2.49</option>
                                    <option value="4">2.50-2.99</option>
                                    <option value="5">3.00-3.49</option>
                                    <option value="6">3.50-3.99</option>
                                    <option value="7">4.00-4.49</option>
                                    <option value="8">4.50-4.99</option>
                                    <option value="9">5.00-5.49</option>
                                    <option value="10">5.50-5.99</option>
                                    <option value="11">6.00-6.49</option>
                                    <option value="12">6.50-6.99</option>
                                    <option value="13">7.00-7.49</option>
                                    <option value="14">7.50-7.99</option>
                                    <option value="15">8.00-8.49</option>
                                    <option value="16">8.50-8.99</option>
                                    <option value="17">9.00-9.49</option>
                                    <option value="18">9.50-9.99</option>
                                </select>
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
                                    <option value="29">GD HV</option>
                                </select>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <ItemRow>Hot/Other</ItemRow>
                            <ItemRow keepDirHor={true}>
                                <ItemCol size={5}>
                                    <Button style={{width: '100%'}} onClick={props.switchHotMethod}>Hot</Button>
                                </ItemCol>
                                <ItemCol size={5}>
                                    <Button style={{width: '100%'}} onClick={props.switchOtherMethod}>Other</Button>
                                </ItemCol>
                            </ItemRow>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <ItemRow>Order</ItemRow>
                            <ItemRow>
                                <Button style={{width: '100%'}} onClick={props.switchClearMethod}>Clear Options</Button>
                                {/*<Button onClick={() => self.switchOrder(0)}>{txtNp.filter.btn.title[lang]} ▲/▼</Button>
                                <Button onClick={() => self.switchOrder(1)}>{txtNp.filter.btn.version[lang]} ▲/▼</Button>*/}
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Select Type</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Link
                                style={{width:"100%"}}
                                to={`/notplayed/gf/${props.userid}/0/1${window.location.search}`}>
                                <Button style={{width:"100%"}}>
                                    GF {txtNoRecord.all}
                                </Button>
                            </Link>
                            <Link
                                style={{width:"100%"}}
                                to={`/notplayed/dm/${props.userid}/0/1${window.location.search}`}>
                                <Button style={{width:"100%"}}>
                                    DM {txtNoRecord.all}
                                </Button>
                            </Link>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Link
                                style={{width:"100%"}}
                                to={`/notplayed/gf/${props.userid}/1/1${window.location.search}`}>
                                <Button style={{width:"100%"}}>
                                    GF {txtNoRecord.ver}
                                </Button>
                            </Link>
                            <Link
                                style={{width:"100%"}}
                                to={`/notplayed/dm/${props.userid}/1/1${window.location.search}`}>
                                <Button style={{width:"100%"}}>
                                    DM {txtNoRecord.ver}
                                </Button>
                            </Link>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </>
    )
}

export default NoRecordSelector