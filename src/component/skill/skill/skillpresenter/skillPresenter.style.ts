import { BGGray, Black } from "@/styled/color";
import styled from "styled-components";

export const SkillWrapper = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 1280px;
`;

export const SkillRow = styled.div<{
    justifyContent?: string;
    alignItems?: string;
}>`
    display: flex;
    flex-direction: row;
    width: 100%;

    ${(props) => props.justifyContent && `justify-content: ${props.justifyContent};`}

    ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
`;

export const SkillHeader = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    color: white;
    background-color: ${Black};
    padding: 10px;
`;

export const SkillBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${BGGray};

    padding: 5px 0;
`;

export const SkillTableOuterSH = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, auto));
    width: 100%;

    @media screen and (max-width: 599px) {
        grid-template-columns: repeat(auto-fill, minmax(33%, auto));
    }
`;

export const SkillTableWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 620px;
`;

export const SkillTableWrapperSH = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
`;
