import { HeaderBGColor, HeaderBGColorDark } from "@/styled/color";
import styled from "styled-components";

export const HeaderOuter = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    position: fixed;
    background-color: transparent;
    top: 0;
    z-index: 11;
`;

export const Header = styled.header<{ $isTop: boolean; $dark: boolean }>`
    display: flex;
    flex-direction: column;

    width: 100%;

    transition: background-color 0.2s ease-in-out;

    ${(props) =>
        // props.isTop
        // ? `background-color: transparent;`
        // :
        props.$dark
            ? `background-color: ${HeaderBGColorDark};`
            : `background-color: ${HeaderBGColor};`}
`;

export const HeaderNotice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    position: absolute;
    z-index: 100;
    width: 100%;
    height: 75px;
    background-color: black;
    color: white;
`;
