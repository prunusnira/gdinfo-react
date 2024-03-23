import ContentLayout from '@/component/content/standardContent';
import { IClearTable } from '@/data/user/IClearTable';
import React from 'react';
import { ClearTableWrapper, TableHeader } from './clearTablePresenter.style';
import ClearTableRow from './clearTableRow';

interface Props {
    type: string;
    list: Array<IClearTable>;
}

const ClearTablePresenter = ({ type, list }: Props) => (
    <ContentLayout title={type === 'gf' ? 'GuitarFreaks' : 'DrumMania'}>
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
            <ClearTableRow list={list} />
        </ClearTableWrapper>
    </ContentLayout>
);

export default ClearTablePresenter;
