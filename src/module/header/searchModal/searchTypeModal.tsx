import { ESearchType } from '@/data/ESearchType';
import React from 'react';
import SearchTypeModalPresenter from './searchTypeModalPresenter';
import useSearchType from './useSearchType';

interface Props {
    isOpen: boolean,
    currentType: ESearchType,
    cancel: () => void,
    ok: (type: ESearchType) => void,
}

const SearchTypeModal = (props: Props) => {
    const { type, changeType } = useSearchType(props.currentType);

    return (
        <SearchTypeModalPresenter
            isOpen={props.isOpen}
            type={type}
            changeType={changeType}
            ok={props.ok}
            cancel={props.cancel}
        />
    );
};

export default SearchTypeModal;