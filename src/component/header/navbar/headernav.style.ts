import styled from "styled-components";

export const NavBar = styled.div`
    padding: 10px 20px 10px 20px;

    @media screen and (max-width: 1049px) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        flex-direction: vertical;
    }
    @media screen and (min-width: 1050px) {
        display: flex;
        justify-content: space-between;
    }
`

export const NavTitle = styled.div`
    font-size: 20px;
`

export const NavMenu = styled.ul<{isToggled: boolean}>`
    margin: 0px !important;
    @media screen and (max-width: 1049px) {
        ${props => props.isToggled ?
            `display: block;
            width: 100%;
            list-style-type: none;`
            :
            `display: none;`
        }
    }

    @media screen and (min-width: 1050px) {
        display: flex;
        align-items: flex-start;
        list-style-type: none;
    }
`

export const NavToggle = styled.div`
    @media screen and (min-width: 1050px) {
        display: none;
    }
`

export const NavItemX = styled.li`
    order: 3;
    flex: 1 1 auto;
    padding-left: 20px;
    padding-right: 20px;

    @media screen and (min-width: 1050px) {
        display: block;
        align-items: flex-start;
    }
`