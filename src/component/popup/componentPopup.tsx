import usePopup from '@/component/popup/usePopup';
import { IPopup } from '@/data/common/IPopup';
import { Button } from '@/styled/styledCommon';
import React from "react";
import style from './componentPopup.module.scss';

interface Props {
    popup: IPopup;
}

const ComponentPopup = ({popup}: Props) => {
    const {closePopup} = usePopup();

    return (
        <section className={style.wrapper}>
            <div className={style.title}>
                {popup.props.title}
            </div>
            <div className={style.content}>
                {popup.props.contents}
            </div>
            <div className={style.bottom}>
                {
                    <Button
                        onClick={() => {
                            if(popup.props.onClickBtn1) {
                                popup.props.onClickBtn1()
                            }
                            closePopup(popup.id);
                        }}
                    >
                        {popup.props.btnTxt1 || 'OK'}
                    </Button>
                }
                {
                    <Button
                        onClick={() => {
                            if(popup.props.onClickBtn2) {
                                popup.props.onClickBtn2()
                            }
                            closePopup(popup.id);
                        }}
                    >
                        {popup.props.btnTxt2 || 'Cancel'}
                    </Button>
                }
                {
                    <Button
                        onClick={() => {
                            if(popup.props.onClickBtn3) {
                                popup.props.onClickBtn3()
                            }
                        }}
                    >
                        {popup.props.btnTxt3 || 'Neutral'}
                    </Button>
                }
            </div>
        </section>
    )
}

export default ComponentPopup;