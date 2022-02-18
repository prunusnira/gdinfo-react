import styled from "styled-components";

export const NavSubOuter = styled.ul<{isOpen: boolean}>`
    list-style-type: disc;
    background-color: white;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
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
    max-height: 36px;
`

export const ImageIcon = styled.img`
    width: 24px;
    height: 24px;
    display: float;
    margin-right: 8px;
`

export const NavMenuIcon = styled.div`
    @media screen and (min-width: 1200px) {
        display: none;
    }
`

