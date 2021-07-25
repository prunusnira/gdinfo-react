import React from 'react'
import {Redirect, useParams} from 'react-router-dom'

interface MatchProps {
    gtype: string
}

const EXC = () => {
    const {gtype} = useParams<MatchProps>()
    return (
        <Redirect to={"/skill/1000/1/"+gtype+"/1/1"} />
    )
}

export default EXC;