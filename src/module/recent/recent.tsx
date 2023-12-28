import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { atomLanguage } from '@/jotai/language';
import txtRecentEn from '@/lang/recent/txtRecent-en';
import txtRecentJp from '@/lang/recent/txtRecent-jp';
import txtRecentKo from '@/lang/recent/txtRecent-ko';
import { RecentRow } from '@/module/recent/recentPresenter.style';
import RecentTableDiv from '@/module/recent/recentTableDiv';
import {ReactComponent as IconLoading} from '@/svg/loading.svg';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import useRecent from './useRecent';

const Recent = () => {
    const lang = useAtomValue(atomLanguage);
    const { recentUserList, isLoading, isError } = useRecent();

    const txtRecent = lang === 'ko' ? txtRecentKo : lang === 'jp' ? txtRecentJp : txtRecentEn;

    if (isLoading) {
        return (
            <CommonLayout>
                <ContentLayout title={txtRecent.recent}>
                    <IconLoading viewBox={'0 0 40 40'} width={100} height={100} />
                </ContentLayout>
            </CommonLayout>
        );
    }
    if (isError) {
        return (
            <CommonLayout>
                <ContentLayout title={txtRecent.recent}>
                    LIST IS EMPTY
                </ContentLayout>
            </CommonLayout>
        );
    }
    return (
        <CommonLayout>
            <ContentLayout title={txtRecent.recent}>
                <RecentRow>{txtRecent.click}</RecentRow>
                <RecentRow>
                    <RecentTableDiv isMain={true} list={recentUserList} />
                </RecentRow>
            </ContentLayout>
        </CommonLayout>
    );
};

export default Recent;