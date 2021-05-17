import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Button, Icon, ItemRow } from '../../../../styled/styledCommon'
import TitleType from '../data/titleType'
import TxtTitleChangeModal from './txTitleChangeModal'

interface Props {
    lang: string,
    showTitleChangeModal: boolean,
    titleToBeChanged: TitleType,
    setTitleChangeModal: (b: boolean) => void,
    changeTitle: (title: string) => void,
}

const TitleChangeModal = (props: Props) => {
    return (
        <Modal isOpen={props.showTitleChangeModal}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {(TxtTitleChangeModal.title as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                <ItemRow style={{color:"black"}}>
                    {(TxtTitleChangeModal.body as any)[props.lang]}
                </ItemRow>
                <ItemRow style={{color:"black"}}>
                    <Icon src={`${process.env.PUBLIC_URL}/general-img/title/${props.titleToBeChanged.title}.png`} />
                    {props.titleToBeChanged.display}
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{backgroundColor: '#dddddd'}}>
                <Button onClick={() => props.setTitleChangeModal(false)}>
                    Cancel
                </Button>
                <Button onClick={() => props.changeTitle(props.titleToBeChanged.title)}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default TitleChangeModal