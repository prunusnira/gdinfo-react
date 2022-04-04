import { ButtonSM } from "@/styled/styledCommon";
import styled from "styled-components";

export const SearchBarSection = styled.div`
    display: flex;
    width: 100%;
`;

export const SearchBar = styled.input`
    flex: 1 0 auto;
    padding: 10px 5px;
    border-radius: 15px;
    width: 100%;
`;

export const SearchButton = styled(ButtonSM)`
    position: relative;
    right: 30px;
    border-radius: 45%;
    background-color: transparent;
    border: 0;
`;
