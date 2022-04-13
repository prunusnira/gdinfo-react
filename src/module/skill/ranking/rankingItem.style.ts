import { Select, SelectDark, SkillBGColor } from "@/styled/color";
import styled from "styled-components";

export const SRItemWrapper = styled.section<{ dark: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;

    &:hover {
        background-color: ${(props) => (props.dark ? SelectDark : Select)};
    }
`;

export const SRNum = styled.div`
    width: 40px;
    text-align: center;
`;

export const SRInfoWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SRUser = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 499px) {
        font-size: 16px;
    }
`;

export const SRIcon = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 5px;

    @media screen and (max-width: 499px) {
        width: 30px;
        height: 30px;
    }
`;

export const SRUpdate = styled.div``;

export const SRSkillWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${SkillBGColor};
`;
export const SRSkillRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SRSkillType = styled.div`
    text-align: center;
    padding: 3px 5px;
    width: 30px;
`;

export const SRSkillVal = styled.div`
    text-align: right;
    padding: 3px 10px;
    width: 100px;
`;
