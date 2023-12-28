import React from 'react'
import {Navigate, useParams} from 'react-router-dom'

const EXC = () => {
    const {gtype} = useParams();
    if(gtype) {
        return (
            <Navigate replace to={`/skill/1000/1/${gtype}/1/1`}/>
        )
    }
    return <>Invalid type value</>
}

export default EXC;