import { BGGray, Black, White } from "@/styled/color";
import styled from "styled-components";

export const SideBarItemWrapper = styled.div<{ dark: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 10px 5px;

    ${(props) =>
        props.dark
            ? `color: ${White};

    :hover {
        background-color: ${White};
        color: ${Black};
    }`
            : `color: ${Black};

:hover {
    background-color: ${BGGray};
    color: ${White};
}`}
`;

export const SideBarSubWrapper = styled.div`
    padding-left: 5px;
`;

export const SBIcon = styled.img`
    width: 32px;
    height: 32px;
    background-color: ${Black};
`;

export const SBTxt = styled.span`
    flex: 1;
    font-size: 14px;
    padding: 0 10px;
`;
