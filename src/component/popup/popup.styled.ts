import styled from 'styled-components';

export const PopupWrapper = styled.section<{
    $popupNum: number;
}>`
    position: fixed;
    z-index: 30;
    display: flex;
    top: 0;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    touch-action: none;
    -ms-touch-action: none;

    ${(props) => {
    if (props.$popupNum > 0) {
        // Wrapper가 전체 화면을 덮음
        return `
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, ${
            (props.$popupNum - 1) * 0.1 + 0.3
        });
            `;
    }
    return `
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: auto;
        `;
}}
`;