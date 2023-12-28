import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import txtIndexEn from '@/lang/index/txtIndex-en';
import txtIndexJp from '@/lang/index/txtIndex-jp';
import txtIndexKo from '@/lang/index/txtIndex-ko';
import Error500 from '@/module/error/500';
import useNotice from '@/module/notice/useNotice';
import { Anchor } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { IndexContent, IndexRow } from '../index.style';
import IndexNoticeItem from './noticeItem';

const IndexNotice = () => {
    const lang = useAtomValue(atomLanguage);
    const dark = useAtomValue(atomDarkmode);

    const txtIndex =
        lang === 'ko' ? txtIndexKo : lang === 'jp' ? txtIndexJp : txtIndexEn;
    const { list, isLoading, isError } = useNotice(0);
    return (
        <IndexContent>
            <IndexRow>
                {txtIndex.notice2.desc}&nbsp;
                <Anchor href="/notice/1" dark={dark}>{`more >>`}</Anchor>
            </IndexRow>
            <IndexContent>
                {list && list.map((x, i) => (
                    <IndexNoticeItem key={`notice${i}`} item={x} />
                ))}
                {
                    isLoading ? <>Loading...</> : <></>
                }
                {
                    isError ? <Error500 /> : <></>
                }
            </IndexContent>
        </IndexContent>
    );
};

export default IndexNotice;
