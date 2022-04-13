import { Select, SelectDark, SkillBottomLine } from "@/styled/color";
import styled from "styled-components";

export const PRRow = styled.div<{ dark: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${SkillBottomLine};

    &:hover {
        background-color: ${(props) => (props.dark ? SelectDark : Select)};
    }
`;

export const PRSkillColor = styled.div`
    width: 10px;
    height: 100%;
    padding: 10px 0;
`;

export const PRColRank = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
`;

export const PRUserName = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const PRStatus = styled.div``;

export const PRRankImg = styled.img`
    width: 25px;
    height: 25px;

    @media screen and (max-width: 499px) {
        width: 20px;
        height: 20px;
    }
`;

export const PRStatusImg = styled.img`
    height: 25px;

    @media screen and (max-width: 499px) {
        height: 20px;
    }
`;

export const PRRate = styled.div`
    padding: 10px 5px;

    @media screen and (max-width: 499px) {
        font-size: 12px;
    }
`;

export const PRSkill = styled.div`
    padding: 10px 5px;

    @media screen and (max-width: 499px) {
        font-size: 12px;
    }
`;
