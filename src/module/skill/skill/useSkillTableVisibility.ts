import { useEffect, useState } from 'react';

const useSkillTableVisibility = (ptype?: string) => {
    const [visibleLarge, setVisibleLarge] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    // ptype에 따른 스킬표 visibility 설정
    const setSkillTableVisibility = () => {
        if (ptype) {
            switch (parseInt(ptype, 10)) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                case 13:
                    setVisibleLarge(true);
                    setVisibleLeft(false);
                    setVisibleRight(false);
                    break;
                case 2:
                case 4:
                case 6:
                case 8:
                case 10:
                case 12:
                case 14:
                case 1000:
                    setVisibleLarge(false);
                    setVisibleLeft(true);
                    setVisibleRight(true);
                    break;
                default:
                    break;
            }
        }
    };

    // URL이 변경되면 새로 useEffect를 호출하여 내용을 갱신
    // (react-router-dom을 위한 설정)
    useEffect(() => {
        // 스킬표 visibility 설정
        setSkillTableVisibility();
    }, [window.location.href]);

    return [visibleLarge, visibleLeft, visibleRight];
};

export default useSkillTableVisibility;
