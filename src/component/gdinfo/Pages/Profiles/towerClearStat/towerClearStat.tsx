import React, { useEffect, useState } from 'react';
import axios from 'axios';
import txtTowerStat from './txttowerstat';
import {titlesp} from '../../Tower/titletxt';
import TowerStatTable from './towerStatTable';
import TitleStatTable from './titleStatTable';
import {TowerClearData, TowerFloorData, FloorClearData} from './towerClearData';
import {towerName} from '../../Tower/towername';

import CommonData from '../../Common/commonData';
import { useParams } from 'react-router-dom';
import { BodyContent, BodyHeader, Button, Container, ItemRow } from '../../../../../styled/styledCommon';
import { observer } from 'mobx-react';
import store from '../../../../../mobx/store';

interface MatchProps {
    id: string
}

interface State {
    towerlist: Array<TowerClearData>,
    titlelist: Array<FloorClearData>
}

const TowerClearStat = observer(() => {
    const [towerList, setTowerList] = useState(Array<TowerClearData>())
    const [titleList, setTitleList] = useState(Array<FloorClearData>())

    const {id} = useParams<MatchProps>()

    const lang = store.language.lang

    useEffect(() => {
        loadTowerClearData()
        loadFloorClearData()
    }, [])

    const loadTowerClearData = () => {
        axios.post(`${CommonData.dataUrl}profile/towerstatus/tower/${id}`)
        .then((res) => {
            const json = res.data;
            const list = JSON.parse(json.list);
            const tower = JSON.parse(json.tower);
            const towerlist = new Array<TowerClearData>();

            for(let i = 0; i < list.length; i++) {
                const obj = new TowerClearData();
                obj.tower = (towerName as any)[list[i]][lang];
                // Eval을 사용한 트릭
                obj.floors = new Array<TowerFloorData>();
                
                for(let j = 0; j < tower.length; j++) {
                    if(list[i] === tower[j].tower) {
                        const floor = (tower[j].floor+1)+(txtTowerStat.floor as any)[lang];
                        let clear = "";
                        if(tower[j].clear === "Y") clear = "Cleared";
                        else clear = "Not cleared";
                        obj.floors.push({floor:floor, clear: clear});
                    }
                }
                if(obj.cont === "") obj.cont = (txtTowerStat.nodata as any)[lang];
                towerlist.push(obj);
            }

            setTowerList(towerlist)
        });
    }

    const loadFloorClearData = () => {
        axios.post(`${CommonData.dataUrl}profile/towerstatus/floor/${id}`)
        .then((res) => {
            const json = res.data;
            const floor = JSON.parse(json.floor);
            const titlelist = [];

            for(let i = 0; i < floor.length; i++) {
                const t = (titlesp as any)[floor[i].mid];
                if(t != null) {
                    if(t.type === 0 && t[floor[i].ptcode] != null) {
                        const obj = new FloorClearData();
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                        obj.name = t[floor[i].ptcode][lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 1) {
                        const obj = new FloorClearData();
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj.name = t[lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 2) {
                        if(t[floor[i].ptcode] != null) {
                            const obj = new FloorClearData();
                            obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                            obj.name = t[floor[i].ptcode][lang];
                            titlelist.push(obj);
                        }
                        const obj2 = new FloorClearData();
                        obj2.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj2.name = t[lang];
                        titlelist.push(obj2);
                    }
                }
            }

            setTitleList(titlelist)
        });
    }

    return (
        <Container>
            <ItemRow>
                <h3>Tower clear status</h3>
            </ItemRow>
            <ItemRow id='top'>
                <a href='#titlesection'>
                    <Button>
                        {(txtTowerStat.btntitle as any)[lang]}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow>
                <BodyHeader>
                    <h4>{(txtTowerStat.towerhead as any)[lang]}</h4>
                </BodyHeader>
                <BodyContent>
                    <TowerStatTable list={towerList} />
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {(txtTowerStat.btntop as any)[lang]}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow id='titlesection'>
                <BodyHeader>
                    <h4>{(txtTowerStat.titlehead as any)[lang]}</h4>
                </BodyHeader>
                <BodyContent id='titlelist'>
                    <ItemRow>
                        {(txtTowerStat.duplicate as any)[lang]}
                    </ItemRow>
                    <ItemRow>
                        <TitleStatTable list={titleList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {(txtTowerStat.btntop as any)[lang]}
                    </Button>
                </a>
            </ItemRow>
        </Container>
    )
})

export default TowerClearStat;