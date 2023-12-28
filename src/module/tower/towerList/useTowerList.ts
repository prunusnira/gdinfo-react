import { getTowerList } from '@/api/getTowerData';
import { ITowerList } from '@/data/tower/ITowerList';
import { atomLanguage } from '@/jotai/language';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

const useTowerList = () => {
    const [towerGF, setTowerGF] = useState(Array<ITowerList>());
    const [towerDM, setTowerDM] = useState(Array<ITowerList>());
    const [towerSP, setTowerSP] = useState(Array<ITowerList>());

    const lang = useAtomValue(atomLanguage);

    const loadTowerList = () => {
        getTowerList()
            .then((json) => {
                const towerlist = JSON.parse(json.towerlist);
                const towernum = towerlist.length;

                const towergf = new Array<ITowerList>();
                const towerdm = new Array<ITowerList>();
                const towersp = new Array<ITowerList>();

                for (let i = 0; i < towernum; i += 1) {
                    const obj: ITowerList = {
                        img: '',
                        link: '',
                    };
                    let l = 'ko';
                    if (lang === 'en') l = 'ko';
                    else if (lang === 'jp') l = 'jp';
                    obj.img = `${process.env.PUBLIC_URL}/general-img/tower/${towerlist[i]}_${l}.jpg`;
                    obj.link = `/tower/stat/${towerlist[i]}`;

                    if (towerlist[i].startsWith('towerGf')) {
                        towergf.push(obj);
                    } else if (towerlist[i].startsWith('towerDm')) {
                        towerdm.push(obj);
                    } else if (towerlist[i].startsWith('towerSp')) {
                        towersp.push(obj);
                    }
                }
                setTowerGF(towergf);
                setTowerDM(towerdm);
                setTowerSP(towersp);
            });
    };

    useEffect(() => {
        loadTowerList();
    }, []);

    return { towerGF, towerDM, towerSP };
};

export default useTowerList;