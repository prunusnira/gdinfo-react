import { Background, Black } from "@/styled/color";
import styled from "styled-components";

export const Outer = styled.main`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${Background};
`;

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 60px;
    border: 1px solid ${Black};

    // media query를 사용하여 width 마다 별도로 지정
    @media screen and (max-width: 360px) {
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
