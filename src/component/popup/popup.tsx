import ComponentPopup from '@/component/popup/componentPopup';
import { PopupWrapper } from '@/component/popup/popup.styled';
import { atomPopup } from '@/jotai/popup';
import { useAtom } from 'jotai';
import React from 'react';

const Popup = () => {
    const [
        popupList,
        setPopupList,
    ] = useAtom(atomPopup);

    return (
        <PopupWrapper $popupNum={popupList.length}>
            {
                popupList.map((x, i) => (
                    <ComponentPopup popup={x} />
                ))
            }
        </PopupWrapper>
    )
}

export default Popup;