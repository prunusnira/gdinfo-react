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
    z-index: 10;
`;

export const Header = styled.header<{ isTop: boolean; dark: boolean }>`
    display: flex;
    flex-direction: column;

    width: 100%;

    transition: background-color 0.2s ease-in-out;

    ${(props) =>
        props.isTop
            ? `background-color: transparent;`
            : props.dark
            ? `background-color: ${HeaderBGColorDark};`
            : `background-color: ${HeaderBGColor};`}
`;
