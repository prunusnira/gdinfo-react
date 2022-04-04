import axios from "axios";
import CommonData from "@/module/common/commonData";

export const getSearchResult = async (type: string, value: string, page: string) => {
    const res = await axios.post(`${CommonData.dataUrl}search/${type}/${value}/${page}`);
    return res.data;
};
