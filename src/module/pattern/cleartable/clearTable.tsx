import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import { atomDarkmode } from '@/jotai/darkmode';
import useUserData from '@/module/common/useUserData';
import DataError from '@/module/error/dataError';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import ClearTablePresenter from './clearTablePresenter';
import useClearTable from './useClearTable';

const ClearTable = () => {
    const { userid } = useParams();
    const {list: glist, isLoading: isGFLoading} = useClearTable({ userid, type: 'gf' });
    const {list: dlist, isLoading: isDMLoading} = useClearTable({ userid, type: 'dm' });
    const {
        userName,
        profileLink,
        titleTower,
        isUserLoading,
        isUserError,
    } = useUserData(userid);
    const dark = useAtomValue(atomDarkmode);

    return (
        <CommonLayout>
            <ContentLayout title={'Clear Status Table'}>
                {isGFLoading || isDMLoading || isUserLoading ?
                    <Loading />
                    :
                    <></>
                }

                {isUserError ? <DataError /> : <></>}

                <ThemedLink
                    $dark={dark}
                    to={profileLink}
                    className="innerhref"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '130%',
                    }}
                >
                    {titleTower !== '' ?
                        <img
                            alt="titletower"
                            src={`${process.env.PUBLIC_URL}/general-img/title/${titleTower}.png`}
                        />
                        :
                        <></>
                    }
                    <span>{userName}</span>
                </ThemedLink>
                <ClearTablePresenter
                    type={'gf'}
                    list={glist}
                />
                <ClearTablePresenter
                    type={'dm'}
                    list={dlist}
                />
            </ContentLayout>
        </CommonLayout>
    );
};

export default ClearTable;
