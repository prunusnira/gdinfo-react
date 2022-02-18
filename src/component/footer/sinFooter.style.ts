import styled from "styled-components";

export const FooterOuter = styled.footer`
    flex: 0 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    
	background-color: #111;
	font-size: 80%;

    a {
        color:#aaaaff;
    }
    
    span {
        color:#dddddd;
    }
`

export const Footer = styled.div`
    flex: 0 1 auto;
    padding-top: 40px;
    padding-left: 10px;
    padding-right: 10px;
    
    display: flex;
    flex-direction: column;
    
    width: 100%;
    max-width: 1280px;
`

export const FooterRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 10px;
    flex-wrap: wrap;
`

export const FooterCol = styled.div<{size: string}>`
    ${props => `
        width: ${props.size};
    `}
`