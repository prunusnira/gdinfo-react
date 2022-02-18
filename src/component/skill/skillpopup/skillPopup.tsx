import MusicDataType from "@/component/pattern/music/musicData";
import { BGGray, Black } from "@/styled/color";
import { Button } from "@/styled/styledCommon";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SkillItemData from "../skill/skillItem/skillItemData";
import PopupMusicData from "./popupMusicData";
import { SkillPopupBody } from "./skillPopup.style";

type PopupProps = {
    popupOpen: boolean;
    skill: SkillItemData;
    pattern: Array<MusicDataType>;
    closePopup: () => void;

    musicName: string;
    composer: string;
    version: string;
};

const SkillPopup = (props: PopupProps) => {
    if (props.skill) {
        return (
            <Modal isOpen={props.popupOpen} size={"lg"}>
                <ModalHeader style={{ backgroundColor: Black }}>
                    {props.skill.musicTitle}
                </ModalHeader>
                <ModalBody style={{ backgroundColor: BGGray }}>
                    <PopupMusicData
                        mid={props.skill.mid.toString()}
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
    } else {
        return <></>;
    }
};

export default SkillPopup;
