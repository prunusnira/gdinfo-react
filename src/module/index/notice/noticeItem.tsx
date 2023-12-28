import { INotice } from '@/data/INotice';
import { atomLanguage } from '@/jotai/language';
import { unixTimeConverter } from '@/module/common/time';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { NoticeBar, NoticeDate, NoticeTitle } from './noticeItem.style';

type Props = {
    item: INotice;
};

const IndexNoticeItem = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    return (
        <NoticeBar>
            <NoticeTitle>
                {lang === 'ko'
                    ? props.item.titleK
                    : lang === 'jp'
                        ? props.item.titleJ
                        : props.item.titleE}
            </NoticeTitle>
            <NoticeDate>{unixTimeConverter(props.item.time)}</NoticeDate>
        </NoticeBar>
    );
};

export default IndexNoticeItem;
