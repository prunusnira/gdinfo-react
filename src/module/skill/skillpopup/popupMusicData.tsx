import { IMusic } from '@/data/music/IMusic';
import CommonData from '@/module/common/commonData';
import React, { useState } from 'react';
import {
    ModalComposer,
    ModalTapItem,
    ModalTitle,
    ModalVersion,
    SkillModalItemWrapper,
    SkillModalJacket,
    SkillModalJacketWrapper,
    SkillModalMusic,
    SkillModalTapWrapper,
    SkillModalTitle,
    SkillModalWrapper,
} from './popupMusicData.style';
import PopupMusicItem from './popupMusicItem';

interface Props {
    mid: string;
    musicName: string;
    composer: string;
    version: string;
    patternlist: Array<IMusic>;
}

const PopupMusicData = (props: Props) => {
    const [tab, setTab] = useState(0);
    return (
        <SkillModalWrapper>
            <SkillModalTitle>
                <SkillModalJacketWrapper>
                    <SkillModalJacket
                        alt="modal-jacket-img"
                        src={`${CommonData.jacketUrl}${props.mid}.jpg`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `${process.env.PUBLIC_URL}/general-img/empty.jpg`;
                        }}
                    />
                </SkillModalJacketWrapper>
                <SkillModalMusic>
                    <ModalTitle>{props.musicName}</ModalTitle>
                    <ModalComposer>{props.composer}</ModalComposer>
                    <ModalVersion>{props.version}</ModalVersion>
                </SkillModalMusic>
            </SkillModalTitle>
            <SkillModalTapWrapper>
                <ModalTapItem activate={tab === 0} onClick={() => setTab(0)}>
                    Guitar
                </ModalTapItem>
                <ModalTapItem activate={tab === 1} onClick={() => setTab(1)}>
                    Bass
                </ModalTapItem>
                <ModalTapItem activate={tab === 2} onClick={() => setTab(2)}>
                    Drum
                </ModalTapItem>
            </SkillModalTapWrapper>
            <SkillModalItemWrapper>
                <PopupMusicItem list={props.patternlist} type={tab} />
            </SkillModalItemWrapper>
        </SkillModalWrapper>
    );
};

export default PopupMusicData;
