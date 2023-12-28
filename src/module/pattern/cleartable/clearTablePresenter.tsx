import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { IClearTable } from '@/data/IClearTable';
import { atomDarkmode } from '@/jotai/darkmode';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { ClearTableWrapper, TableHeader } from './clearTablePresenter.style';
import ClearTableRow from './clearTableRow';

interface Props {
    profileLink: string;
    titleTower: string;
    userName: string;
    glist: Array<IClearTable>;
    dlist: Array<IClearTable>;
}

const ClearTablePresenter = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <CommonLayout>
            <ContentLayout title={'Clear Status Table'}>
                <ThemedLink
                    dark={dark}
                    to={props.profileLink}
                    className="innerhref"
                    style={{ fontSize: '130%' }}
                >
                    {(function() {
                        if (props.titleTower !== '') {
                            return (
                                <img
                                    alt="titletower"
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${props.titleTower}.png`}
                                />
                            );
                        }
                        return <></>
                    })()}
                    {props.userName}
                </ThemedLink>

                <ContentLayout title={'GuitarFreaks'}>
                    <ClearTableWrapper>
                        <TableHeader>#</TableHeader>
                        <TableHeader>EXC</TableHeader>
                        <TableHeader>SS</TableHeader>
                        <TableHeader>S</TableHeader>
                        <TableHeader>A</TableHeader>
                        <TableHeader>B</TableHeader>
                        <TableHeader>C</TableHeader>
                        <TableHeader>F</TableHeader>
                        <TableHeader>No</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <ClearTableRow list={props.glist} />
                    </ClearTableWrapper>
                </ContentLayout>

                <ContentLayout title={'DrumMania'}>
                    <ClearTableWrapper>
                        <TableHeader>#</TableHeader>
                        <TableHeader>EXC</TableHeader>
                        <TableHeader>SS</TableHeader>
                        <TableHeader>S</TableHeader>
                        <TableHeader>A</TableHeader>
                        <TableHeader>B</TableHeader>
                        <TableHeader>C</TableHeader>
                        <TableHeader>F</TableHeader>
                        <TableHeader>No</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <ClearTableRow list={props.dlist} />
                    </ClearTableWrapper>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
};

export default ClearTablePresenter;
