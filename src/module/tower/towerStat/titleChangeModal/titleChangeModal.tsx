import { ITowerTitle } from '@/data/tower/ITowerTitle';
import { atomLanguage } from '@/jotai/language';
import TxtTitleChangeModalEn from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-en';
import TxtTitleChangeModalJp from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-jp';
import TxtTitleChangeModalKo from '@/lang/tower/towerStat/titleChangeModal/txtTitleChangeModal-ko';
import { Button, Icon, ItemRow } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface Props {
    showTitleChangeModal: boolean,
    titleToBeChanged: ITowerTitle,
    setTitleChangeModal: (b: boolean) => void,
    changeTitle: (title: string) => void,
}

const TitleChangeModal = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const TxtTitleChangeModal =
        lang === 'ko' ? TxtTitleChangeModalKo :
            lang === 'jp' ? TxtTitleChangeModalJp : TxtTitleChangeModalEn;

    return (
        <Modal isOpen={props.showTitleChangeModal}>
            <ModalHeader style={{ backgroundColor: '#353535' }}>
                {TxtTitleChangeModal.title}
            </ModalHeader>
            <ModalBody>
                <ItemRow style={{ color: 'black' }}>
                    {TxtTitleChangeModal.body}
                </ItemRow>
                <ItemRow style={{ color: 'black' }}>
                    <Icon sizeType={'sm'}
                          src={`${process.env.PUBLIC_URL}/general-img/title/${props.titleToBeChanged.title}.png`} />
                    {props.titleToBeChanged.display}
                </ItemRow>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: '#dddddd' }}>
                <Button onClick={() => props.setTitleChangeModal(false)}>
                    Cancel
                </Button>
                <Button onClick={() => props.changeTitle(props.titleToBeChanged.title)}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TitleChangeModal;