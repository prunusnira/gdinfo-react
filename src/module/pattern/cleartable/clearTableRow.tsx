import { IClearTable } from '@/data/user/IClearTable';
import React, { Fragment } from 'react';
import { TableText } from './clearTablePresenter.style';

interface Props {
    list: Array<IClearTable>;
}

const ClearTableRow = ({ list }: Props) => {
    const data = list.map((clear, i) => (
        <Fragment key={`clearRow${i}`}>
            <TableText>{clear.level}</TableText>
            <TableText>{clear.exc}</TableText>
            <TableText>{clear.ss}</TableText>
            <TableText>{clear.s}</TableText>
            <TableText>{clear.a}</TableText>
            <TableText>{clear.b}</TableText>
            <TableText>{clear.c}</TableText>
            <TableText>{clear.f}</TableText>
            <TableText>{clear.n}</TableText>
            <TableText>{clear.all}</TableText>
        </Fragment>
    ));

    return <>{data}</>;
};

export default ClearTableRow;
