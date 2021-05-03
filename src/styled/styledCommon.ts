import styled from "styled-components";

export const ItemRow = styled.div`
    width: 100%;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }
`

// 사이즈는 10 기준으로 계산함
export const ItemCol = styled.div<{size: number}>`
    @media screen and (min-width: 1200px) {
        ${props => widthSize(props.size)}
    }
`

const widthSize = (size: number) => {
    return `width: ${size*10}%;`
}

export const Container = styled.div`
    max-width: 1200px;
`

export const BodyHeader = styled.div`
    width: 100%;
    background-color: #252525;
    color: white;
    font-weight: bold;
    padding: 10px;
`

export const BodyContent = styled.div`
    width: 100%;
    background-color: #414141;
    color: white;
    padding: 10px;
`

export const Button = styled.button`
    color: black;
    border: 1px solid black;
    background-color: grey;
`