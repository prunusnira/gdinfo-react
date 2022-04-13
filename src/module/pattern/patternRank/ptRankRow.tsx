import React from "react";
import { Icon, ThemedLink } from "@/styled/styledCommon";
import PTRankData from "./ptrankData";
import {
    PRColRank,
    PRRankImg,
    PRRate,
    PRRow,
    PRSkill,
    PRSkillColor,
    PRStatus,
    PRStatusImg,
    PRUserName,
} from "./ptRankRow.style";
import store from "@/mobx/store";
import { observer } from "mobx-react";

interface Props {
    list: Array<PTRankData>;
}

const PatternRankRow = observer((props: Props) => {
    const { dark } = store;
    return (
        <>
            {props.list.map((pd, i) => {
                return (
                    <PRRow key={i} dark={dark.dark}>
                        <PRSkillColor style={pd.ratecolor}>&nbsp;</PRSkillColor>
                        <PRSkillColor style={pd.skillcolor}>&nbsp;</PRSkillColor>
                        <PRColRank>{pd.index}</PRColRank>
                        <PRUserName>
                            {pd.towertitle !== "" ? (
                                <Icon
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${pd.towertitle}.png`}
                                />
                            ) : null}
                            <ThemedLink dark={dark.dark} className="innerhref" to={pd.profile}>
                                {pd.name}
                            </ThemedLink>
                        </PRUserName>
                        <PRStatus>
                            <PRRankImg alt="rank" src={pd.rank} />
                            {pd.fc ? (
                                pd.exc ? (
                                    <PRStatusImg
                                        src={`${process.env.PUBLIC_URL}/general-img/rank/exc_300.png`}
                                    />
                                ) : (
                                    <PRStatusImg
                                        src={`${process.env.PUBLIC_URL}/general-img/rank/fc_300.png`}
                                    />
                                )
                            ) : (
                                <PRStatusImg
                                    src={`${process.env.PUBLIC_URL}/general-img/rank/cleared_300.png`}
                                />
                            )}
                        </PRStatus>
                        <PRRate>{pd.rate.toFixed(2)}%</PRRate>
                        <PRSkill>{pd.skill}</PRSkill>
                    </PRRow>
                );
            })}
        </>
    );
});

export default PatternRankRow;
