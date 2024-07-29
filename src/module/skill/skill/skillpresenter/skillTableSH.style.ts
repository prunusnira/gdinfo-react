import styled from "styled-components";
import {
    AnchorColor,
    AnchorColorDark,
    Black,
    Select,
    SelectDark,
    SkillBottomLine,
    White,
} from "@/styled/color";

export const SkillItemWrapper = styled.div<{ $dark: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid ${SkillBottomLine};

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
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    font-size: 14px;
    @media screen and (max-width: 499px) {
        font-size: 12px;
    }
`;

export const SkillInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const SkillJacketWrapper = styled.div`
    flex: 0 0 auto;

    width: 45px;
    height: 45px;
    @media screen and (max-width: 499px) {
        width: 30px;
        height: 30px;
    }
`;

export const SkillJacket = styled.img`
    width: 100%;
    height: 100%;
`;

export const SkillDataWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SkillDataCol = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const SkillDataRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 14px;
    @media screen and (max-width: 499px) {
        font-size: 10px;
    }
`;

export const SkillSubWrapper = styled.div`
    text-align: center;
`;

export const SkillPattern = styled.img`
    height: 20px;

    @media (max-width: 499px) {
        height: 10px;
    }
`;
export const SkillRank = styled.img`
    width: 25px;
    height: 25px;

    @media (max-width: 499px) {
        width: 15px;
        height: 15px;
    }
`;
export const SkillClear = styled.img`
    height: 25px;
    
    @media (max-width: 499px) {
        height: 15px;
    }
`;

export const SkillTitle = styled.div<{ $dark: boolean }>`
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    cursor: pointer;

    @media (max-width: 499px) {
        font-size: 10px;
    }
    
    ${(props) =>
            (props.$dark ? `color: ${AnchorColorDark};` : `color: ${AnchorColor};`)}
    }
`;

export const SkillValueWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const SkillRate = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    width: 100%;
    background-color: lightblue;
    color: ${Black};
    @media screen and (max-width: 499px) {
        font-size: 10px;
    }
`;

export const SkillValue = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    width: 100%;
    background-color: lightgreen;
    color: ${Black};
    @media screen and (max-width: 499px) {
        font-size: 10px;
    }
`;
