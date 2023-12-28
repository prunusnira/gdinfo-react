import { ISkillItem } from '@/data/ISkillItem';
import { atomDarkmode } from '@/jotai/darkmode';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import {
    SkillClear,
    SkillDataRow,
    SkillDataWrapper,
    SkillItemNumber,
    SkillItemWrapper,
    SkillJacket,
    SkillJacketWrapper,
    SkillPattern,
    SkillRank,
    SkillRate,
    SkillSubData,
    SkillSubWrapper,
    SkillTitle,
    SkillValue,
    SkillValueWrapper,
} from './skillTableNR.style';

type SkillTableProps = {
    list: Array<ISkillItem>;
    // popup
    openPopup: (mid: number) => void;
};

const SkillTableNR = ({ list, openPopup }: SkillTableProps) => {
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
                    <SkillDataWrapper>
                        <SkillDataRow>
                            <SkillTitle dark={dark}>{v.musicTitle}</SkillTitle>
                        </SkillDataRow>
                        <SkillDataRow>
                            <SkillSubData>
                                <SkillSubWrapper>
                                    <SkillPattern alt="pattern-img" src={v.pattern300} />
                                </SkillSubWrapper>
                                <SkillSubWrapper>{v.level}</SkillSubWrapper>
                                <SkillSubWrapper>
                                    {(function() {
                                        if (v.rank !== '') {
                                            return <SkillRank alt="rank" src={v.rank} />;
                                        }
                                        return <></>;
                                    })()}
                                </SkillSubWrapper>
                                <SkillSubWrapper>
                                    <SkillClear src={v.clearImg300} />
                                </SkillSubWrapper>
                                <SkillSubWrapper>{v.version}</SkillSubWrapper>
                            </SkillSubData>
                        </SkillDataRow>
                    </SkillDataWrapper>
                    <SkillValueWrapper>
                        <SkillValue>{v.skill}</SkillValue>
                        <SkillRate>({v.rate}%)</SkillRate>
                    </SkillValueWrapper>
                </SkillItemWrapper>
            ))}
        </>
    );
};

export default SkillTableNR;
