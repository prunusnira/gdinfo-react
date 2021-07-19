import React, { useEffect, useState } from "react"
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import store from "../../../mobx/store"
import { Button } from "../../../styled/styledCommon"
import TxtModalKo from "../../../lang/header/searchmodal/txtmodal-ko"
import TxtModalJp from "../../../lang/header/searchmodal/txtmodal-jp"
import TxtModalEn from "../../../lang/header/searchmodal/txtmodal-en"

interface Props {
    isOpen: boolean,
    currentType: string,
    cancel: () => void,
    ok: (type: string) => void,
}

const SearchTypeModal = (props: Props) => {
    const [type, setType] = useState(props.currentType)
    const lang = store.language.lang
    
    const TxtModal =
        lang === 'ko' ? TxtModalKo :
            lang === 'jp' ? TxtModalJp : TxtModalEn
    

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.currentTarget.value)
    }

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader style={{backgroundColor: '#252525'}}>
                {TxtModal.title}
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
                            {TxtModal.music}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_gskill' value='gskill'
                                checked={type === 'gskill' ? true : false}
                                onChange={changeType} />
                            {TxtModal.gskill}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_dskill' value='dskill'
                                checked={type === 'dskill' ? true : false}
                                onChange={changeType} />
                            {TxtModal.dskill}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input
                                type='radio' name='searchType'
                                id='searchradio_player' value='player'
                                checked={type === 'player' ? true : false}
                                onChange={changeType} />
                            {TxtModal.player}
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