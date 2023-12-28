import { useEffect, useState } from 'react';

interface Props {
    order?: string,
    ver?: string,
    page?: string
}

const usePatternSelector = ({
                                order,
                                ver,
                                page,
                            }: Props) => {
    const [switchHot, setSwitchHot] = useState(false);
    const [switchOther, setSwitchOther] = useState(false);
    const [switchVer, setSwitchVer] = useState(false);
    const [switchOrder, setSwitchOrder] = useState(false);

    const [nextVer, setNextVer] = useState('');
    const [nextOrder, setNextOrder] = useState('');

    const resetSwitch = () => {
        setSwitchHot(false);
        setSwitchOther(false);
        setSwitchVer(false);
        setSwitchOrder(false);
        setNextVer('');
        setNextOrder('');
    };

    /* Switch */
    const switchHotMethod = () => {
        setSwitchHot(true);
    };

    const switchOtherMethod = () => {
        setSwitchOther(true);
    };

    const switchVerMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '--') {
            setSwitchVer(true);
            setNextVer(e.target.value);
        }
    };

    const switchOrderMethod = (type: number) => {
        if (order && ver && page) {
            const currentOrder = order;
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
            setNextVer(ver);
            setNextOrder(next);
        }
    };

    useEffect(() => {
        if (order && ver && page) {
            resetSwitch();
        }
    }, [order, ver, page, window.location.search]);

    return {
        switchHot, switchHotMethod,
        switchOther, switchOtherMethod,
        switchVer, switchVerMethod,
        switchOrder, switchOrderMethod,
        nextVer, nextOrder,
    };
};

export default usePatternSelector;