import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {AnchorColor, AnchorColorDark, Black, ButtonBG} from './color';

export const Anchor = styled.a<{ $dark: boolean }>`
    ${(props) => (props.$dark ? `color: ${AnchorColorDark};` : `color: ${AnchorColor};`)}
    cursor: pointer;
`;

export const ThemedLink = styled(Link)<{ $dark: boolean }>`
    ${(props) => 
        props.$dark ? `color: ${AnchorColorDark} !important;` : `color: ${AnchorColor} !important;`}
`;

export const Button = styled.button`
    color: ${Black};
    border-radius: 6px;
    background-color: ${ButtonBG};
    padding: 10px;
    margin: 3px;
    border: none;
    box-shadow: 1px 1px;
`;

// 아이템에 대한 기본값을 설정하는 메소드
type DefaultStyle<T, K> = T & { defaultProps: K };

function defaultStyle<T, K>(component: T, defaultProps: K): DefaultStyle<T, K> {
    const com = component;
    (com as DefaultStyle<T, K>).defaultProps = defaultProps;
    return com as DefaultStyle<T, K>;
}

// keepDirHor: 줄어들어도 여전히 horizontal을 유지
const ItemRowBase = styled.div<{ keepDirHor?: boolean; setVertical?: boolean }>`
    width: 100%;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-wrap: wrap;

    ${(props) =>
            props.keepDirHor
                    ? ``
                    : `@media screen and (max-width: 1199px) {
        flex-direction: column;
    }`}

    ${(props) => (props.setVertical ? `flex-direction: column;` : ``)}
`;

export const ItemRow = defaultStyle(ItemRowBase, {keepDirHor: false, setVertical: false});

const widthSize = (size: number) => `width: ${size * 10}%;`;

// 사이즈는 10 기준으로 계산함
const ItemColBase = styled.div<{ size?: number; isFlatUnderLg?: boolean }>`
    ${(props) =>
            props.isFlatUnderLg ? `
    @media screen and (max-width: 1199px) {
        width: 100%;
    }
    @media screen and (min-width: 1200px) {
        ${widthSize(props.size || 10)}
    }
    `
                    : `${widthSize(props.size || 10)}`}
`;

export const ItemCol = defaultStyle(ItemColBase, {size: 10, isFlatUnderLg: false});

const iconSize = (sizeType: string) => {
    let rtn;
    switch (sizeType) {
        case 'lg':
            rtn = `width: 50px;
            height: 50px;`;
            break;
        case 'sm':
        default:
            rtn = `width: 35px;
            height: 35px;`;
            break;
    }
    return rtn;
};

const IconBase = styled.img<{ $sizeType: string }>`
    ${(props) => `${iconSize(props.$sizeType)}`}
`;

export const Icon = defaultStyle(IconBase, {$sizeType: 'sm'});
