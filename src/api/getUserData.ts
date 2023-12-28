import { axiosNonLogin } from '@/lib/axiosInstance';
import CommonData from '@/module/common/commonData';

// 유저 1명의 데이터 (id)
export const getUserFromId = async (userid: string) => {
    const res = await axiosNonLogin.get(`${CommonData.dataUrl}getuserid/${userid}`);
    return res.data;
};

// 유저 1명의 데이터 (token)
export const getUserFromToken = async (token: string) => {
    const { data } = await axiosNonLogin.get(`${CommonData.dataUrl}getuser/${token}`);
    return data;
};

// 최근 갱신 유저
export const getRecentUser = async () => {
    const { data } = await axiosNonLogin.get(`${CommonData.dataUrl}recent`);
    return data;
};

// 클리어 테이블
export const getClearTable = async (userid: string, type: string) => {
    const res = await axiosNonLogin.get(`${CommonData.dataUrl}cleartable/${type}/${userid}`);
    return res.data;
};

// 곡별 플레이카운트
export const getPlayCount = async (id: string) => {
    const res = await axiosNonLogin.get(`${CommonData.dataUrl}mybest/${id}`);
    return res.data;
};

// 스냅샷 목록
export const getSnapshotList = async (id: string) => {
    const res = await axiosNonLogin.get(`${CommonData.dataUrl}skill/snapshot/list/${id}`);
    return res.data;
};

export const getGraph = async (id: string) => {
    const res = await axiosNonLogin.post(`${CommonData.dataUrl}skillrecord/${id}`);
    return res.data;
};
