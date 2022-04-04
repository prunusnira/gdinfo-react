import MusicDataType from "@/module/pattern/music/musicData";
import { BGGray, Black } from "@/styled/color";
import { Button } from "@/styled/styledCommon";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PopupMusicData from "./popupMusicData";

type PopupProps = {
    popupOpen: boolean;
    pattern: Array<MusicDataType>;
    closePopup: () => void;

    mid: number;
    musicName: string;
    composer: string;
    version: string;
};

const SkillPopup = (props: PopupProps) => {
    return (
        <Modal isOpen={props.popupOpen} size={"lg"}>
            <ModalHeader>{props.musicName}</ModalHeader>
            <ModalBody>
                <PopupMusicData
                    mid={props.mid.toString()}
                    musicName={props.musicName}
                    composer={props.composer}
                    version={props.version}
                    patternlist={props.pattern}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => props.closePopup()}>OK</Button>
            </ModalFooter>
        </Modal>
    );
};

export default SkillPopup;
