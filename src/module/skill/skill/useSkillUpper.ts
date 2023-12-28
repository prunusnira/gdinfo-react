import { IProfile } from '@/data/IProfile';
import { atomLanguage } from '@/jotai/language';
import txtSkillEn from '@/lang/skill/skill/txtSkill-en';
import txtSkillJp from '@/lang/skill/skill/txtSkill-jp';
import txtSkillKo from '@/lang/skill/skill/txtSkill-ko';
import * as time from '@/module/common/time';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    user?: IProfile,
    skillSum1?: number,
    skillSum2?: number,
    order?: string,
    ptype?: string,
    gtype?: string
}

const useSkillTableUpper = ({
                                user,
                                skillSum1,
                                skillSum2,
                                order,
                                ptype,
                                gtype,
                            }: Props) => {
    const [statLeftTitle, setStatLeftTitle] = useState('');
    const [statLeft, setStatLeft] = useState('');
    const [statMidTitle, setStatMidTitle] = useState('');
    const [statMid, setStatMid] = useState('');
    const [statRightTitle, setStatRightTitle] = useState('');
    const [statRight, setStatRight] = useState('');

    const [queryLv, setQueryLv] = useState('');
    const [queryRank, setQueryRank] = useState('');
    const [queryVer, setQueryVer] = useState('');
    const [queryHot, setQueryHot] = useState('');

    const [tableTxtGType, setTableTxtGType] = useState('');
    const [tableTxtDesc, setTableTxtDesc] = useState('');

    const lang = useAtomValue(atomLanguage);

    const txtSkill =
        lang === 'ko' ? txtSkillKo : lang === 'jp' ? txtSkillJp : txtSkillEn;

    // 스킬표 타이틀 글자 설정
    const setTitleText = () => {
        if (ptype) {
            if (gtype === 'gf') setTableTxtGType('GuitarFreaks');
            else if (gtype === 'dm') setTableTxtGType('DrumMania');

            if (parseInt(ptype, 10) === 1000) setTableTxtDesc(txtSkill.exc);
            else setTableTxtDesc('Skill by ');
        }
    };

    // 스킬표 상단 테이블의 글자 데이터
    const setUpperTableText = () => {
        if (user && ptype && ptype && gtype && skillSum1 && skillSum2) {
            if (gtype === 'gf') {
                setStatLeftTitle('GF Skill');
                setStatLeft(user.gskill.toFixed(2));
            } else if (gtype === 'dm') {
                setStatLeftTitle('DM Skill');
                setStatLeft(user.dskill.toFixed(2));
            }
            setStatRightTitle('Updated at');
            setStatRight(time.unixTimeConverter(parseInt(user.updatetime, 10)));

            switch (parseInt(ptype, 10)) {
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                case 13:
                    setStatMidTitle('');
                    setStatMid('');
                    break;
                case 2:
                case 4:
                case 6:
                case 8:
                case 10:
                case 12:
                case 14:
                case 1000:
                    setStatMidTitle('Hot');
                    setStatMid((skillSum1 / 100).toFixed(2));
                    setStatRightTitle('Other');
                    setStatRight((skillSum2 / 100).toFixed(2));
                    break;
                default:
                    break;
            }
            switch (parseInt(ptype, 10)) {
                case 0:
                    setStatMidTitle('Order');
                    switch (order) {
                        case 'skillasc':
                            setStatMid(txtSkill.order.skillasc);
                            break;
                        case 'skilldesc':
                            setStatMid(txtSkill.order.skilldesc);
                            break;
                        case 'titleasc':
                            setStatMid(txtSkill.order.titleasc);
                            break;
                        case 'titledesc':
                            setStatMid(txtSkill.order.titledesc);
                            break;
                        case 'verasc':
                            setStatMid(txtSkill.order.verasc);
                            break;
                        case 'verdesc':
                            setStatMid(txtSkill.order.verdesc);
                            break;
                        case 'rateasc':
                            setStatMid(txtSkill.order.rateasc);
                            break;
                        case 'ratedesc':
                            setStatMid(txtSkill.order.ratedesc);
                            break;
                        case 'playtime':
                            setStatMid(txtSkill.order.playdesc);
                            break;
                        default:
                            break;
                    }
                    break;
                case 1:
                    if (queryHot === 'h') {
                        setStatMidTitle('Hot');
                    } else if (queryHot === 'o') {
                        setStatMidTitle('Other');
                    }
                    break;
                case 3:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskilltb.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskilltb.toFixed(2));
                    }
                    break;
                case 5:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskilltbre.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskilltbre.toFixed(2));
                    }
                    break;
                case 7:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillmx.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillmx.toFixed(2));
                    }
                    break;
                case 9:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillex.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillex.toFixed(2));
                    }
                    break;
                case 11:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillnx.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillnx.toFixed(2));
                    }
                    break;
                case 13:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillhv.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillhv.toFixed(2));
                    }
                    break;
                case 4:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskilltb.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskilltb.toFixed(2));
                    }
                    break;
                case 6:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskilltbre.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskilltbre.toFixed(2));
                    }
                    break;
                case 8:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillmx.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillmx.toFixed(2));
                    }
                    break;
                case 10:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillex.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillex.toFixed(2));
                    }
                    break;
                case 12:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillnx.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillnx.toFixed(2));
                    }
                    break;
                case 14:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(user.gskillhv.toFixed(2));
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(user.dskillhv.toFixed(2));
                    }
                    break;
                case 1000:
                    setStatLeftTitle('Total');
                    setStatLeft(((skillSum1 + skillSum2) / 100).toFixed(2));
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (user && ptype && ptype && gtype && skillSum1 && skillSum2) {
            const getParameters = new URLSearchParams(window.location.search);
            setQueryLv(getParameters.get('lv')!);
            setQueryRank(getParameters.get('rank')!);
            setQueryVer(getParameters.get('ver')!);
            setQueryHot(getParameters.get('hot')!);

            setTitleText();
            setUpperTableText();
        }
    }, [user, skillSum1, skillSum2]);

    return {
        tableTxtGType,
        tableTxtDesc,
        statLeftTitle,
        statLeft,
        statMidTitle,
        statMid,
        statRightTitle,
        statRight,
    };
};

export default useSkillTableUpper;
