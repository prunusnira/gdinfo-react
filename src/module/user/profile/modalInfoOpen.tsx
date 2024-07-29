import React, { useEffect, useState } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button, ItemRow} from "@/styled/styledCommon";

import txtProfileKo from "@/lang/user/profile/txtProfile-ko";
import txtProfileJp from "@/lang/user/profile/txtProfile-jp";
import txtProfileEn from "@/lang/user/profile/txtProfile-en";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";

interface Props {
    isInfoDlgOpen: boolean;
    isInfoOpen: boolean;
    id: string;
    setSubmitData: ({id, open, submit}: {id: string, open: boolean, submit: boolean}) => void;
    setCountDlgClose: () => void;
}

const ModalInfoOpen = ({
    isInfoDlgOpen,
    isInfoOpen,
    id,
    setSubmitData,
    setCountDlgClose,
                       }: Props) => {
    const lang = useAtomValue(atomLanguage)
    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;
    const [infoOpen, setInfoOpen] = useState(isInfoOpen);

    useEffect(() => {
        alert(isInfoDlgOpen)
    }, [isInfoDlgOpen]);

    return (
        <Modal isOpen={isInfoDlgOpen}>
            <ModalHeader>{txtProfile.button.setdataopen}</ModalHeader>
            <ModalBody>
                <ItemRow>
                    <label id="opencntLabelYes" style={{color: "black"}}>
                        <input type="radio" name="opencount" value="Y"
                               checked={infoOpen}
                               onChange={() => {
                            setInfoOpen(true)
                        }} />
                        &nbsp;
                        {txtProfile.dataopen.yes}
                    </label>
                </ItemRow>
                <ItemRow>
                    <label id="opencntLabelNo" style={{ color: 'black' }}>
                        <input type="radio" name="opencount" value="N"
                               checked={!infoOpen}
                               onChange={() => {
                            setInfoOpen(false);
                        }} />
                        &nbsp;
                        {txtProfile.dataopen.no}
                    </label>
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: '#dddddd' }}>
                <Button onClick={setCountDlgClose}>Cancel</Button>
                <Button onClick={() => setSubmitData(
                    {id, open: infoOpen, submit: true},
                )}>Apply</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalInfoOpen;
