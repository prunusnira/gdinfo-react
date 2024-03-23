import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import { atomLanguage } from '@/jotai/language';
import txtSrankEn from '@/lang/skill/ranking/txtSkillRank-en';
import txtSrankJp from '@/lang/skill/ranking/txtSkillRank-jp';
import txtSrankKo from '@/lang/skill/ranking/txtSkillRank-ko';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import SkillRankingPresenter from './skillRankingPresenter';
import useSkillRankingData from './useSkillRankingData';

const SkillRanking = () => {
    const { gtype, page } = useParams();
    const { rankList, allPage, isLoading } = useSkillRankingData({ gtype, page });
    const lang = useAtomValue(atomLanguage);
    const txtSrank = lang === 'ko' ? txtSrankKo : lang === 'jp' ? txtSrankJp : txtSrankEn;

    return (
        <CommonLayout>
            <ContentLayout
                title={`${txtSrank.title} ${
                    gtype === 'gf' ? `GuitarFreaks` : `DrumMania`
                }`}
            >
                {isLoading ? <Loading /> : <></>}
                {!isLoading && gtype && page ?
                    <SkillRankingPresenter
                        gtype={gtype}
                        rankList={rankList}
                        page={page}
                        allPage={allPage} />
                    :
                    <></>
                }
            </ContentLayout>
        </CommonLayout>
    );
};

export default SkillRanking;