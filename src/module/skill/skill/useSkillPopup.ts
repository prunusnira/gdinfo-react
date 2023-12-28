import { useState } from 'react';
import useMusicInfo from './useMusicInfo';
import usePatternInfo from './usePatternInfo';

const useSkillPopup = (userid?: string) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [mid, setMid] = useState(0);
    const { musicName, composer, version } = useMusicInfo(mid.toString());
    const { ptinfo } = usePatternInfo({ mid, userid });

    const openPopup = (id: number) => {
        setMid(id);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setMid(0);
        setPopupOpen(false);
    };

    return {
        popupOpen,
        ptinfo,
        openPopup,
        closePopup,

        mid,
        musicName,
        composer,
        version,
    };
};

export default useSkillPopup;
