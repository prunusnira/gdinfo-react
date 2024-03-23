import { ReactNode } from 'react';

export interface IPopup {
    id: string;
    props: {
        contents: ReactNode;
        buttonCount: 1 | 2 | 3;
        btnTxt1?: string;
        btnTxt2?: string;
        btnTxt3?: string;
        onClickBtn1?: () => void;
        onClickBtn2?: () => void;
        onClickBtn3?: () => void;
    };
}