import { BGGray, ContentBody, ContentBodyDark } from "@/styled/color";
import styled from "styled-components";

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

    padding: 10px;
`;

export const SkillBody = styled.div<{ dark: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    padding: 5px 0;

    background-color: ${(props) => (props.dark ? `${ContentBodyDark}` : `${ContentBody}`)};
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
