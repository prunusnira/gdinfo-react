import { Black, White } from "@/styled/color";
import styled from "styled-components";

export const SearchBarSection = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`;

export const SearchBar = styled.input`
    flex: 1 0 auto;
    padding: 10px 5px;
    border-radius: 15px;
    width: 100%;
`;

export const SearchButton = styled.button`
    position: absolute;
    height: 48px;
    right: 20px;
    background-color: transparent;
    border: 0;
`;

export const SearchTypeButton = styled.button<{ dark: boolean }>`
    width: 100%;
    border-radius: 15px;
    font-weight: bold;

    ${(props) =>
        props.dark
            ? `
    border: solid 1px ${White};
    color: ${White};
    background-color: transparent;`
            : `
    border: solid 1px ${Black};
    color: ${Black};
    background-color: transparent;`}
`;
