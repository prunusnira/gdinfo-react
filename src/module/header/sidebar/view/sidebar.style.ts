import { MenuBack, MenuBackDark } from "@/styled/color";
import styled from "styled-components";

export const SideBarContainer = styled.section<{ isOpen: boolean; dark: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 10;
    width: 100%;
    height: 100vh;
    position: absolute;
    right: 0;
    padding: 75px 5px 0 5px;
    overflow-y: auto;

    ${(props) =>
        !props.isOpen
            ? `transition: right 0.5s ease-in-out;
            right: -100%;`
            : `transition: right 0.5s ease-in-out;
            right: 0px;`}

    ${(props) =>
        props.dark
            ? `
    background-color: ${MenuBackDark};`
            : `
    background-color: ${MenuBack};`}
`;

export const SideBarInner = styled.div`
    width: 100%;
    max-width: 768px;
`;
