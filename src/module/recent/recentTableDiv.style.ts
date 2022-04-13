import {
    AnchorColor,
    AnchorColorDark,
    SkillBGColor,
    SkillBottomLine,
    SkillTitleColor,
    White,
} from "@/styled/color";
import styled from "styled-components";

export const RecentUserRow = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid ${SkillBottomLine};
`;

export const UserNameCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

export const UserName = styled.div`
    font-size: 20px;
    color: ${SkillTitleColor};
    font-weight: bold;

    @media screen and (max-width: 499px) {
        font-size: 14px;
    }
`;

export const EmptyUser = styled.span<{ dark: boolean }>`
    font-size: 20px;
    color: ${(props) => (props.dark ? AnchorColorDark : AnchorColor)};
    font-weight: bold;
    cursor: not-allowed;

    @media screen and (max-width: 499px) {
        font-size: 14px;
    }
`;

export const UpdateTime = styled.div``;

export const UserSkillCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: ${SkillBGColor};
    color: ${White};
`;

export const RecentSkillRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const RecentSkillType = styled.span`
    text-align: center;
    padding: 3px 5px;
    width: 30px;
`;

export const RecentSkillCol = styled.span`
    text-align: right;
    padding: 3px 10px;
    width: 100px;
`;
