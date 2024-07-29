import { getPlayCount } from '@/api/getUserData';
import { IPlayCount } from '@/data/IPlayCount';
import CommonData from '@/module/common/commonData';
import { getPatternImg600 } from '@/module/common/pattern';
import { useEffect, useState } from 'react';

const usePlayCount = (id?: string) => {
    const [plist, setPList] = useState(Array<IPlayCount>());
    const [glist, setGList] = useState(Array<IPlayCount>());
    const [dlist, setDList] = useState(Array<IPlayCount>());
    const [mlist, setMList] = useState(Array<IPlayCount>());

    const createPlayCountList = () => {
        if (id) {
            getPlayCount(id).then((json) => {
                const mybestp = JSON.parse(json.mybestp);
                const mybestpg = JSON.parse(json.mybestpg);
                const mybestpd = JSON.parse(json.mybestpd);
                const mybestm = JSON.parse(json.mybestm);

                const tmpPlist = [];
                const tmpGlist = [];
                const tmpDlist = [];
                const tmpMlist = [];

                for (let i = 0; i < mybestp.length; i += 1) {
                    const mypdata: IPlayCount = {
                        key: `p${i}`,
                        number: i + 1,
                        jacket: `${CommonData.jacketUrl}${mybestp[i].id}.jpg`,
                        name: mybestp[i].name,
                        pattern: '',
                        count: mybestp[i].playtime,
                    };
                    mypdata.pattern = getPatternImg600(mybestp[i].patterncode);
                    tmpPlist.push(mypdata);
                }

                for (let i = 0; i < mybestpg.length; i += 1) {
                    const mygdata: IPlayCount = {
                        key: `g${i}`,
                        number: i + 1,
                        jacket: `${CommonData.jacketUrl}${mybestpg[i].id}.jpg`,
                        name: mybestpg[i].name,
                        pattern: '',
                        count: mybestpg[i].playtime,
                    };
                    mygdata.pattern = getPatternImg600(mybestpg[i].patterncode);
                    tmpGlist.push(mygdata);
                }

                for (let i = 0; i < mybestpd.length; i += 1) {
                    const myddata: IPlayCount = {
                        key: `d${i}`,
                        number: i + 1,
                        jacket: `${CommonData.jacketUrl}${mybestpd[i].id}.jpg`,
                        name: mybestpd[i].name,
                        pattern: '',
                        count: mybestpd[i].playtime,
                    };
                    myddata.pattern = getPatternImg600(mybestpd[i].patterncode);
                    tmpDlist.push(myddata);
                }

                for (let i = 0; i < mybestm.length; i += 1) {
                    const mymdata: IPlayCount = {
                        key: `m${i}`,
                        number: i + 1,
                        jacket: `${CommonData.jacketUrl}${mybestm[i].id}.jpg`,
                        name: mybestm[i].name,
                        pattern: '',
                        count: mybestm[i].playtime,
                    };
                    tmpMlist.push(mymdata);
                }

                setPList(tmpPlist);
                setGList(tmpGlist);
                setDList(tmpDlist);
                setMList(tmpMlist);
            });
        }
    };

    useEffect(() => {
        createPlayCountList();
    }, []);

    return { plist, glist, dlist, mlist };
};

export default usePlayCount;
