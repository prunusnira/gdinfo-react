import React from 'react'
import { Button, ItemCol, ItemRow } from '@/styled/styledCommon'
import TitleType from './data/titleType'
import { FloorItemData } from './towerStatData'

import txtTowerKo from '@/lang/tower/txtTower-ko'
import txtTowerJp from '@/lang/tower/txtTower-jp'
import txtTowerEn from '@/lang/tower/txtTower-en'
import store from '@/mobx/store'

interface Props {
    list: Array<FloorItemData>,
    setTitleToBeChanged: (t: TitleType) => void,
    setTitleChangeModal: (b: boolean) => void,
}

const TowerFloorItem = (props: Props) => {
	const lang = store.language.lang
    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn

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
                                        FC <span>{
                                            (function() {
                                                if(fl.fc) {
                                                    return <span style={{color:"red"}}>FC</span>
                                                }
                                                else {
                                                    return <span style={{color:"blue"}}>Non-FC</span>
                                                }
                                            })()
                                        }</span> / {fl.condFc ? "FC" : "Non-FC"}
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
                            {
                                (function() {
                                    if(fl.title !== null) {
                                        return (
                                            <Button onClick={() => {
                                                props.setTitleToBeChanged(fl.title!)
                                                props.setTitleChangeModal(true)
                                            }}>
                                                {txtTower.detail.btntitlechange}
                                            </Button>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })()
                            }
                        </ItemCol>
                    </ItemRow>
                )
            })
        }
        </>
    )
}

export default TowerFloorItem