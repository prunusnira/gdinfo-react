import CommonData from "@/module/common/commonData";
import axios from "axios";

export const getLevelDiff = async (type: string) => {
    const res = await axios.get(`${CommonData.dataUrl}lvdiff/${type}`);
    return res.data;
};
