import { Select } from "@/styled/color";
import styled from "styled-components";

export const StatFloorWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;
`;

export const StatFloorRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    &:hover {
        background-color: ${Select};
    }
`;

export const StatFloorTitle = styled.div`
    flex: 1;
`;

export const StatFloorClear = styled.div`
    width: 35px;
    height: 35px;
`;

export const StatFloorClearImg = styled.img`
    width: 100%;
    height: 100%;
`;

export const StatFloorUserTitle = styled.div``;

export const StatFloorUserTitleBtn = styled.button`
    padding: 5px;
`;

export const StatFloorItemWrapper = styled.section`
    display: none;
`;
