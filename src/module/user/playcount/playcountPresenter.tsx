import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { IPlayCount } from '@/data/IPlayCount';
import { atomLanguage } from '@/jotai/language';
import txtPlayCountEn from '@/lang/user/playcount/txtPlayCount-en';
import txtPlayCountJp from '@/lang/user/playcount/txtPlayCount-jp';

import txtPlayCountKo from '@/lang/user/playcount/txtPlayCount-ko';
import scrShot from '@/module/common/scrshot';
import { Button } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import CountTable from './countTable';
import { PCBtnWrapper, PCDesc, PCListWrapper, PCTitle } from './playcountPresenter.style';

interface Props {
    userName: string;
    id?: string;
    towerTitle: string;
    plist: Array<IPlayCount>;
    glist: Array<IPlayCount>;
    dlist: Array<IPlayCount>;
    mlist: Array<IPlayCount>;
}

const PlayCountPresenter = ({ userName, id, towerTitle, plist, glist, dlist, mlist }: Props) => {
    const lang = useAtomValue(atomLanguage);
    const [listData, setListData] = useState(mlist);
    const txtPlayCount =
        lang === 'ko' ? txtPlayCountKo : lang === 'jp' ? txtPlayCountJp : txtPlayCountEn;

    return (
        <CommonLayout>
            {id ? (
                <ContentLayout title={'Play Count'}>
                    <PCDesc>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => scrShot('scrshot', `${id}_mybest.jpg`)}
                        >
                            {txtPlayCount.button.scrshot}
                        </Button>
                        {txtPlayCount.desc_1}
                        <span style={{ color: '#ff5555' }}>{txtPlayCount.desc_2}</span>
                        {txtPlayCount.desc_3}
                    </PCDesc>
                    <PCTitle>
                        <h4>Most Played List</h4>
                        <span>
                        Player:&nbsp;
                            <img
                                alt="titletower"
                                style={{ width: '30px' }}
                                src={`${process.env.PUBLIC_URL}/general-img/title/${towerTitle}.png`}
                            />
                            {userName}
                    </span>
                    </PCTitle>
                    <PCBtnWrapper>
                        <Button onClick={() => setListData(plist)}>
                            {txtPlayCount.button.pt}
                        </Button>
                        <Button onClick={() => setListData(mlist)}>
                            {txtPlayCount.button.music}
                        </Button>
                        <Button onClick={() => setListData(glist)}>
                            {txtPlayCount.button.gf}
                        </Button>
                        <Button onClick={() => setListData(dlist)}>
                            {txtPlayCount.button.dm}
                        </Button>
                    </PCBtnWrapper>
                    <PCListWrapper id={'scrshot'}>
                        <CountTable data={listData} />
                    </PCListWrapper>
                </ContentLayout>
            ) : (<>{txtPlayCount.nodata}</>)}
        </CommonLayout>
    );
};

export default PlayCountPresenter;
