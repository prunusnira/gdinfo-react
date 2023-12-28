import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { ISkillRank } from '@/data/ISkillRank';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtSrankEn from '@/lang/skill/ranking/txtSkillRank-en';
import txtSrankJp from '@/lang/skill/ranking/txtSkillRank-jp';
import txtSrankKo from '@/lang/skill/ranking/txtSkillRank-ko';
import Pager from '@/module/common/pager';
import Error404 from '@/module/error/404';
import { Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import SkillRankingItem from './rankingItem';
import { SRIndex, SRIndexWrapper, SRListWrapper, SRPagerWrapper, SRTypeWrapper } from './skillRankingPresenter.style';

interface Props {
    gtype?: string;
    rankList: Array<ISkillRank>;
    page?: string;
    allPage: number;
}

const SkillRankingPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtSrank = lang === 'ko' ? txtSrankKo : lang === 'jp' ? txtSrankJp : txtSrankEn;

    if (props.gtype && props.page) {
        return (
            <CommonLayout>
                <ContentLayout
                    title={`${txtSrank.title} ${props.gtype === 'gf' ? `GuitarFreaks` : `DrumMania`}`}
                >
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
                        <SkillRankingItem gtype={props.gtype} rank={props.rankList} />
                    </SRListWrapper>
                    <SRPagerWrapper>
                        <Pager
                            cpage={parseInt(props.page, 10)}
                            allpage={props.allPage}
                            baseUrl={`/rank/${props.gtype}/`}
                            afterUrl=""
                        />
                    </SRPagerWrapper>
                </ContentLayout>
            </CommonLayout>
        );
    }
    return (
        <Error404 />
    );
};

export default SkillRankingPresenter;
