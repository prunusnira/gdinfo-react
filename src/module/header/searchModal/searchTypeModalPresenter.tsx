import React from "react";
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import store from "@/mobx/store";
import { Button } from "@/styled/styledCommon";

import TxtModalKo from "@/lang/header/searchmodal/txtmodal-ko";
import TxtModalJp from "@/lang/header/searchmodal/txtmodal-jp";
import TxtModalEn from "@/lang/header/searchmodal/txtmodal-en";
import { SearchType } from "../useSearch";

type SearchTypeProps = {
    isOpen: boolean;
    type: SearchType;
    changeType: (e: React.ChangeEvent<HTMLInputElement>) => void;
    cancel: () => void;
    ok: (type: SearchType) => void;
};

const SearchTypeModalPresenter = (props: SearchTypeProps) => {
    const lang = store.language.lang;

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
                                checked={props.type === SearchType.music ? true : false}
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
                                checked={props.type === SearchType.gskill ? true : false}
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
                                checked={props.type === SearchType.dskill ? true : false}
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
                                checked={props.type === SearchType.player ? true : false}
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
