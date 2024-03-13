import { getPatternRank } from '@/api/getMusicData';
import { IPatternRank } from '@/data/IPatternRank';
import { atomLanguage } from '@/jotai/language';
import TxtCommonEn from '@/lang/common/txtCommon-en';
import TxtCommonJp from '@/lang/common/txtCommon-jp';
import TxtCommonKo from '@/lang/common/txtCommon-ko';
import CommonData from '@/module/common/commonData';
import { skillTableColor } from '@/module/common/skillcolor';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    mid?: string,
    ptcode?: string,
    page?: string,
    urlparams: URLSearchParams,
    isLoaded: boolean,
    setLoaded: (b: boolean) => void
}

const usePTRankData = ({ mid, ptcode, page, urlparams, isLoaded, setLoaded }: Props) => {
    const [list, setList] = useState(Array<IPatternRank>());
    const [allPage, setAllPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const lang = useAtomValue(atomLanguage);
    const TxtCommon = lang === 'ko' ? TxtCommonKo : lang === 'jp' ? TxtCommonJp : TxtCommonEn;

    const loadRankData = () => {
        if (mid && ptcode && page) {
            const verparam =
                urlparams.get('ver') === null
                    ? CommonData.currentVersion.toString()
                    : urlparams.get('ver')!;
            getPatternRank(mid, ptcode, page, verparam).then((json) => {
                const music = JSON.parse(json.music);
                const list = JSON.parse(json.list);
                const users = JSON.parse(json.users);

                let lv;
                let userskill = 0;
                switch (parseInt(ptcode, 10)) {
                    case 1:
                        lv = music.gbsc;
                        break;
                    case 2:
                        lv = music.gadv;
                        break;
                    case 3:
                        lv = music.gext;
                        break;
                    case 4:
                        lv = music.gmas;
                        break;
                    case 5:
                        lv = music.bbsc;
                        break;
                    case 6:
                        lv = music.badv;
                        break;
                    case 7:
                        lv = music.bext;
                        break;
                    case 8:
                        lv = music.bmas;
                        break;
                    case 9:
                        lv = music.dbsc;
                        break;
                    case 10:
                        lv = music.dadv;
                        break;
                    case 11:
                        lv = music.dext;
                        break;
                    case 12:
                        lv = music.dmas;
                        break;
                    default:
                        lv = 0;
                }

                const ranklist = new Array<IPatternRank>();
                for (let i = 0; i < list.length; i += 1) {
                    const cur = list[i];
                    const user = users[i];
                    const obj: IPatternRank = {
                        rate: 0,
                        skill: '',
                        ratecolor: {},
                        skillcolor: {},
                        index: 0,
                        towertitle: '',
                        profile: '',
                        name: '',
                        rank: '',
                        fc: false,
                        exc: false,
                    };

                    const rate = cur.rate;
                    obj.rate = rate / 100;
                    const skill = (obj.rate * lv * 20) / 10000;
                    obj.skill = skill.toFixed(2);
                    const tableColor = skillTableColor(skill * 100);
                    if (tableColor.startsWith('#')) {
                        obj.ratecolor = { width: '10px', backgroundColor: tableColor };
                    } else {
                        obj.ratecolor = { width: '10px', background: tableColor };
                    }

                    if (parseInt(ptcode, 10) < 9) {
                        switch (urlparams.get('ver')) {
                            case '24':
                                userskill = user.gskilltb;
                                break;
                            case '25':
                                userskill = user.gskilltbre;
                                break;
                            case '26':
                                userskill = user.gskillmx;
                                break;
                            case '27':
                                userskill = user.gskillex;
                                break;
                            case '28':
                                userskill = user.gskillnx;
                                break;
                            case '29':
                                userskill = user.gskillhv;
                                break;
                            case '30':
                                userskill = user.gskillfu;
                                break;
                            case '31':
                            default:
                                userskill = user.gskill;
                                break;
                        }
                    } else {
                        switch (urlparams.get('ver')) {
                            case '24':
                                userskill = user.dskilltb;
                                break;
                            case '25':
                                userskill = user.dskilltbre;
                                break;
                            case '26':
                                userskill = user.dskillmx;
                                break;
                            case '27':
                                userskill = user.dskillex;
                                break;
                            case '28':
                                userskill = user.dskillnx;
                                break;
                            case '29':
                                userskill = user.dskillhv;
                                break;
                            case '30':
                                userskill = user.dskillfu;
                                break;
                            case '31':
                            default:
                                userskill = user.dskill;
                                break;
                        }
                    }

                    const tableColor2 = skillTableColor(userskill * 2);
                    if (tableColor2.startsWith('#')) {
                        obj.skillcolor = { width: '10px', backgroundColor: tableColor2 };
                    } else {
                        obj.skillcolor = { width: '10px', background: tableColor2 };
                    }

                    obj.index = (parseInt(page, 10) - 1) * 30 + i + 1;

                    if (user.titletower !== '') {
                        obj.towertitle = user.titletower;
                    } else {
                        obj.towertitle = '';
                    }

                    obj.profile = `/music/${mid}/${cur.userid}`;
                    obj.name = cur.name;

                    if (user.opencount === 'N') {
                        obj.towertitle = '';
                        obj.profile = `#none`;
                        obj.name = TxtCommon.emptyname;
                    }

                    switch (cur.rank) {
                        case 'D':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_d.png`;
                            break;
                        case 'C':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_c.png`;
                            break;
                        case 'B':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_b.png`;
                            break;
                        case 'A':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_a.png`;
                            break;
                        case 'S':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_s.png`;
                            break;
                        case 'SS':
                        case 'EXC':
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_ss.png`;
                            break;
                        case 'E':
                        default:
                            obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_e.png`;
                            break;
                    }

                    if (cur.checkfc === 'Y') {
                        obj.fc = true;
                    }

                    if (cur.rank === 'EXC') {
                        obj.exc = true;
                    }

                    ranklist.push(obj);
                }

                setList(ranklist);
                setAllPage(json.pages);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        loadRankData();
    }, [urlparams.get('ver'), page]);

    useEffect(() => {
        if (isLoaded) {
            loadRankData();
            setLoaded(false);
        }
    }, [isLoaded]);

    return { list, allPage, isLoading };
};

export default usePTRankData;
