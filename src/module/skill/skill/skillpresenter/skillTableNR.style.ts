import styled from "styled-components";
import {
    AnchorColor,
    AnchorColorDark,
    Select,
    SelectDark,
    SkillBottomLine,
    White,
} from "@/styled/color";

export const SkillItemWrapper = styled.div<{ $dark: boolean }>`
    display: flex;
    flex-direction: row;

    width: 100%;
    max-width: 620px;
    padding: 5px 10px;

    border-bottom: 2px solid ${SkillBottomLine};

    &:hover {
        background-color: ${(props) => (props.$dark ? SelectDark : Select)};
    }
`;

export const SkillItemNumber = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${White};
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;

    width: 30px;
    font-size: 14px;
    @media screen and (max-width: 499px) {
        width: 20px;
        font-size: 12px;
    }
`;

export const SkillJacketWrapper = styled.div`
    flex: 0 0 auto;

    width: 61px;
    height: 61px;
    @media screen and (max-width: 499px) {
        width: 47.5px;
        height: 47.5px;
    }
`;

export const SkillJacket = styled.img`
    width: 100%;
    height: 100%;
`;

export const SkillDataWrapper = styled.div`
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SkillDataRow = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SkillSubData = styled.div`
    display: flex;
    flex-direction: row;

    font-size: 14px;
    @media screen and (max-width: 499px) {
        font-size: 10px;
    }
`;

export const SkillSubWrapper = styled.div<{rank?: boolean}>`
    width: 50px;
    @media screen and (max-width: 499px) {
        width: 35px;
    }

    ${props => props.rank ? `
        width: 30px;
        @media screen and (max-width: 499px) {
            width: 15px;
        }
    `:``}
`;

export const SkillPattern = styled.img`
    height: 18px;
    @media screen and (max-width: 499px) {
        height: 13px;
    }
`;
export const SkillRank = styled.img`
    width: 18px;
    height: 18px;
    @media screen and (max-width: 499px) {
        width: 13px;
        height: 13px;
    }
`;
export const SkillClear = styled.img`
    height: 18px;
    @media screen and (max-width: 499px) {
        height: 13px;
    }
`;

export const SkillTitle = styled.div<{ $dark: boolean }>`
    font-size: 18px;
    @media screen and (max-width: 499px) {
        font-size: 15px;
    }

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    ${(props) => (props.$dark ? `color: ${AnchorColorDark};` : `color: ${AnchorColor};`)}
`;

export const SkillValueWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const SkillRate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 15px;
    @media screen and (max-width: 499px) {
        font-size: 10px;
    }
`;

export const SkillValue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    @media screen and (max-width: 499px) {
        font-size: 12px;
    }
`;
