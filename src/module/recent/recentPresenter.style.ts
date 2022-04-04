import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const RecentContainer = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1280px;
`;

export const RecentTitle = styled.div`
    background-color: ${Black};
    padding: 10px;
`;

export const RecentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${BGGray};
`;

export const RecentRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 620px;
`;
