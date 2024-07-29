import { IPopup } from '@/data/common/IPopup';
import { atomPopup } from '@/jotai/popup';
import { randomId } from '@/lib/randomId';
import { useAtom } from 'jotai';

const usePopup = () => {
    const [
        popupList,
        setPopupList,
    ] = useAtom(atomPopup);

    const openPopup = (popup: Omit<IPopup, 'id'>, customId?: string) => {
        const newPopup: IPopup = {
            ...popup,
            id: customId || randomId(),
        };
        setPopupList([
            ...popupList,
            newPopup,
        ]);
    }

    const closePopup = (id: string) => {
        setPopupList(popupList.filter(x => x.id !== id));
    }

    return {
        openPopup,
        closePopup,
    }
}

export default usePopup;