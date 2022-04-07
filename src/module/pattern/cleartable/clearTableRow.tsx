import React from "react";
import ClearTableData from "./clearTableData";
import { TableText } from "./clearTablePresenter.style";

interface Props {
    list: Array<ClearTableData>;
}

const ClearTableRow = (props: Props) => {
    const data = props.list.map((clear, i) => {
        return (
            <>
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
            </>
        );
    });

    return <>{data}</>;
};

export default ClearTableRow;
