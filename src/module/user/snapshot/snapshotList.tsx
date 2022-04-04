import React from 'react'
import { useParams } from 'react-router-dom'
import SnapshotListPresenter from './snapshotListPresenter'
import useSnapshotList from './useSnapshotList'

interface MatchProps {
    id: string
}

const SnapshotList = () => {
    const {id} = useParams<MatchProps>()
    const [glist, dlist] = useSnapshotList(id)

    return (
        <SnapshotListPresenter
            id={id}
            glist={glist}
            dlist={dlist} />
    )
}

export default SnapshotList