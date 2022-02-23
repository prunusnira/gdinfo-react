import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const PCContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const PCTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const PCDesc = styled.div`
    padding: 10px;
`;

export const PCBtnWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const PCListWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    max-width: 800px;
`;
