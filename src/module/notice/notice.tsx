import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { atomLanguage } from '@/jotai/language';
import txtNoticeEn from '@/lang/notice/txtNotice-en';
import txtNoticeJp from '@/lang/notice/txtNotice-jp';
import txtNoticeKo from '@/lang/notice/txtNotice-ko';
import Error500 from '@/module/error/500';
import { useAtomValue } from 'jotai/index';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoticeItem from './noticeItem';
import useNotice from './useNotice';

const NoticePage = () => {
    const lang = useAtomValue(atomLanguage);

    const txtNotice =
        lang === 'ko' ? txtNoticeKo : lang === 'jp' ? txtNoticeJp : txtNoticeEn;

    const { page } = useParams();
    const { list, isLoading, isError } = useNotice(page ? parseInt(page, 10) : 0);

    useEffect(() => {
        console.log(list);
    }, [list]);

    return (
        <CommonLayout>
            <ContentLayout title={txtNotice.title}>
                {list && list.map((x, i) => (
                    <NoticeItem
                        key={`notice${i}`}
                        num={x.id}
                        title={
                            lang === 'ko'
                                ? x.titleK
                                : lang === 'jp'
                                    ? x.titleJ
                                    : x.titleE
                        }
                        content={
                            lang === 'ko'
                                ? x.contentK
                                : lang === 'jp'
                                    ? x.contentJ
                                    : x.contentE
                        }
                        date={x.time}
                    />
                ))}
                {
                    isLoading ? <>Loading...</> : <></>
                }
                {
                    isError ? <Error500 /> : <></>
                }
            </ContentLayout>
        </CommonLayout>
    );
};

export default NoticePage;
