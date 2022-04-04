import { useState } from "react"
import { SearchType } from "../useSearch"

type SearchTypeReturn = [SearchType, (e: React.ChangeEvent<HTMLInputElement>) => void]

const useSearchType = (searchType: SearchType): SearchTypeReturn => {
    const [type, setType] = useState(searchType)

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rtn = SearchType.music
        switch(e.currentTarget.value) {
            case 'music':
                rtn = SearchType.music
                break
            case 'gskill':
                rtn = SearchType.gskill
                break
            case 'dskill':
                rtn = SearchType.dskill
                break
            case 'player':
                rtn = SearchType.player
                break
        }
        setType(rtn)
    }

    return [type, changeType]
}

export default useSearchType