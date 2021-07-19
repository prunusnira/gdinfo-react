import React from 'react'
import TowerFloorItem from './towerFloorItem'
import { TowerStatData } from './towerStatData'
import { Button, ItemCol, ItemRow } from '../../../styled/styledCommon'
import TitleType from './data/titleType'

import txtTowerKo from '../../../lang/tower/txtTower-ko'
import txtTowerJp from '../../../lang/tower/txtTower-jp'
import txtTowerEn from '../../../lang/tower/txtTower-en'
import store from '../../../mobx/store'

interface Props {
    list: Array<TowerStatData>,
    id: string,
    setTitleToBeChanged: (t: TitleType) => void,
    setTitleChangeModal: (b: boolean) => void,
}

const TowerStatList = (props: Props) => {
	const lang = store.language.lang
    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn

	const divopen = (i: string) => {
		const div = document.getElementById(i+"c");

        if(div) {
            if(div.style.display === "none") {
                div.style.display = "block"
            }
            else {
                div.style.display = "none"
            }
        }
    }
    
    return (
        <>
        {
            props.list.map((tl, i) => {
                return (
                    <ItemRow key={`st${i}`} setVertical={true}>
                        <ItemRow keepDirHor={true}>
                            <ItemCol size={1} id={tl.btnid}
                                style={{fontSize:"125%"}}>
                                <a className='innerhref' style={{width:"100%", height:"auto"}}
                                    href='#no_div' id={tl.topid} onClick={() => divopen(tl.topid)}>
                                    {tl.opbtn}
                                </a>
                            </ItemCol>
                            <ItemCol size={6}>
                                <a className='innerhref' style={{width:"100%", height:"auto"}}
                                    href='#no_div' id={tl.topid} onClick={() => divopen(tl.topid)}>
                                    Floor {tl.floor}
                                </a>
                            </ItemCol>
                            <ItemCol size={1}>
                                <img alt="floorclear" style={{width:"50px"}} src={tl.floorclear} />
                            </ItemCol>
                            <ItemCol size={2}>
                                {tl.titlechangable}<br/>
                                {
                                    (function() {
                                        if(tl.btnchangable === true) {
                                            return (
                                                <Button onClick={() => {
                                                    props.setTitleToBeChanged(tl.titlechange)
                                                    props.setTitleChangeModal(true)
                                                }}>
                                                    {txtTower.detail.btntitlechange}
                                                </Button>
                                            )
                                        }
                                    })()
                                }
                            </ItemCol>
                        </ItemRow>
                        <ItemRow
                            style={{display:"none"}}
                            id={tl.floorid}
                            setVertical={true}>
                            <ItemRow>
                                <span style={{padding:"10px"}}>
                                    {tl.clearnotice}
                                </span>
                            </ItemRow>
                            <TowerFloorItem
                                list={tl.floorlist}
                                setTitleChangeModal={props.setTitleChangeModal}
                                setTitleToBeChanged={props.setTitleToBeChanged} />
                        </ItemRow>
                    </ItemRow>
                )
            })
        }
        </>
    )
}

export default TowerStatList