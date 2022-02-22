import { BGGray, Black } from "@/styled/color";
import { Button } from "@/styled/styledCommon";
import styled from "styled-components";

export const ProfileContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
`;

export const ProfileUserInfoWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    background-color: ${BGGray};
`;

export const ProfileUserInfo = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 620px;
`;

export const ProfileTitle = styled.div`
    background-color: ${Black};
    padding: 10px;
    width: 100%;
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

export const UISkillWrapper = styled.div<{ show?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;

    ${(props) => !props.show && `display: none;`}
`;

export const UISkill = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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

export const ProfileGraphWrapper = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 800px;
    padding: 30px;
`;

export const ProfileDetailWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${BGGray};
`;

export const ProfileDetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    max-width: 800px;
`;

export const DetailGridVal = styled.div`
    border-bottom: 1px solid white;
    padding: 10px;
`;

export const PlaycountDesc = styled.div`
    white-space: pre-line;
    padding: 10px 0 20px 0;
`;

export const ProfileButtonWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${BGGray};
    width: 100%;
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
