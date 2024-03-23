import { Select, SelectDark } from "@/styled/color";
import styled from "styled-components";

export const PCRIWrapper = styled.section<{ $dark: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;

    &:hover {
        background-color: ${(props) => (props.$dark ? SelectDark : Select)};
    }
`;

export const PCRINum = styled.div`
    width: 50px;
    text-align: center;
`;

export const PCRIUser = styled.div`
    flex: 1;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const PCRIIcon = styled.img`
    width: 30px;
    height: 30px;
`;

export const PCRICnt = styled.div`
    padding: 0 5px;
`;
