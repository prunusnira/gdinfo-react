import { Black, SkillBGColor, White } from "@/styled/color";
import { Button } from "@/styled/styledCommon";
import styled from "styled-components";

export const ProfileWrapper = styled.article`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const UITitle = styled.div`
    width: 100%;
    text-align: center;
`;

export const UIName = styled.div`
    width: 100%;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    gap: 16px;

    @media screen and (max-width: 499px) {
        font-size: 14px;
    }
`;

export const UIComment = styled.div`
    width: 100%;
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
`;

export const UISkillWrapper = styled.div<{ $show?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;

    ${(props) => !props.$show && `display: none;`}
`;

export const UISkill = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    color: ${White};
    background-color: ${SkillBGColor};
`;

export const UISkillTitle = styled.div`
    width: 100%;
    text-align: center;
`;

export const UISkillMore = styled.div`
    width: 100%;
    text-align: center;
`;

export const UISkillBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const UISkillBoxVer = styled.div`
    padding: 5px;
`;
export const UISkillBoxVal = styled.div`
    padding: 5px;
`;

export const GraphWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    padding: 30px;
`;

export const GraphRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const GraphType = styled.div`
    width: 30px;
`;

export const ProfileDetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    max-width: 800px;
`;

export const DetailGridVal = styled.div`
    border-bottom: 1px solid ${Black};
    padding: 10px;
`;

export const PlaycountDesc = styled.div`
    white-space: pre-line;
    padding: 10px 0 20px 0;
`;

export const ButtonFlex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 620px;
`;

export const ProfButton = styled(Button)`
    padding: 10px;
    margin: 10px;
`;
