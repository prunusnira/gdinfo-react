import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const PCRContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const PCRTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const PCRDesc = styled.section`
    width: 100%;
    max-width: 800px;
    padding: 10px;
`;

export const PCRListWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
`;

export const PCRPagerWrapper = styled.section``;
