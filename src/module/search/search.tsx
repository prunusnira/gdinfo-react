import React, {useState} from 'react'
import useUserSearch from './useUserSearch'
import useMusicSearch from './useMusicSearch'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import SearchPresenter from './searchPresenter'

interface MatchProps {
    type: string,
    page: string,
    value: string,
}

const SearchResult = observer(() =>  {
    const [allpage, setAllPage] = useState(0)
    const {type, page, value} = useParams<MatchProps>()
    const userlist = useUserSearch(type, page, value, setAllPage)
    const musiclist = useMusicSearch(type, page, value, setAllPage)

    return (
        <SearchPresenter
            userlist={userlist}
            musiclist={musiclist}
            type={type}
            page={page}
            value={value}
            allpage={allpage} />
    )
})

export default SearchResult