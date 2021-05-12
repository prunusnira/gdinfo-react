import React, { useEffect, useState } from "react"
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import store from "../../../mobx/store"
import { Button } from "../../../styled/styledCommon"
import TxtModal from "./txtmodal"

interface Props {
    isOpen: boolean,
    currentType: string,
    cancel: () => void,
    ok: (type: string) => void,
}

const SearchTypeModal = (props: Props) => {
    const [type, setType] = useState(props.currentType)
    const lang = store.language.lang

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.currentTarget.value)
    }

    useEffect(() => {

    }, [type])

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader style={{backgroundColor: '#252525'}}>
                {(TxtModal.title as any)[lang]}
            </ModalHeader>
            <ModalBody style={{backgroundColor: '#414141', padding: '20px'}}>
                <FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_music' value='music'
                                checked={type === 'music' ? true : false}
                                onChange={changeType} />
                            {(TxtModal.music as any)[lang]}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_gskill' value='gskill'
                                checked={type === 'gskill' ? true : false}
                                onChange={changeType} />
                            {(TxtModal.gskill as any)[lang]}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_dskill' value='dskill'
                                checked={type === 'dskill' ? true : false}
                                onChange={changeType} />
                            {(TxtModal.dskill as any)[lang]}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_player' value='player'
                                checked={type === 'player' ? true : false}
                                onChange={changeType} />
                            {(TxtModal.player as any)[lang]}
                        </Label>
                    </FormGroup>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.cancel}>
                    Cancel
                </Button>
                <Button onClick={() => props.ok(type)}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SearchTypeModal