import { LvDiffData } from "./lvdiff.data";
import React, { useEffect, useState } from "react";
import { getLevelDiff } from "@/api/getLevelDiff";

const useLvDiff = (type: string) => {
    const [list, setList] = useState(Array<LvDiffData>());

    useEffect(() => {
        lvDiff(type);
    }, []);

    const lvDiff = (type: string) => {
        getLevelDiff(type).then((data) => {
            const diffData = data.lvdiff as Array<LvDiffData>;
            setList(diffData);
        });
    };

    return { list };
};

export default useLvDiff;
