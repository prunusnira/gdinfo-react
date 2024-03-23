import { getPatternData } from '@/api/getMusicData';
import { IMusic } from '@/data/music/IMusic';
import { useEffect, useState } from 'react';

interface Props {
    mid: number,
    userid?: string
}

const usePatternInfo = ({ mid, userid }: Props) => {
    const [ptinfo, setPatternInfo] = useState(Array<IMusic>());

    const loadPatternInfo = () => {
        if (userid) {
            getPatternData(mid.toString(), userid).then((json) => {
                const music = JSON.parse(json.music);
                const list = Array<IMusic>();

                for (let i = 1; i <= 12; i += 1) {
                    const obj: IMusic = {
                        mid: 0,
                        ranklink: '',
                        diff: '',
                        lv: '',
                        cleartime: 0,
                        playtime: 0,
                        combo: 0,
                        score: 0,
                        rate: '',
                        skill: '',
                        rank: '',
                        fc: '',
                        clearmeter: '',
                        ratefu: '',
                        ratehv: '',
                        ratenx: '',
                        rateex: '',
                        ratemx: '',
                        ratetbre: '',
                        ratetb: '',
                    };
                    obj.ranklink = `/ptrank/${music.id}/${i}/1`;

                    let skill = null;
                    const skillParse = JSON.parse(json.skill);
                    switch (i) {
                        case 1:
                            obj.diff = 'BASIC';
                            obj.lv = (music.gbsc / 100).toFixed(2);
                            skill = skillParse.s1;
                            break;
                        case 2:
                            obj.diff = 'ADVANCED';
                            obj.lv = (music.gadv / 100).toFixed(2);
                            skill = skillParse.s2;
                            break;
                        case 3:
                            obj.diff = 'EXTREME';
                            obj.lv = (music.gext / 100).toFixed(2);
                            skill = skillParse.s3;
                            break;
                        case 4:
                            obj.diff = 'MASTER';
                            obj.lv = (music.gmas / 100).toFixed(2);
                            skill = skillParse.s4;
                            break;
                        case 5:
                            obj.diff = 'BASIC';
                            obj.lv = (music.bbsc / 100).toFixed(2);
                            skill = skillParse.s5;
                            break;
                        case 6:
                            obj.diff = 'ADVANCED';
                            obj.lv = (music.badv / 100).toFixed(2);
                            skill = skillParse.s6;
                            break;
                        case 7:
                            obj.diff = 'EXTREME';
                            obj.lv = (music.bext / 100).toFixed(2);
                            skill = skillParse.s7;
                            break;
                        case 8:
                            obj.diff = 'MASTER';
                            obj.lv = (music.bmas / 100).toFixed(2);
                            skill = skillParse.s8;
                            break;
                        case 9:
                            obj.diff = 'BASIC';
                            obj.lv = (music.dbsc / 100).toFixed(2);
                            skill = skillParse.s9;
                            break;
                        case 10:
                            obj.diff = 'ADVANCED';
                            obj.lv = (music.dadv / 100).toFixed(2);
                            skill = skillParse.s10;
                            break;
                        case 11:
                            obj.diff = 'EXTREME';
                            obj.lv = (music.dext / 100).toFixed(2);
                            skill = skillParse.s11;
                            break;
                        case 12:
                            obj.diff = 'MASTER';
                            obj.lv = (music.dmas / 100).toFixed(2);
                            skill = skillParse.s12;
                            break;
                        default:
                            break;
                    }

                    if (
                        obj.lv !== '0.00' &&
                        skill !== undefined &&
                        skill !== null
                    ) {
                        obj.cleartime = skill.cleartime;
                        obj.playtime = skill.playtime;
                        obj.combo = skill.combo;
                        obj.score = skill.score;
                        obj.rate = (skill.rate / 100).toFixed(2);
                        obj.skill = (
                            Math.floor((skill.rate * skill.level * 20) / 10000) /
                            100
                        ).toFixed(2);

                        switch (skill.rank) {
                            case 'E':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_e.png`;
                                break;
                            case 'D':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_d.png`;
                                break;
                            case 'C':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_c.png`;
                                break;
                            case 'B':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_b.png`;
                                break;
                            case 'A':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_a.png`;
                                break;
                            case 'S':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_s.png`;
                                break;
                            case 'SS':
                            case 'EXC':
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_ss.png`;
                                break;
                            default:
                                obj.rank =
                                    `${process.env.PUBLIC_URL}/general-img/rank/rank_e.png`;
                                break;
                        }

                        if (skill.checkfc === 'Y') {
                            if (skill.rank === 'EXC')
                                obj.fc =
                                    `<img alt={'excfc'} className='skillrank-img' src='${process.env.PUBLIC_URL}/general-img/rank/exc.png'>`;
                            else
                                obj.fc =
                                    `<img alt={'fc'} className='skillrank-img' src='${process.env.PUBLIC_URL}/general-img/rank/fc.png'>`;
                        } else {
                            if (skill.playtime > 0) {
                                obj.fc = '';
                            } else {
                                obj.fc = '';
                            }
                        }

                        obj.clearmeter = '';
                        const meter = skill.meter.split('');
                        for (let k = 0; k < meter.length; k += 1) {
                            if (meter[k] === '0')
                                obj.clearmeter +=
                                    '<div style=\'width:0.8vw; max-width:9px; background-color:#81BEF7; float:left\'>&nbsp;</div>';
                            else if (meter[k] === '1')
                                obj.clearmeter +=
                                    '<div style=\'width:0.8vw; max-width:9px; background-color:#F3F781; float:left\'>&nbsp;</div>';
                            else
                                obj.clearmeter +=
                                    '<div style=\'width:0.8vw; max-width:9px; background-color:#848484; float:left\'>&nbsp;</div>';
                        }

                        obj.ratefu = (skill.ratefu / 100).toFixed(2);
                        obj.ratehv = (skill.ratehv / 100).toFixed(2);
                        obj.ratenx = (skill.ratenx / 100).toFixed(2);
                        obj.rateex = (skill.rateex / 100).toFixed(2);
                        obj.ratemx = (skill.ratemx / 100).toFixed(2);
                        obj.ratetbre = (skill.ratetbre / 100).toFixed(2);
                        obj.ratetb = (skill.ratetb / 100).toFixed(2);

                        list.push(obj);
                    } else {
                        obj.mid = i;
                        obj.cleartime = 0;
                        obj.playtime = 0;
                        obj.combo = 0;
                        obj.score = 0;
                        obj.rate = '0.00';
                        obj.skill = '0.00';
                        obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_e.png`;
                        obj.fc = '';
                        obj.clearmeter = '';
                        obj.ratefu = '0.00';
                        obj.ratehv = '0.00';
                        obj.ratenx = '0.00';
                        obj.rateex = '0.00';
                        obj.ratemx = '0.00';
                        obj.ratetbre = '0.00';
                        obj.ratetb = '0.00';

                        list.push(obj);
                    }
                }

                setPatternInfo(list);
            });
        }
    };

    useEffect(() => {
        if (mid !== 0 && userid !== '') loadPatternInfo();
        else setPatternInfo([]);
    }, [mid, userid]);

    return { ptinfo };
};

export default usePatternInfo;
