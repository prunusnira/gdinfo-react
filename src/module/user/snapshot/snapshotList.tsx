import React from 'react'
import { useParams } from 'react-router-dom'
import SnapshotListPresenter from './snapshotListPresenter'
import useSnapshotList from './useSnapshotList'

const SnapshotList = () => {
    const {id} = useParams()
    const {glist, dlist} = useSnapshotList(id)

    return (
        <SnapshotListPresenter
            id={id}
            glist={glist}
            dlist={dlist} />
    )
}

export default SnapshotList