import { BGGray, SeaBlue, White } from "@/styled/color";
import styled, { keyframes } from "styled-components";

export const ToggleSwitchWrapper = styled.div`
    position: relative;
    width: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ToggleChkBox = styled.input`
    display: none;
`;

export const ToggleLabel = styled.label<{ $isChecked: boolean }>`
    position: relative;
    width: 100%;
    height: 14px;
    border-radius: 50px;
    cursor: pointer;
    ${(props) =>
        props.$isChecked ? `background-color: ${SeaBlue};` : `background-color: ${BGGray};`}
`;

const setActive = keyframes`
  from {
    transform: translate(0%, -50%);
  }
  to {
    transform: translate(100%, -50%);
  }
`;

const setInActive = keyframes`
from {
    transform: translate(100%, -50%);
  }
  to {
    transform: translate(0%, -50%);
  }
`;

export const ToggleSpan = styled.span<{ $isChecked: boolean }>`
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px rgba(0, 0, 0, 0.15);
    background-color: ${White};
    top: 50%;
    animation-name: ${(props) => (props.$isChecked ? setActive : setInActive)};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;
