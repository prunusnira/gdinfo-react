import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import { atomLanguage } from '@/jotai/language';
import txtPlayCountEn from '@/lang/user/playcount/txtPlayCount-en';
import txtPlayCountJp from '@/lang/user/playcount/txtPlayCount-jp';
import txtPlayCountKo from '@/lang/user/playcount/txtPlayCount-ko';
import useUserData from '@/module/common/useUserData';
import DataError from '@/module/error/dataError';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import PlayCountPresenter from './playcountPresenter';
import usePlayCount from './usePlayCount';

const PlayCount = () => {
    const { id } = useParams();
    const {
        userName,
        titleTower,
        isUserLoading,
        isUserError,
    } = useUserData(id);
    const { plist, glist, dlist, mlist } = usePlayCount(id);
    const lang = useAtomValue(atomLanguage);
    const txtPlayCount =
        lang === 'ko' ? txtPlayCountKo : lang === 'jp' ? txtPlayCountJp : txtPlayCountEn;

    return (
        <CommonLayout>
            <ContentLayout title={'Play Count'}>
                {isUserLoading ? <Loading /> : <></>}
                {isUserError ? <DataError /> : <></>}

                {id ?
                    <PlayCountPresenter
                        userName={userName}
                        id={id}
                        towerTitle={titleTower}
                        plist={plist}
                        glist={glist}
                        dlist={dlist}
                        mlist={mlist}
                    />
                    :
                    <>{txtPlayCount.nodata}</>
                }
            </ContentLayout>
        </CommonLayout>
    );
};

export default PlayCount;
