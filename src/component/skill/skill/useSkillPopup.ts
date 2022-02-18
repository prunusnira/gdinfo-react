import useMusicInfo from "@/component/pattern/music/useMusicInfo";
import usePatternInfo from "@/component/pattern/music/usePatternInfo";
import { useState } from "react";
import SkillItemData, { emptySkillItem } from "./skillItem/skillItemData";

const useSkillPopup = (userid: string) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [mid, setMid] = useState(0);
    const [item, setItem] = useState<SkillItemData>(emptySkillItem);
    const [musicName, composer, version] = useMusicInfo(mid.toString());
    const patternlist = usePatternInfo(mid.toString(), userid);

    const openPopup = (item: SkillItemData) => {
        setMid(item.mid);
        setItem(item);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setMid(0);
        setItem(emptySkillItem);
        setPopupOpen(false);
    };

    return {
        popupOpen,
        musicItem: item,
        patternlist,
        openPopup,
        closePopup,

        musicName,
        composer,
        version,
    };
};

export default useSkillPopup;
