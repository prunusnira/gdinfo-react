import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CommonData from '../../common/commonData';
import { useParams } from 'react-router-dom';
import store from '../../../mobx/store';
import SnapshotListPresenter from './snapshotListPresenter';

interface MatchProps {
    id: string
}

const SnapshotList = () => {
    const [glist, setGList] = useState(Array<string>())
    const [dlist, setDList] = useState(Array<string>())
    const [gempty, setGEmpty] = useState(true)
    const [dempty, setDEmpty] = useState(true)

    const {id} = useParams<MatchProps>()

    const lang = store.language.lang
    
    useEffect(() => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/list/${id}`)
        .then((res) => {
            const json = res.data
            const list = JSON.parse(json.list)

            const gflist = []
            const dmlist = []
            let gempty = true
            let dempty = true

            // '.'과 '_'으로 split
            for(let i = 0; i < list.length; i++) {
                const c = list[i].split('.')[0].split('_')
                if(c[1] === "gf") gflist.push(c[0])
                else if(c[1] === "dm") dmlist.push(c[0])
            }

            gflist.sort(function(a, b) {
                if(a > b) return 1
                else if(b > a) return -1
                else return 0
            });

            dmlist.sort(function(a, b) {
                if(a > b) return 1
                else if(b > a) return -1
                else return 0
            });

            if(gflist.length > 0) {
                gempty = false
            }

            if(dmlist.length > 0) {
                dempty = false
            }

            setGList(gflist)
            setDList(dmlist)
            setGEmpty(gempty)
            setDEmpty(dempty)
        })
    }, [])

    return (
        <SnapshotListPresenter
            lang={lang}
            gempty={gempty}
            dempty={dempty}
            id={id}
            glist={glist}
            dlist={dlist} />
    )
}

export default SnapshotList