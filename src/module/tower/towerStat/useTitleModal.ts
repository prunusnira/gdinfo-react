import { setTowerTitle } from '@/api/updateTowerData';
import { ITowerTitle } from '@/data/tower/ITowerTitle';
import { atomLanguage } from '@/jotai/language';
import { atomLoginUser } from '@/jotai/loginUser';
import txtTowerEn from '@/lang/tower/txtTower-en';
import txtTowerJp from '@/lang/tower/txtTower-jp';
import txtTowerKo from '@/lang/tower/txtTower-ko';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

const useTitleModal = () => {
    const [showTitleChangeModal, setTitleChangeModal] = useState(false);
    const [titleToBeChanged, setTitleToBeChanged] = useState<ITowerTitle>({ type: 0, title: '', display: '' });

    const lang = useAtomValue(atomLanguage);
    const loginUser = useAtomValue(atomLoginUser);

    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn;

    const changeTitle = (title: string) => {
        if (loginUser) {
            setTowerTitle(loginUser.id, title)
                .then(() => {
                    alert(txtTower.title.changed);
                    setTitleChangeModal(false);
                });
        }
    };

    return {
        showTitleChangeModal, titleToBeChanged,
        setTitleChangeModal, setTitleToBeChanged, changeTitle,
    };
};

export default useTitleModal;