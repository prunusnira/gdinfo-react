import { IPatternRank } from '@/data/IPatternRank';
import { atomDarkmode } from '@/jotai/darkmode';
import { Icon, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
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
} from './ptRankRow.style';

interface Props {
    list: Array<IPatternRank>;
}

const PatternRankRow = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            {props.list.map((pd, i) => (
                    <PRRow key={i} dark={dark}>
                        <PRSkillColor style={pd.ratecolor}>&nbsp;</PRSkillColor>
                        <PRSkillColor style={pd.skillcolor}>&nbsp;</PRSkillColor>
                        <PRColRank>{pd.index}</PRColRank>
                        <PRUserName>
                            {pd.towertitle !== '' ? (
                                <Icon
                                    sizeType={'sm'}
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${pd.towertitle}.png`}
                                />
                            ) : null}
                            <ThemedLink dark={dark} className="innerhref" to={pd.profile}>
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
                ),
            )}
        </>
    );
};

export default PatternRankRow;
