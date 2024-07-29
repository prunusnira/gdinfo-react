import { Black, White } from "@/styled/color";
import styled from "styled-components";

export const NavBar = styled.div`
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    z-index: 11;
`;

export const NavTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

export const NavMenu = styled.ul`
    margin: 0 5px 0 0 !important;
    display: flex;
    align-items: center;
    list-style-type: none;
`;

export const NavToggle = styled.div`
    @media screen and (min-width: 1050px) {
        display: none;
    }
`;

export const NavItem = styled.li<{ $dark: boolean }>`
    order: 3;
    flex: 1 1 auto;
    padding-left: 10px;
    padding-right: 10px;

    @media screen and (min-width: 1050px) {
        display: block;
        align-items: flex-start;
    }

    .logout {
        box-shadow: none !important;
        display: block !important;
        font-size: 16px !important;
        text-decoration: none !important;
        background-color: transparent !important;

        ${(props) => (props.$dark ? `color: ${White} !important;` : `color: ${Black} !important;`)}
    }

    span {
        box-shadow: none !important;
        display: block !important;
        font-size: 16px !important;
        text-decoration: none !important;

        ${(props) => (props.$dark ? `color: ${White} !important;` : `color: ${Black} !important;`)}
    }
    
    ${(props) => (props.$dark ? `color: ${White};` : `color: ${Black};`)}
`;

export const NavLogo = styled.img`
    max-height: 36px;
`;
