import styled from "styled-components";

export const NoticeItemWrapper = styled.div`
    width: 100%;
    padding: 0 10px;
`;

export const ItemTop = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ItemNum = styled.div`
    width: 35px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
`;

export const ItemTitle = styled.div`
    flex: 1;
    font-weight: bold;
    font-size: 20px;
`;

export const ItemDate = styled.div`
    width: 150px;
`;

export const ItemContent = styled.div<{ open: boolean }>`
    ${(props) =>
        props.open
            ? `visibility: visible;
                height: auto;`
            : `visibility: hidden;
                height: 0;`}
    padding: 10px 25px;
    white-space: pre-line;
    border: solid 1px white;
    border-radius: 10px;
`;
