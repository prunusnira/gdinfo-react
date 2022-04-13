import axios from "axios";
import CommonData from "@/module/common/commonData";

// 층의 클리어 상태 (프로필에서 접속)
export const getFloorClearStatus = async (id: string) => {
    const res = await axios.get(`${CommonData.dataUrl}profile/towerstatus/floor/${id}`);
    return res.data;
};

// 탑의 클리어 상태 (프로필에서 접속)
export const getTowerClearStatus = async (id: string) => {
    const res = await axios.get(`${CommonData.dataUrl}profile/towerstatus/tower/${id}`);
    return res.data;
};

// 탑 목록
export const getTowerList = async () => {
    const res = await axios.get(`${CommonData.dataUrl}towerlist`);
    return res.data;
};

// 탑 전체 상태
export const getTowerStatus = async (tower: string, id: string) => {
    const res = await axios.post(`${CommonData.dataUrl}towerdata/${tower}/${id}`);
    return res.data;
};
