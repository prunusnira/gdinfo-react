import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, ItemRow } from "@/styled/styledCommon";
import store from "@/mobx/store";

import txtProfileKo from "@/lang/user/profile/txtProfile-ko";
import txtProfileJp from "@/lang/user/profile/txtProfile-jp";
import txtProfileEn from "@/lang/user/profile/txtProfile-en";

interface Props {
    isCountOpen: boolean;
    opencount: string;
    id: string;
    updateOpenValue: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    submitOpen: (id: string, open: string) => void;
    setCountDlgClose: () => void;
}

const ModalInfoOpen = (props: Props) => {
    const lang = store.language.lang;
    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;

    return (
        <Modal isOpen={props.isCountOpen}>
            <ModalHeader>{txtProfile.button.setdataopen}</ModalHeader>
            <ModalBody>
                <ItemRow>
                    <label id="opencntLabelYes" style={{ color: "black" }}>
                        {(function () {
                            if (props.opencount === "Y") {
                                return <input type="radio" name="opencount" value="Y" checked />;
                            } else {
                                return (
                                    <input
                                        type="radio"
                                        name="opencount"
                                        value="Y"
                                        onClick={props.updateOpenValue}
                                    />
                                );
                            }
                        })()}
                        &nbsp;
                        {txtProfile.dataopen.yes}
                    </label>
                </ItemRow>
                <ItemRow>
                    <label id="opencntLabelNo" style={{ color: "black" }}>
                        {(function () {
                            if (props.opencount === "N") {
                                return <input type="radio" name="opencount" value="N" checked />;
                            } else {
                                return (
                                    <input
                                        type="radio"
                                        name="opencount"
                                        value="N"
                                        onClick={props.updateOpenValue}
                                    />
                                );
                            }
                        })()}
                        &nbsp;
                        {txtProfile.dataopen.no}
                    </label>
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#dddddd" }}>
                <Button onClick={props.setCountDlgClose}>Cancel</Button>
                <Button onClick={() => props.submitOpen(props.id, props.opencount)}>Apply</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalInfoOpen;
