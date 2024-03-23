import { ISkillItem } from '@/data/skill/ISkillItem';
import { atomDarkmode } from '@/jotai/darkmode';
import { useAtomValue } from 'jotai/index';
import React from 'react';

import {
    SkillClear,
    SkillDataCol,
    SkillDataRow,
    SkillDataWrapper,
    SkillInfoWrapper,
    SkillItemNumber,
    SkillItemWrapper,
    SkillJacket,
    SkillJacketWrapper,
    SkillPattern,
    SkillRank,
    SkillRate,
    SkillSubWrapper,
    SkillTitle,
    SkillValue,
    SkillValueWrapper,
} from './skillTableSH.style';

type SkillTableProps = {
    list: Array<ISkillItem>;
    // popup
    openPopup: (mid: number) => void;
};

const SkillTableSH = ({ list, openPopup }: SkillTableProps) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <>
            {list.map((v, i) => (
                <SkillItemWrapper
                    dark={dark}
                    onClick={() => {
                        openPopup(v.mid);
                    }}
                >
                    <SkillItemNumber style={v.tableColor}>{v.num}</SkillItemNumber>
                    <SkillInfoWrapper>
                        <SkillTitle dark={dark}>{v.musicTitle}</SkillTitle>
                        <SkillDataWrapper>
                            <SkillJacketWrapper>
                                <SkillJacket
                                    alt={`jacket-img${i}`}
                                    src={v.iconUrl}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `${process.env.PUBLIC_URL}/general-img/empty.jpg`;
                                    }}
                                />
                            </SkillJacketWrapper>
                            <SkillDataCol>
                                <SkillDataRow>
                                    <SkillSubWrapper>
                                        <SkillPattern alt="pattern-img" src={v.pattern300} />
                                    </SkillSubWrapper>
                                    <SkillSubWrapper>{v.level}</SkillSubWrapper>
                                </SkillDataRow>
                                <SkillDataRow>
                                    <SkillSubWrapper>
                                        {v.rank !== '' ?
                                            <SkillRank alt="rank" src={v.rank} />
                                            :
                                            <></>
                                        }
                                    </SkillSubWrapper>
                                    <SkillSubWrapper>
                                        <SkillClear src={v.clearImg300} />
                                    </SkillSubWrapper>
                                </SkillDataRow>
                            </SkillDataCol>
                        </SkillDataWrapper>
                    </SkillInfoWrapper>
                    <SkillValueWrapper>
                        <SkillRate>{v.rate}%</SkillRate>
                        <SkillValue>{v.skill}</SkillValue>
                    </SkillValueWrapper>
                </SkillItemWrapper>
            ))}
        </>
    );
};

export default SkillTableSH;
