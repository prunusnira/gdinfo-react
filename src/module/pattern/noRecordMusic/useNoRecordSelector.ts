import { useEffect, useState } from 'react';

const useNoRecordSelector = () => {
    const [lv, setLv] = useState(0);
    const [ver, setVer] = useState('00');
    const [switchLv, setSwitchLv] = useState(false);
    const [switchVer, setSwitchVer] = useState(false);
    const [switchHot, setSwitchHot] = useState(false);
    const [switchOther, setSwitchOther] = useState(false);
    const [switchClear, setSwitchClear] = useState(false);

    const resetSwitch = () => {
        setSwitchLv(false);
        setSwitchVer(false);
        setSwitchHot(false);
        setSwitchOther(false);
        setSwitchClear(false);
    };

    const switchLvMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '--') {
            setSwitchLv(true);
            setLv(parseInt(e.target.value, 10));
        }
    };

    const switchVerMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '--') {
            setSwitchVer(true);
            setVer(e.target.value);
        }
    };

    const switchHotMethod = () => {
        setSwitchHot(true);
    };

    const switchOtherMethod = () => {
        setSwitchOther(true);
    };

    const switchClearMethod = () => {
        setSwitchHot(false);
        setSwitchOther(false);
        setSwitchClear(false);
    };

    useEffect(() => {
        resetSwitch();
    }, [window.location.href]);

    return {
        lv, ver,
        switchLv, switchLvMethod,
        switchVer, switchVerMethod,
        switchHot, switchHotMethod,
        switchOther, switchOtherMethod,
        switchClear, switchClearMethod,
    };
};

export default useNoRecordSelector;