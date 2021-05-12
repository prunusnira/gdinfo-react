import React from 'react';
import { ItemCol, ItemRow } from '../../../styled/styledCommon';
import { FloorItemData } from './towerStatData';

interface Props {
    list: Array<FloorItemData>
}

const TowerFloorItem = (props: Props) => {
    return (
        <>
        {
            props.list.map((fl, i) => {
                return (
                    <ItemRow key={`fl${i}`} keepDirHor={true}>
                        <ItemCol size={1} className="listimg-skill">
                            <img alt="jacket-img" src={fl.jacket} />
                        </ItemCol>
                        <ItemCol size={7}>
                            <ItemRow keepDirHor={true}>
                                <ItemCol size={7} className="text-center">
                                    <span style={{fontSize:"125%"}}>
                                        {fl.name}
                                    </span><br/>
                                    {fl.pattern} / {fl.lv}
                                </ItemCol>
                                <ItemCol size={3}>
                                    <span className='tower-div-span'>
                                        Score <span>{
                                            (function() {
                                                if(fl.score > fl.condScore) {
                                                    return <span style={{color:"red"}}>{fl.score}</span>
                                                }
                                                else if(fl.score < fl.condScore) {
                                                    return <span style={{color:"blue"}}>{fl.score}</span>
                                                }
                                                else {
                                                    return <span>{fl.score}</span>
                                                }
                                            })()
                                        }</span> / {fl.condScore}<br/>
                                        Rate <span>{
                                            (function() {
                                                if(fl.rate > fl.condRate) {
                                                    return <span style={{color:"red"}}>{fl.rate}</span>
                                                }
                                                else if(fl.rate < fl.condRate) {
                                                    return <span style={{color:"blue"}}>{fl.rate}</span>
                                                }
                                                else {
                                                    return <span>{fl.rate}</span>
                                                }
                                            })()
                                        }</span>% / {fl.condRate}%<br/>
                                        Combo <span>{
                                            (function() {
                                                if(fl.combo > fl.condCombo) {
                                                    return <span style={{color:"red"}}>{fl.combo}</span>
                                                }
                                                else if(fl.combo < fl.condCombo) {
                                                    return <span style={{color:"blue"}}>{fl.combo}</span>
                                                }
                                                else {
                                                    return <span>{fl.combo}</span>
                                                }
                                            })()
                                        }</span> / {fl.condCombo}
                                    </span>
                                </ItemCol>
                            </ItemRow>
                            <ItemRow
                                style={{paddingBottom:"10px"}}
                                id='description'
                                keepDirHor={true}>
                                <ItemCol size={3} className="text-right">
                                    <img alt="towerbottom" src={process.env.PUBLIC_URL+"/general-img/tower/rightbottom.png"} />
                                </ItemCol>
                                <ItemCol size={7} className="text-left">
                                    <span dangerouslySetInnerHTML={{__html: fl.description}}></span>
                                </ItemCol>
                            </ItemRow>
                        </ItemCol>
                        <ItemCol size={2}>
                            <img alt="towerclear" style={{width:"50px"}} src={fl.clear} /><br/>
                            <span dangerouslySetInnerHTML={{__html: fl.titlechange}}></span>
                        </ItemCol>
                    </ItemRow>
                )
            })
        }
        </>
    )
}

export default TowerFloorItem;