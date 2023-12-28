import { ILvDiff } from "@/data/ILvDiff";
import { useEffect, useState } from "react";
import { getLevelDiff } from "@/api/getLevelDiff";

const useLvDiff = (type?: string) => {
    const [list, setList] = useState(Array<ILvDiff>());

    const lvDiff = (type: string) => {
        getLevelDiff(type).then((data) => {
            const diffData = data.lvdiff as Array<ILvDiff>;
            setList(diffData);
        });
    };

    useEffect(() => {
        if(type) {
            lvDiff(type);
        }
    }, []);

    return { list };
};

export default useLvDiff;
