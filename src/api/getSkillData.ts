import { ISkillTable } from '@/data/skill/ISkillTable';
import axios from "axios";
import CommonData from "@/module/common/commonData";

export const getPlayCountRank = async (page: string) => {
    const res = await axios.get(`${CommonData.dataUrl}cntrank/${page}`);
    return res.data;
};

export const getSkillRank = async (gtype: string, page: string) => {
    const res = await axios.get(`${CommonData.dataUrl}rank/${gtype}/${page}`);
    return res.data;
};

export const getSkillTable = async (url: string) => {
    const res = await axios.get<ISkillTable>(`${CommonData.dataUrl}${url}`);
    return res.data;
};
