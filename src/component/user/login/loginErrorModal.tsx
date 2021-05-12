import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Button, ItemRow } from "../../../styled/styledCommon"
import txtLogin from "./txtLogin"

interface Props {
    lang: string,
    errorMsg: string,
    goBackToIndex: () => void
}

const LoginErrorModal = (props: Props) => {
    return (
        <Modal isOpen={true}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {(txtLogin.loginErrorModal.title as any)[props.lang]}
            </ModalHeader>
            <ModalBody style={{color: '#111111'}}>
                <ItemRow>
                    {(txtLogin.loginErrorModal.body.p1 as any)[props.lang]}
                </ItemRow>
                <ItemRow>
                    {(txtLogin.loginErrorModal.body.p2 as any)[props.lang]}
                </ItemRow>
                <ItemRow>
                    {(txtLogin.loginErrorModal.body.p3 as any)[props.lang]}
                </ItemRow>
                <ItemRow>
                    {(txtLogin.loginErrorModal.body.msg as any)[props.lang]}:<br/>
                    {props.errorMsg}
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{backgroundColor: '#dddddd'}}>
                <Button onClick={props.goBackToIndex}>Go Back to Index Page</Button>
            </ModalFooter>
        </Modal>
    )
}

export default LoginErrorModal