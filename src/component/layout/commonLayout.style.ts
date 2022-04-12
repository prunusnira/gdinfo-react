import { Background, Black, SeaBlue } from "@/styled/color";
import styled from "styled-components";

export const Outer = styled.main<{ dark: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100%;
    overflow-y: scroll;

    ${(props) => (props.dark ? `background-color: ${Black};` : `background-color: ${Background}`)}
`;

export const Container = styled.section`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 60px;

    // media query를 사용하여 width 마다 별도로 지정
    @media screen and (max-width: 415px) {
        // mobile
        width: 100%;
    }
    @media screen and (max-width: 768px) {
        // tablet
        width: 100%;
    }
    @media screen and (min-width: 769px) {
        // pc
        width: 100%;
        max-width: 1024px;
    }
`;

export const FooterWrapper = styled.section`
    width: 100%;
`;
