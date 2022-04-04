import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const TowerStatWrapper = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const TowerStatTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
`;

export const TowerStatDesc = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 10px;
`;

export const TowerStatTable = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
`;
