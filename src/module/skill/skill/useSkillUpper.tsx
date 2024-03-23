import { IProfile } from '@/data/user/IProfile';
import { atomLanguage } from '@/jotai/language';
import txtSkillEn from '@/lang/skill/skill/txtSkill-en';
import txtSkillJp from '@/lang/skill/skill/txtSkill-jp';
import txtSkillKo from '@/lang/skill/skill/txtSkill-ko';
import SingleSkillColorChanger from '@/module/common/skillcolor';
import * as time from '@/module/common/time';
import { useAtomValue } from 'jotai/index';
import React, { ReactNode, useEffect, useState } from 'react';

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
    const [statLeft, setStatLeft] = useState<ReactNode>('');
    const [statMidTitle, setStatMidTitle] = useState('');
    const [statMid, setStatMid] = useState<ReactNode>('');
    const [statRightTitle, setStatRightTitle] = useState('');
    const [statRight, setStatRight] = useState<ReactNode>('');

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

            if (ptype === '1000') setTableTxtDesc(txtSkill.exc);
            else setTableTxtDesc('Skill by ');
        }
    };

    // 스킬표 상단 테이블의 글자 데이터
    const setUpperTableText = () => {
        if(ptype === '1000' && skillSum1 && skillSum2) {
            setStatLeftTitle('Total');
            setStatLeft(
                <SingleSkillColorChanger
                    link={'#none'}
                    skill={(skillSum1 + skillSum2) / 100}
                />);
            setStatMidTitle('Hot');
            setStatMid(
                <SingleSkillColorChanger
                    link={'#none'}
                    skill={skillSum1 / 100}
                />);
            setStatRightTitle('Other');
            setStatRight(
                <SingleSkillColorChanger
                    link={'#none'}
                    skill={skillSum2 / 100}
                />);
        }

        if (user && ptype && gtype && skillSum1 && skillSum2) {
            if (gtype === 'gf') {
                setStatLeftTitle('GF Skill');
                setStatLeft(
                    <SingleSkillColorChanger
                        link={'#none'}
                        skill={user.gskill}
                    />);
            } else if (gtype === 'dm') {
                setStatLeftTitle('DM Skill');
                setStatLeft(
                    <SingleSkillColorChanger
                        link={'#none'}
                        skill={user.dskill}
                    />);
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
                case 15:
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
                case 16:
                case 1000:
                    setStatMidTitle('Hot');
                    setStatMid(
                        <SingleSkillColorChanger
                            link={'#none'}
                            skill={skillSum1 / 100}
                        />);
                    setStatRightTitle('Other');
                    setStatRight(
                        <SingleSkillColorChanger
                            link={'#none'}
                            skill={skillSum2 / 100}
                        />);
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
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskilltb}
                            />)
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskilltb}
                            />);
                    }
                    break;
                case 5:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskilltbre}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskilltbre}
                            />);
                    }
                    break;
                case 7:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillmx}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillmx}
                            />);
                    }
                    break;
                case 9:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillex}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillex}
                            />);
                    }
                    break;
                case 11:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillnx}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillnx}
                            />);
                    }
                    break;
                case 13:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillhv}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillhv}
                            />);
                    }
                    break;
                case 15:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillfu}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillfu}
                            />);
                    }
                    break;
                case 4:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskilltb}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskilltb}
                            />);
                    }
                    break;
                case 6:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskilltbre}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskilltbre}
                            />);
                    }
                    break;
                case 8:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillmx}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillmx}
                            />);
                    }
                    break;
                case 10:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillex}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillex}
                            />);
                    }
                    break;
                case 12:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillnx}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillnx}
                            />);
                    }
                    break;
                case 14:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillhv}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillhv}
                            />);
                    }
                    break;
                case 16:
                    if (gtype === 'gf') {
                        setStatLeftTitle('GF Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.gskillfu}
                            />);
                    } else if (gtype === 'dm') {
                        setStatLeftTitle('DM Skill');
                        setStatLeft(
                            <SingleSkillColorChanger
                                link={'#none'}
                                skill={user.dskillfu}
                            />);
                    }
                    break;
                case 1000:
                    setStatLeftTitle('Total');
                    setStatLeft(
                        <SingleSkillColorChanger
                            link={'#none'}
                            skill={(skillSum1 + skillSum2) / 100}
                        />);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (ptype && ptype && gtype && skillSum1 && skillSum2) {
            const getParameters = new URLSearchParams(window.location.search);
            setQueryLv(getParameters.get('lv')!);
            setQueryRank(getParameters.get('rank')!);
            setQueryVer(getParameters.get('ver')!);
            setQueryHot(getParameters.get('hot')!);

            setTitleText();
            setUpperTableText();
        }
    }, [skillSum1, skillSum2]);

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
