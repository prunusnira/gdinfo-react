import React from "react";
import "../skill.css";
import "@/module/common/table.css";
import SkillItemData from "../skillItem/skillItemData";

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
} from "./skillTableSH.style";
import store from "@/mobx/store";
import { observer } from "mobx-react";

type SkillTableProps = {
    list: Array<SkillItemData>;
    // popup
    openPopup: (mid: number) => void;
};

const SkillTableSH = observer(({ list, openPopup }: SkillTableProps) => {
    const { dark } = store;

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
                        <SkillInfoWrapper>
                            <SkillTitle dark={dark.dark}>{v.musicTitle}</SkillTitle>
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
                                    </SkillDataRow>
                                </SkillDataCol>
                            </SkillDataWrapper>
                        </SkillInfoWrapper>
                        <SkillValueWrapper>
                            <SkillRate>{v.rate}%</SkillRate>
                            <SkillValue>{v.skill}</SkillValue>
                        </SkillValueWrapper>
                    </SkillItemWrapper>
                );
            })}
        </>
    );
});

export default SkillTableSH;
