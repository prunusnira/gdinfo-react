import React from "react";
import "../skill.css";
import "@/module/common/table.css";
import SkillItemData from "../skillItem/skillItemData";

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
} from "./skillTableNR.style";

type SkillTableProps = {
    list: Array<SkillItemData>;
    // popup
    openPopup: (mid: number) => void;
};

const SkillTableNR = ({ list, openPopup }: SkillTableProps) => {
    return (
        <>
            {list.map((v, i) => {
                return (
                    <SkillItemWrapper
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
                                <SkillTitle>{v.musicTitle}</SkillTitle>
                            </SkillDataRow>
                            <SkillDataRow>
                                <SkillSubData>
                                    <SkillSubWrapper>
                                        <SkillPattern alt="pattern-img" src={v.pattern300} />
                                    </SkillSubWrapper>
                                    <SkillSubWrapper>{v.level}</SkillSubWrapper>
                                    <SkillSubWrapper>
                                        {(function () {
                                            if (v.rank !== "") {
                                                return (
                                                    <SkillRank
                                                        alt="rank"
                                                        className="skillrank-img"
                                                        src={v.rank}
                                                    />
                                                );
                                            }
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
                );
            })}
        </>
    );
};

export default SkillTableNR;
