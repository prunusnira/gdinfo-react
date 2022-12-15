import CommonData from "@/module/common/commonData";
import axios from "axios";

export const getNotice = async (page: number) => {
    const res = await axios.get(`${CommonData.dataUrl}notice/${page}`);
    return res.data;
};
