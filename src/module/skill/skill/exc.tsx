import CommonLayout from '@/component/layout/commonLayout';
import React from 'react'
import {Navigate, useParams} from 'react-router-dom'

const EXC = () => {
    const {gtype} = useParams();
    if(gtype) {
        return (
            <CommonLayout>
                <Navigate replace to={`/skill/1000/1/${gtype}/1/1`}/>
            </CommonLayout>
        )
    }
    return <>Invalid type value</>
}

export default EXC;