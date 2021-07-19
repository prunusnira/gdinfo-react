import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Button } from "../../../styled/styledCommon"

import txtProfileKo from '../../../lang/user/profile/txtProfile-ko'
import txtProfileJp from '../../../lang/user/profile/txtProfile-jp'
import txtProfileEn from '../../../lang/user/profile/txtProfile-en'

interface Props {
    lang: string,
    isCommentOpen: boolean,
    commentInput: React.RefObject<HTMLInputElement>
    id: string,
    submitComment: (id: string, comment: string) => void,
    closeComment: () => void,
}

const ModalComment = (props: Props) => {
    const txtProfile =
        props.lang === 'ko' ? txtProfileKo :
            props.lang === 'jp' ? txtProfileJp : txtProfileEn

    return (
        <Modal isOpen={props.isCommentOpen}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {txtProfile.button.changecomment}
            </ModalHeader>
            <ModalBody>
                <label style={{color:'black'}} htmlFor="newcomment">
                    {txtProfile.changecomment.desc}<br/>
                </label>
                <input ref={props.commentInput}
                    className="form-control" type="text"
                    name="newcomment" id="commentInput" />
            </ModalBody>
            <ModalFooter style={{backgroundColor: '#dddddd'}}>
                <Button onClick={props.closeComment}>Cancel</Button>
                <Button onClick={() => props.submitComment(props.id, props.commentInput.current!.value)}>Apply</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalComment