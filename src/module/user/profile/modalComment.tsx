import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@/styled/styledCommon";
import store from "@/mobx/store";

import txtProfileKo from "@/lang/user/profile/txtProfile-ko";
import txtProfileJp from "@/lang/user/profile/txtProfile-jp";
import txtProfileEn from "@/lang/user/profile/txtProfile-en";

interface Props {
    isCommentOpen: boolean;
    id: string;
    submitComment: () => void;
    closeComment: () => void;
    setNextComment: (s: string) => void;
}

const ModalComment = (props: Props) => {
    const lang = store.language.lang;
    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;

    return (
        <Modal isOpen={props.isCommentOpen}>
            <ModalHeader>{txtProfile.button.changecomment}</ModalHeader>
            <ModalBody>
                <label style={{ color: "black" }} htmlFor="newcomment">
                    {txtProfile.changecomment.desc}
                    <br />
                </label>
                <input
                    className="form-control"
                    type="text"
                    name="newcomment"
                    id="commentInput"
                    onChange={(e) => props.setNextComment(e.currentTarget.value)}
                />
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#dddddd" }}>
                <Button onClick={props.closeComment}>Cancel</Button>
                <Button onClick={() => props.submitComment()}>Apply</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalComment;
