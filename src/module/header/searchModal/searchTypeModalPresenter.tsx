import React from "react";
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@/styled/styledCommon";
import TxtModalKo from "@/lang/header/searchmodal/txtmodal-ko";
import TxtModalJp from "@/lang/header/searchmodal/txtmodal-jp";
import TxtModalEn from "@/lang/header/searchmodal/txtmodal-en";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";
import {ESearchType} from "@/data/ESearchType";

interface Props {
    isOpen: boolean;
    type: ESearchType;
    changeType: (e: React.ChangeEvent<HTMLInputElement>) => void;
    cancel: () => void;
    ok: (type: ESearchType) => void;
}

const SearchTypeModalPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage)

    const TxtModal = lang === "ko" ? TxtModalKo : lang === "jp" ? TxtModalJp : TxtModalEn;

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>{TxtModal.title}</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type="radio"
                                name="searchType"
                                id="searchradio_music"
                                value="music"
                                checked={props.type === ESearchType.MUSIC}
                                onChange={props.changeType}
                            />
                            {TxtModal.music}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type="radio"
                                name="searchType"
                                id="searchradio_gskill"
                                value="gskill"
                                checked={props.type === ESearchType.GSKILL}
                                onChange={props.changeType}
                            />
                            {TxtModal.gskill}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type="radio"
                                name="searchType"
                                id="searchradio_dskill"
                                value="dskill"
                                checked={props.type === ESearchType.DSKILL}
                                onChange={props.changeType}
                            />
                            {TxtModal.dskill}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type="radio"
                                name="searchType"
                                id="searchradio_player"
                                value="player"
                                checked={props.type === ESearchType.PLAYER}
                                onChange={props.changeType}
                            />
                            {TxtModal.player}
                        </Label>
                    </FormGroup>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.cancel}>Cancel</Button>
                <Button onClick={() => props.ok(props.type)}>OK</Button>
            </ModalFooter>
        </Modal>
    );
};

export default SearchTypeModalPresenter;
