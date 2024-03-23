import { getSkillTable } from '@/api/getSkillData';
import { IMusicFetch } from '@/data/music/IMusicFetch';
import { ISkillItem } from '@/data/skill/ISkillItem';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { generateSkillItem, generateURL, getRate } from './skillMethods';

const useSkillTableData = () => {
    const {
        order,
        ptype,
        userid,
        gtype,
        page,
    } = useParams<{order: string, ptype: string, userid: string, gtype: string, page: string}>();

    const [skillSum1, setSkillSum1] = useState(0);
    const [skillSum2, setSkillSum2] = useState(0);
    const [skillTable1, setSkillTable1] = useState(Array<ISkillItem>());
    const [skillTable2, setSkillTable2] = useState(Array<ISkillItem>());
    const [allpage, setAllPage] = useState(0);
    const [updateTime, setUpdateTime] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const getSkillData = async () => {
        if (order && ptype && userid && gtype && page) {
            return getSkillTable(generateURL(order, ptype, userid, gtype, page));
        }
        return undefined;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['skill', order, ptype, userid, gtype, page, searchParams],
        queryFn: getSkillData,
    });

    useEffect(() => {
        if (data && order && ptype && userid && gtype && page) {
            let sum1 = 0;
            let sum2 = 0;
            const skillList1: ISkillItem[] = [];
            const skillList2: ISkillItem[] = [];

            const skill = JSON.parse(data.skill) as IMusicFetch[];
            if (skill.length > 0) {
                for (let i = 0; i < skill.length; i += 1) {
                    const cur = skill[i];
                    const obj = generateSkillItem(cur, i, ptype, page, userid);
                    sum1 += Math.floor(getRate(parseInt(ptype, 10), cur) * cur.level * 20 / 10000);
                    skillList1.push(obj);
                }
            }

            const hskill = JSON.parse(data.hskill) as IMusicFetch[];
            if (hskill.length > 0) {
                for (let i = 0; i < hskill.length; i += 1) {
                    const cur = hskill[i];
                    const obj = generateSkillItem(cur, i, ptype, page, userid);
                    sum1 += Math.floor(getRate(parseInt(ptype, 10), cur) * cur.level * 20 / 10000);
                    skillList1.push(obj);
                }
            }

            const oskill = JSON.parse(data.oskill) as IMusicFetch[];
            if (oskill.length > 0) {
                for (let i = 0; i < oskill.length; i += 1) {
                    const cur = oskill[i];
                    const obj = generateSkillItem(cur, i, ptype, page, userid);
                    sum2 += Math.floor(getRate(parseInt(ptype, 10), cur) * cur.level * 20 / 10000);
                    skillList2.push(obj);
                }
            }

            const user = JSON.parse(data.user);
            const updtime = new Date(user.updatetime);
            const time = `${updtime.getFullYear()}/${updtime.getMonth() + 1}/${updtime.getDate()} ${updtime.getHours()}:${updtime.getMinutes()}`;

            setSkillTable1(skillList1);
            setSkillTable2(skillList2);
            setUpdateTime(time);
            setAllPage(Number(data.pages));
            setSkillSum1(sum1);
            setSkillSum2(sum2);
        }
    }, [data]);

    return {
        skillTable1, skillTable2,
        skillSum1, skillSum2,
        allpage, updateTime,
        isLoading, isError,
    };
};

export default useSkillTableData;