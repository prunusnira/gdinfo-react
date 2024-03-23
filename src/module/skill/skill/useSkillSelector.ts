import { useEffect, useState } from 'react';

// selector: ptype 0에서만 사용함
const useSkillSelector = (order?: string) => {
    // ptype 0에서 상단 필터 조절 시 url을 바꾸기 위해 사용되는 항목
    const [switchVerState, setSwitchVer] = useState(false);
    const [switchRankState, setSwitchRank] = useState(false);
    const [switchNameState, setSwitchName] = useState(false);
    const [switchOrderState, setSwitchOrder] = useState(false);

    const [nextVer, setNextVer] = useState('');
    const [nextRank, setNextRank] = useState('');
    const [nextName, setNextName] = useState('');
    const [nextOrder, setNextOrder] = useState('');

    const [menuVisible, setMenuVisible] = useState(false);

    // 스킬테이블 토글 메뉴 부르기
    const showTableMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const resetSwitch = () => {
        setSwitchVer(false);
        setSwitchRank(false);
        setSwitchName(false);
        setSwitchOrder(false);
    };

    const switchVer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchVer(true);
        setNextVer(e.currentTarget.value);
    };

    const switchRank = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchRank(true);
        setNextRank(e.target.value);
    };

    const switchName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchName(true);
        setNextName(e.target.value);
    };

    const switchOrder = (type: number) => {
        const currentOrder = order || 'titleasc';
        let next = currentOrder;
        if (type === 0) {
            if (currentOrder === 'titleasc') next = 'titledesc';
            else next = 'titleasc';
        }
        if (type === 1) {
            if (currentOrder === 'verasc') next = 'verdesc';
            else next = 'verasc';
        }

        setSwitchOrder(true);
        setNextOrder(next);
    };

    // URL이 변경되면 새로 useEffect를 호출하여 내용을 갱신
    // (react-router-dom을 위한 설정)
    useEffect(() => {
        // ptype 0에서 선택 스위치 리셋
        resetSwitch();
    }, [window.location.href]);

    return {
        menuVisible, showTableMenu,
        switchVerState, switchRankState, switchNameState, switchOrderState,
        nextVer, nextRank, nextName, nextOrder,
        switchVer, switchRank, switchName, switchOrder,
    };
};

export default useSkillSelector;