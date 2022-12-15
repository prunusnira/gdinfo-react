import styled from "styled-components";

export const DiffBox = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
`;

export const DiffWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const DiffJacket = styled.img`
    width: 75px;
    height: 75px;
`;

export const DiffRowWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DiffTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const DiffRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const DiffCell = styled.div<{ color?: string }>`
    padding: 0 10px;

    ${(props) => props.color && `color: ${props.color}; font-weight: bold;`}
`;

export const DiffImg = styled.img`
    width: 75px;
    height: 100%;
`;
