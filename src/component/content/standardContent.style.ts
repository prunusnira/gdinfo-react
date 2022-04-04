import { Black, ContentBody, ContentTitle, White } from "@/styled/color";
import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    margin: 10px;
`;

export const Title = styled.section`
    background-color: ${ContentTitle};
    padding: 10px;
`;

export const Body = styled.section`
    background-color: ${ContentBody};
    padding: 10px;
`;
