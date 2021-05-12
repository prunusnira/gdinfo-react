import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CommonData from '../common/commonData';
import RecentData from './recentData';
import { observer } from 'mobx-react';
import RecentPresenter from './recentPresenter';

const Recent = observer(() =>  {
    const [recentUserList, setUserList] = useState(Array<RecentData>())

    useEffect(() => {
        axios.post(`${CommonData.dataUrl}recent`)
        .then((resp) => {
            const data = resp.data
            const array = JSON.parse(data.recent)

            setUserList(array)
        });
    }, [])

    return (
        <RecentPresenter
            recentUserList={recentUserList} />
    )
})

export default Recent