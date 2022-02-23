import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const TowerListWrapper = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const TowerListTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const TowerListSection = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const TowerHowTo = styled.div`
    width: 100%;
    max-width: 620px;
    text-align: center;
`;

export const TowerListObj = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 620px;
`;

export const TowerListImgs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
`;
