import { MenuBack, Select } from "@/styled/color";
import styled from "styled-components";

export const SkillModalWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const SkillModalTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const SkillModalJacketWrapper = styled.div`
    width: 60px;
    height: 60px;
`;

export const SkillModalJacket = styled.img`
    width: 100%;
    height: 100%;
`;

export const SkillModalMusic = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
`;

export const ModalTitle = styled.div``;

export const ModalComposer = styled.div``;

export const ModalVersion = styled.div``;

export const SkillModalTapWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTapItem = styled.div<{ activate?: boolean }>`
    padding: 8px;
    border: 1px solid white;
    width: 100%;
    text-align: center;

    ${(props) =>
        props.activate ? `background-color: ${Select};` : `background-color: ${MenuBack};`}
`;

export const SkillModalItemWrapper = styled.div``;
