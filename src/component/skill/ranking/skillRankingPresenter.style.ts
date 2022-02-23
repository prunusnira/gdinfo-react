import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const SRContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    background-color: ${BGGray};
`;

export const SRTitle = styled.div`
    padding: 10px;
    width: 100%;
    background-color: ${Black};
`;

export const SRTypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 10px 0;
`;

export const SRIndexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

export const SRIndex = styled.div`
    width: 100px;
    text-align: center;
`;

export const SRListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

export const SRPagerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
