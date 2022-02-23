import { useEffect, useState } from "react";
import { getPlayCount } from "@/api/getUserData";
import CommonData from "@/component/common/commonData";
import { getPatternImg600 } from "@/component/common/pattern";
import PlaycountData from "./playcountData";

const usePlayCount = (id: string) => {
    const [plist, setPList] = useState(Array<PlaycountData>());
    const [glist, setGList] = useState(Array<PlaycountData>());
    const [dlist, setDList] = useState(Array<PlaycountData>());
    const [mlist, setMList] = useState(Array<PlaycountData>());

    useEffect(() => {
        createPlayCountList();
    }, []);

    const createPlayCountList = () => {
        getPlayCount(id).then((json) => {
            const mybestp = JSON.parse(json.mybestp);
            const mybestpg = JSON.parse(json.mybestpg);
            const mybestpd = JSON.parse(json.mybestpd);
            const mybestm = JSON.parse(json.mybestm);

            const plist = [];
            const glist = [];
            const dlist = [];
            const mlist = [];

            for (let i = 0; i < mybestp.length; i++) {
                const mypdata: PlaycountData = {
                    key: `p${i}`,
                    number: i + 1,
                    jacket: `${CommonData.jacketUrl}${mybestp[i].id}.jpg`,
                    name: mybestp[i].name,
                    pattern: "",
                    count: mybestp[i].playtime,
                };
                mypdata.pattern = getPatternImg600(mybestp[i].patterncode);
                plist.push(mypdata);
            }

            for (let i = 0; i < mybestpg.length; i++) {
                const mygdata: PlaycountData = {
                    key: `g${i}`,
                    number: i + 1,
                    jacket: `${CommonData.jacketUrl}${mybestpg[i].id}.jpg`,
                    name: mybestpg[i].name,
                    pattern: "",
                    count: mybestpg[i].playtime,
                };
                mygdata.pattern = getPatternImg600(mybestpg[i].patterncode);
                glist.push(mygdata);
            }

            for (let i = 0; i < mybestpd.length; i++) {
                const myddata: PlaycountData = {
                    key: `d${i}`,
                    number: i + 1,
                    jacket: `${CommonData.jacketUrl}${mybestpd[i].id}.jpg`,
                    name: mybestpd[i].name,
                    pattern: "",
                    count: mybestpd[i].playtime,
                };
                myddata.pattern = getPatternImg600(mybestpd[i].patterncode);
                dlist.push(myddata);
            }

            for (let i = 0; i < mybestm.length; i++) {
                const mymdata: PlaycountData = {
                    key: `m${i}`,
                    number: i + 1,
                    jacket: `${CommonData.jacketUrl}${mybestm[i].id}.jpg`,
                    name: mybestm[i].name,
                    pattern: "",
                    count: mybestm[i].playtime,
                };
                mlist.push(mymdata);
            }

            setPList(plist);
            setGList(glist);
            setDList(dlist);
            setMList(mlist);
        });
    };

    return { plist, glist, dlist, mlist };
};

export default usePlayCount;
