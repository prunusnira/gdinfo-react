import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const LoginContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const LoginTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const LoginContent = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 620px;
`;
