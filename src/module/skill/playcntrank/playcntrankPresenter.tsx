import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { IPlayCountRank } from '@/data/IPlayCountRank';
import { atomLanguage } from '@/jotai/language';
import txtCntRankEn from '@/lang/skill/playcntrank/txtCountRank-en';
import txtCntRankJp from '@/lang/skill/playcntrank/txtCountRank-jp';
import txtCntRankKo from '@/lang/skill/playcntrank/txtCountRank-ko';
import Pager from '@/module/common/pager';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import PlayCntRankItem from './playcntitem';
import { PCRDesc, PCRListWrapper, PCRPagerWrapper } from './playcntrankPresenter.style';

interface Props {
    list: Array<IPlayCountRank>;
    page?: string;
    allPage: number;
}

const PlaycountRankingPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);

    const txtCntRank = lang === 'ko' ? txtCntRankKo : lang === 'jp' ? txtCntRankJp : txtCntRankEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtCntRank.title}>
                <PCRDesc>
                    {txtCntRank.desc.desc1}
                    <br />
                    {txtCntRank.desc.desc2}
                    <br />
                    {txtCntRank.desc.desc3}
                </PCRDesc>
                <PCRListWrapper>
                    <PlayCntRankItem list={props.list} />
                </PCRListWrapper>
                {props.page && (
                    <PCRPagerWrapper>
                        <Pager
                            cpage={parseInt(props.page, 10)}
                            allpage={props.allPage}
                            baseUrl="/cntrank/"
                            afterUrl=""
                        />
                    </PCRPagerWrapper>
                )}
            </ContentLayout>
        </CommonLayout>
    );
};

export default PlaycountRankingPresenter;
