import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Button, ItemRow } from "../../../styled/styledCommon"
import txtProfile from "./txtprofile"

interface Props {
    lang: string,
    isCountOpen: boolean,
    opencount: string,
    id: string,
    updateOpenValue: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
    submitOpen: (id: string, open: string) => void,
    setCountDlgClose: () => void,
}

const ModalInfoOpen = (props: Props) => {
    return (
        <Modal isOpen={props.isCountOpen}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {(txtProfile.button.setdataopen as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                <ItemRow>
                    <label id="opencntLabelYes" style={{color:"black"}}>
                        {(function() {
                            if(props.opencount === "Y") {
                                return <input type='radio' name='opencount' value='Y' checked />
                            }
                            else {
                                return <input type='radio' name='opencount' value='Y'
                                    onClick={props.updateOpenValue} />
                            }
                        })()}&nbsp;
                        {(txtProfile.dataopen.yes as any)[props.lang]}
                    </label>
                </ItemRow>
                <ItemRow>
                    <label id="opencntLabelNo" style={{color:"black"}}>
                        {(function() {
                            if(props.opencount === "N") {
                                return <input type='radio' name='opencount' value='N' checked />
                            }
                            else {
                                return <input type='radio' name='opencount' value='N'
                                    onClick={props.updateOpenValue} />
                            }
                        })()}&nbsp;
                        {(txtProfile.dataopen.no as any)[props.lang]}
                    </label>
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{backgroundColor: '#dddddd'}}>
                <Button onClick={props.setCountDlgClose}>Cancel</Button>
                <Button onClick={() => props.submitOpen(props.id, props.opencount)}>Apply</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalInfoOpen