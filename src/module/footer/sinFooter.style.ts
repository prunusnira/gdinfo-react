import { White } from "@/styled/color";
import styled from "styled-components";

export const FooterOuter = styled.footer`
    flex: 1 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: #111;
    font-size: 80%;
    width: 100%;

    a {
        color: #aaaaff;
    }
`;

export const Footer = styled.div`
    flex: 0 1 auto;
    padding-top: 40px;
    padding-left: 10px;
    padding-right: 10px;

    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 1024px;
`;

export const FooterRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 10px;
    flex-wrap: wrap;
`;

export const FooterSection = styled.div`
    padding: 10px 30px;
    color: ${White};
`;

export const FooterLogo = styled.img`
    max-height: 36px;
`;
