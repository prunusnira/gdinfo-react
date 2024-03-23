import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Button, ItemRow } from "@/styled/styledCommon"
import txtLoginKo from '@/lang/user/login/txtLogin-ko'
import txtLoginJp from '@/lang/user/login/txtLogin-jp'
import txtLoginEn from '@/lang/user/login/txtLogin-en'
import {useAtomValue} from "jotai";
import {atomLanguage} from "@/jotai/language";

interface Props {
    errorMsg: string,
    goBackToIndex: () => void
}

const LoginErrorModal = (props: Props) => {
    const lang = useAtomValue(atomLanguage)
    const txtLogin =
        lang === 'ko' ? txtLoginKo :
            lang === 'jp' ? txtLoginJp : txtLoginEn

    return (
        <Modal isOpen={true}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {txtLogin.loginErrorModal.title}
            </ModalHeader>
            <ModalBody style={{color: '#111111'}}>
                <ItemRow>
                    {txtLogin.loginErrorModal.body.p1}
                </ItemRow>
                <ItemRow>
                    {txtLogin.loginErrorModal.body.p2}
                </ItemRow>
                <ItemRow>
                    {txtLogin.loginErrorModal.body.p3}
                </ItemRow>
                <ItemRow>
                    {txtLogin.loginErrorModal.body.msg}:<br/>
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