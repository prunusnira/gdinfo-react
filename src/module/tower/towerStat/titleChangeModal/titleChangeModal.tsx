import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Button, Icon, ItemRow } from '@/styled/styledCommon'
import TitleType from '../data/titleType'

import TxtTitleChangeModalKo from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-ko'
import TxtTitleChangeModalJp from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-jp'
import TxtTitleChangeModalEn from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-en'
import store from '@/mobx/store'

interface Props {
    showTitleChangeModal: boolean,
    titleToBeChanged: TitleType,
    setTitleChangeModal: (b: boolean) => void,
    changeTitle: (title: string) => void,
}

const TitleChangeModal = (props: Props) => {
	const lang = store.language.lang
    const TxtTitleChangeModal =
        lang === 'ko' ? TxtTitleChangeModalKo :
            lang === 'jp' ? TxtTitleChangeModalJp : TxtTitleChangeModalEn

    return (
        <Modal isOpen={props.showTitleChangeModal}>
            <ModalHeader style={{backgroundColor: '#353535'}}>
                {TxtTitleChangeModal.title}
            </ModalHeader>
            <ModalBody>
                <ItemRow style={{color:"black"}}>
                    {TxtTitleChangeModal.body}
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