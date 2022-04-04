import useMusicInfo from "@/module/pattern/music/useMusicInfo";
import usePatternInfo from "@/module/pattern/music/usePatternInfo";
import { useState } from "react";

const useSkillPopup = (userid: string) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [mid, setMid] = useState(0);
    const [musicName, composer, version] = useMusicInfo(mid.toString());
    const patternlist = usePatternInfo(mid.toString(), userid);

    const openPopup = (mid: number) => {
        setMid(mid);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setMid(0);
        setPopupOpen(false);
    };

    return {
        popupOpen,
        patternlist,
        openPopup,
        closePopup,

        mid,
        musicName,
        composer,
        version,
    };
};

export default useSkillPopup;
