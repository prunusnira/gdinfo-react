import styled from "styled-components";

export const HeaderNav = styled.nav`
    background-color: #353a40
`

export const NavBar = styled.div`
    padding: 10px 20px 10px 20px;

    @media screen and (max-width: 1199px) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        flex-direction: vertical;
    }
    @media screen and (min-width: 1200px) {
        display: flex;
        justify-content: space-between;
    }
`

export const NavTitle = styled.div`
    font-size: 20px;
`

export const NavMenu = styled.ul<{isToggled: boolean}>`
    margin: 0px !important;
    @media screen and (max-width: 1199px) {
        ${props => props.isToggled ?
            `display: block;
            width: 100%;
            list-style-type: none;`
            :
            `display: none;`
        }
    }

    @media screen and (min-width: 1200px) {
        flex: 1 0 auto;
        display: flex;
        list-style-type: none;
    }
`

export const NavToggle = styled.div`
    @media screen and (min-width: 1200px) {
        display: none;
    }
`

export const NavItemX = styled.li`
    order: 3;
    width: 100%;
    flex: 1 1 auto;

    @media screen and (min-width: 1200px) {
        display: block;
        align-items: flex-start;
    }
`

export const NavSubOuter = styled.ul<{isOpen: boolean}>`
    list-style-type: disc;
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid grey;
    border-radius: 10px;
    ${props => props.isOpen ? 'display: block;' : 'display: none;'}
`

export const NavSubItem = styled.li`
    a {
        color: black;
    }
`

export const ImageTitle = styled.img`
    max-height: 48px;
`

export const ImageIcon = styled.img`
    width: 32px;
    height: 32px;
    display: float;
    margin-right: 10px;
`

export const NavMenuIcon = styled.div`
    @media screen and (min-width: 1200px) {
        display: none;
    }
`

export const SearchBarSection = styled.div`
    display: flex;
    width: 100%;
`

export const SearchBar = styled.input`
    flex: 1 0 auto
`