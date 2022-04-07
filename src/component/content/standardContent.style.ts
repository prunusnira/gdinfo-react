import { BGGray, Black, ContentBody, ContentBodyDark, ContentTitle, White } from "@/styled/color";
import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    margin: 10px;
    border: 1px solid ${Black};
`;

export const Title = styled.section<{ dark: boolean }>`
    padding: 10px;
    font-size: 18px;
    font-weight: bold;

    ${(props) =>
        props.dark
            ? `background-color: ${BGGray};
color: ${White};`
            : `background-color: ${ContentTitle};
    color: ${Black};`}
`;

export const Body = styled.section<{ dark: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;

    ${(props) =>
        props.dark
            ? `background-color: ${ContentBodyDark};
color: ${White};`
            : `background-color: ${ContentBody};
color: ${Black};`}
`;
