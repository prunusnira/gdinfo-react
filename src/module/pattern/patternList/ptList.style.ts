import { Black } from "@/styled/color";
import styled from "styled-components";

export const PTListTitleDiv = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const PTListBody = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

export const PTListRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const PTListCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const PTListInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    width: 100%;
    max-width: 150px;
`;

export const PTListGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
`;

export const GridCellTop = styled.div`
    padding: 5px;
    text-align: center;

    background-color: #ffff00;
    color: black;
`;

export const GridCell = styled.div`
    padding: 5px;
    text-align: center;
`;

export const GridTxtRow = styled.div`
    flex: 1;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
