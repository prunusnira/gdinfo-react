import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const PRContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const PRTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const PRTitleRank = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${Black};
`;

export const PRBody = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

export const PRRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const PRCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
