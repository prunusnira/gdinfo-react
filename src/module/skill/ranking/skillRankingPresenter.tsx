import { ISkillRank } from '@/data/skill/ISkillRank';
import { atomDarkmode } from '@/jotai/darkmode';
import Pager from '@/module/common/pager';
import { Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import SkillRankingItem from './rankingItem';
import { SRIndex, SRIndexWrapper, SRListWrapper, SRPagerWrapper, SRTypeWrapper } from './skillRankingPresenter.style';

interface Props {
    gtype: string;
    rankList: Array<ISkillRank>;
    page: string;
    allPage: number;
}

const SkillRankingPresenter = ({gtype, rankList, page, allPage}: Props) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <>
            <SRTypeWrapper>
                <ThemedLink dark={dark} to="/rank/gf/1">
                    <Button>GuitarFreaks Ranking</Button>
                </ThemedLink>
                <ThemedLink dark={dark} to="/rank/dm/1">
                    <Button>DrumMania Ranking</Button>
                </ThemedLink>
            </SRTypeWrapper>
            <SRIndexWrapper>
                <SRIndex>GF</SRIndex>
                <SRIndex>DM</SRIndex>
            </SRIndexWrapper>
            <SRListWrapper>
                {
                    rankList.map(rank => (
                        <SkillRankingItem
                            rank={rank}
                        />
                    ))
                }
            </SRListWrapper>
            <SRPagerWrapper>
                <Pager
                    cpage={parseInt(page, 10)}
                    allpage={allPage}
                    baseUrl={`/rank/${gtype}/`}
                    afterUrl=""
                />
            </SRPagerWrapper>
        </>
    );
};

export default SkillRankingPresenter;
