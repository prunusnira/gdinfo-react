import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { IPattern } from '@/data/IPattern';
import { IRecent } from '@/data/IRecent';
import { atomLanguage } from '@/jotai/language';
import txtSearchEn from '@/lang/search/txtSearch-en';
import txtSearchJp from '@/lang/search/txtSearch-jp';
import txtSearchKo from '@/lang/search/txtSearch-ko';
import Pager from '@/module/common/pager';
import PatternListItem from '@/module/pattern/patternList/ptListItem';
import RecentTableDiv from '@/module/recent/recentTableDiv';
import { ItemRow } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
    userlist: Array<IRecent>;
    musiclist: Array<IPattern>;
    type?: string;
    page?: string;
    value?: string;
    allpage: number;
}

const SearchPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const txtSearch = lang === 'ko' ? txtSearchKo : lang === 'jp' ? txtSearchJp : txtSearchEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtSearch.title}>
                <ItemRow>
                    <span>{txtSearch.desc}</span>
                </ItemRow>
                <ItemRow>
                    <RecentTableDiv isMain={false} list={props.userlist} />
                </ItemRow>
                <ItemRow>
                    <PatternListItem list={props.musiclist} openPopup={() => {
                    }} />
                </ItemRow>
                {props.page && props.type && props.value && (
                    <Pager
                        cpage={parseInt(props.page, 10)}
                        allpage={props.allpage}
                        baseUrl={`/search/${props.type}/${props.value}/`}
                        afterUrl={''}
                    />
                )}
            </ContentLayout>
        </CommonLayout>
    );
};

export default SearchPresenter;
