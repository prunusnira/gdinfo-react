import React from "react"
import { SearchType } from "../useSearch"
import SearchTypeModalPresenter from "./searchTypeModalPresenter"
import useSearchType from "./useSearchType"

type Props = {
    isOpen: boolean,
    currentType: SearchType,
    cancel: () => void,
    ok: (type: SearchType) => void,
}

const SearchTypeModal = (props: Props) => {
    const [type, changeType] = useSearchType(props.currentType)

    return (
        <SearchTypeModalPresenter
            isOpen={props.isOpen}
            type={type}
            changeType={changeType}
            ok={props.ok}
            cancel={props.cancel}
        />
    )
}

export default SearchTypeModal