import { Black, SkillBottomLine, White } from "@/styled/color";
import styled from "styled-components";

export const IndexContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    -webkit-transform: width 0.75s ease-in;
    -moz-transform: width 0.75s ease-in;
    -o-transform: width 0.75s ease-in;
    transform: width 0.75s ease-in;
`;

export const IndexContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
    padding: 10px;
`;

export const IndexTitle = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${Black};
    color: ${White};
`;

export const IndexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const IndexScriptWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 750px;
    margin: 10px;
    border: 1px solid ${SkillBottomLine};
    background-color: ${White};
    color: ${Black};
`;

export const IndexScript = styled.div`
    padding: 10px;
    word-break: break-all;
    cursor: pointer;
`;

export const IndexImg = styled.img`
    width: 80%;
    height: 80%;
    padding: 15px;

    @media screen and (max-width: 499px) {
        width: 100%;
        height: 100%;
    }
`;
