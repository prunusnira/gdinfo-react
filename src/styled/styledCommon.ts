import styled from "styled-components";

// 아이템에 대한 기본값을 설정하는 메소드
type DefaultStyle<T, K> = T & { defaultProps: K }

function defaultStyle<T, K>(component: T, defaultProps: K): DefaultStyle<T, K> {
    (component as DefaultStyle<T, K>).defaultProps = defaultProps
    return component as DefaultStyle<T, K>
}

// keepDirHor: 줄어들어도 여전히 horizontal을 유지
const ItemRowBase = styled.div<{keepDirHor: boolean, setVertical: boolean}>`
    width: 100%;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-wrap: wrap;

    ${props => props.keepDirHor?
        ``
        :
        `@media screen and (max-width: 1199px) {
            flex-direction: column;
        }`
    }

    ${props => props.setVertical ?
        `flex-direction: column;`
        :
        ``
    }
`

export const ItemRow = defaultStyle(ItemRowBase, {keepDirHor: false, setVertical: false})

// 사이즈는 10 기준으로 계산함
const ItemColBase = styled.div<{size: number, isFlatUnderLg: boolean}>`
    ${props => props.isFlatUnderLg ?
        `
        @media screen and (max-width: 1199px) {
            width: 100%;
        }
        @media screen and (min-width: 1200px) {
            ${widthSize(props.size)}
        }
        `
        :
        `${widthSize(props.size)}`
    }   
`

export const ItemCol = defaultStyle(ItemColBase, { size: 10, isFlatUnderLg: false })

const widthSize = (size: number) => {
    return `width: ${size*10}%;`
}

export const Container = styled.div`
    max-width: 1200px;
    width: 100%;
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
    background-color: #dddddd;
    padding: 10px;
`

export const ButtonSM = styled.button`
    color: black;
    border: 1px solid black;
    background-color: #dddddd;
`

const IconBase = styled.img<{sizeType: string}>`
    ${props => `${iconSize(props.sizeType)}`}
`

const iconSize = (sizeType: string) => {
    let rtn = ''
    switch(sizeType) {
        case 'lg':
            rtn = `width: 50px;
            height: 50px;`
            break
        case 'sm':
        default:
            rtn = `width: 35px;
            height: 35px;`
            break
    }
    return rtn
}

export const Icon = defaultStyle(IconBase, {sizeType: 'sm'})