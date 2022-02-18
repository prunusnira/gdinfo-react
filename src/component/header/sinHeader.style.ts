import styled from "styled-components";

export const HeaderOuter = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    position: fixed;
    top: 0;
    background-color: #353a40;
    z-index: 10;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 1280px;
`;
