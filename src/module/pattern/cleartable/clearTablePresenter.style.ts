import { Black, Select } from "@/styled/color";
import styled from "styled-components";

export const ClearTableWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const TableHeader = styled.div`
    text-align: center;
    background-color: ${Select};
    border-bottom: 2px solid ${Black};
`;

export const TableText = styled.div`
    text-align: center;
`;
