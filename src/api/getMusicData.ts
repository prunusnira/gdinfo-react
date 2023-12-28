import axios from 'axios';
import CommonData from '@/module/common/commonData';

export const getMusicData = async (mid: string) => {
    const res = await axios.get(`${CommonData.dataUrl}getmusic/${mid}`);
    return res.data;
};

// 패턴 하나의 기록 데이터
export const getPatternData = async (mid: string, userid: string) => {
    const res = await axios.get(`${CommonData.dataUrl}music/${mid}/${userid}`);
    return res.data;
};

export const getNoRecordData = async (
    gtype: string,
    userid: string,
    vertype: string,
    page: string,
    search: string,
) => {
    const res = await axios.get(
        `${CommonData.dataUrl}notplayed/${gtype}/${userid}/${vertype}/${page}${search}`,
    );
    return res.data;
};

// 패턴 목록
export const getPatternList = async (ver: string, order: string, page: string, search: string) => {
    const res = await axios.get(`${CommonData.dataUrl}pattern/${ver}/${order}/${page}${search}`);
    return res.data;
};

// 패턴 랭크
export const getPatternRank = async (
    mid: string,
    ptcode: string,
    page: string,
    verparam: string,
) => {
    const res = await axios.post(
        `${CommonData.dataUrl}ptrank/${mid}/${ptcode}/${page}/${verparam}`,
    );
    return res.data;
};
