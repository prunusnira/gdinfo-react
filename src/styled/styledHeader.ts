import styled from "styled-components";

export const HeaderNav = styled.nav`
    background-color: #1a2a3a
`

export const NavBar = styled.div`
    padding: 10px 20px 10px 20px;

    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: vertical;
    }
    @media screen and (min-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: vertical;
    }
    @media screen and (min-width: 1200px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const NavTitle = styled.div`
    font-size: 20px;
`

export const NavMenu = styled.ul`
    flex: 1 0 auto;
    display: flex;
    list-style-type: none;
`

export const NavItemX = styled.li`
    padding: 10px;
    order: 3;
    width: 100%;
    flex: 1 1 auto;

    @media screen and (max-width: 1200px) {
        display: none;
    }
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
    border-radius: 10%;
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