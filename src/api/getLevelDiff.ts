import { ILvDiffIO } from '@/data/etc/ILvDiff';
import CommonData from "@/module/common/commonData";
import axios from "axios";

export const getLevelDiff = async (type: string) => {
    const res = await axios.get<ILvDiffIO>(
        `${CommonData.dataUrl}lvdiff/${type}`,
    );
    return res.data;
};
