import axios from "axios";
import CommonData from "@/module/common/commonData";

export const setTowerTitle = async (id: string, value: string) => {
    const res = await axios.post(`${CommonData.dataUrl}towertitleapply/${id}/${value}`);
    return res.statusText;
};
