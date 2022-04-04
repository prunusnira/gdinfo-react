import { Black, MenuBack, White } from "@/styled/color";
import styled from "styled-components";

export const SideBarButton = styled.button`
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 11;
    border: 1px solid ${Black};
    border-radius: 50%;
    background-color: ${White};
`;

export const SideBarContainer = styled.section<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;

    z-index: 10;
    height: 100vh;
    position: absolute;
    right: 0;
    background-color: ${MenuBack};
    color: ${Black};
    padding: 50px 5px 0 5px;
    overflow-y: auto;

    @media screen and (max-width: 360px) {
        width: 100%;
        min-width: 100%;
    }
    @media screen and (min-width: 361px) {
        width: 360px;
        min-width: 360px;
    }

    ${(props) =>
        !props.isOpen
            ? `transition: right 0.1s ease-in-out;
            right: -360px;`
            : `transition: right 0.1s ease-in-out;
            right: 0px;`}
`;
