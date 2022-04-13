import React from "react";
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
import store from "@/mobx/store";
import { observer } from "mobx-react";

type SkillTableProps = {
    list: Array<SkillItemData>;
    // popup
    openPopup: (mid: number) => void;
};

const SkillTableNR = observer(({ list, openPopup }: SkillTableProps) => {
    const { dark } = store;

    return (
        <>
            {list.map((v, i) => {
                return (
                    <SkillItemWrapper
                        dark={dark.dark}
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
                                <SkillTitle dark={dark.dark}>{v.musicTitle}</SkillTitle>
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
                                                return <SkillRank alt="rank" src={v.rank} />;
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
});

export default SkillTableNR;
