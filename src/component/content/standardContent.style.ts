import { BGGray, Black, ContentBody, ContentBodyDark, ContentTitle, White } from "@/styled/color";
import styled from "styled-components";

export const Wrapper = styled.section<{ isHalf?: boolean }>`
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    overflow: hidden;
    margin: 10px;
    border: 1px solid ${Black};

    width: 95%;
    min-height: 300px;

    ${(props) => (props.isHalf ? "max-width: 480px;" : "max-width: 1024px;")}

    -webkit-transform: width .75s ease-in;
    -moz-transform: width 0.75s ease-in;
    -ms-transform: width 0.75s ease-in;
    -o-transform: width 0.75s ease-in;
    transform: width 0.75s ease-in;
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
    flex: 1;
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
