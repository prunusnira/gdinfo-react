import { Black, White } from "@/styled/color";
import styled from "styled-components";

export const LIWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LIRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

export const LISkillRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
    background-color: ${Black};
    color: ${White};
`;

export const LIIcon = styled.img`
    width: 35px;
    height: 35px;
`;

export const LIName = styled.div`
    font-size: 18px;
    padding-left: 10px;
`;

export const LIType = styled.div`
    width: 30px;
`;

export const LIVal = styled.div`
    width: 100px;
`;
