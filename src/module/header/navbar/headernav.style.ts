import styled from "styled-components";

export const NavBar = styled.div`
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
`;

export const NavTitle = styled.div`
    font-size: 20px;
`;

export const NavMenu = styled.ul<{ isToggled: boolean }>`
    margin: 0px !important;
    display: flex;
    align-items: flex-start;
    list-style-type: none;
`;

export const NavToggle = styled.div`
    @media screen and (min-width: 1050px) {
        display: none;
    }
`;

export const NavItemX = styled.li`
    order: 3;
    flex: 1 1 auto;
    padding-left: 20px;
    padding-right: 20px;

    @media screen and (min-width: 1050px) {
        display: block;
        align-items: flex-start;
    }
`;

export const NavLogo = styled.img`
    max-height: 36px;
`;
