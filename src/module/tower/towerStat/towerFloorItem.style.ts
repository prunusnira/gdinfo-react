import { Select, SelectDark } from "@/styled/color";
import styled from "styled-components";

export const FloorItemWrapper = styled.section<{ $dark: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 5px;

    &:hover {
        background-color: ${(props) => (props.$dark ? SelectDark : Select)};
    }
`;

export const FIImgWrapper = styled.div`
    width: 50px;
    height: 50px;
`;

export const FIImg = styled.img`
    width: 100%;
    height: 100%;
`;

export const FIInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
`;

export const FITitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const FIDiff = styled.div``;

export const FICondition = styled.div``;
export const FIClear = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FIClearImg = styled.img`
    width: 35px;
    height: 35px;
`;
export const FIUserTitle = styled.button`
    width: 80px;
`;
