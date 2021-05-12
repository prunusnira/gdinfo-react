import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Button } from "../../../styled/styledCommon"
import txtProfile from "./txtprofile"

interface Props {
    lang: string,
    isCommentOpen: boolean,
    commentInput: React.RefObject<HTMLInputElement>
    id: string,
    submitComment: (id: string, comment: string) => void,
    closeComment: () => void,
}

const ModalComment = (props: Props) => {
    return (
        <Modal isOpen={props.isCommentOpen}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {(txtProfile.button.changecomment as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                <label style={{color:'black'}} htmlFor="newcomment">
                    {(txtProfile.changecomment.desc as any)[props.lang]}<br/>
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