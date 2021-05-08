import React from 'react';
import CommonData from '../../Common/commonData';

interface Props {
    id: string,
    visibleLg: boolean
}

const ProfileBoard = (props: Props) => {
    const checkLg = () => {
        if(props.visibleLg === true) {
            return 'visible-lg'
        }
        else {
            return 'visible-underlg'
        }
    }

    return (
        <img alt="board" style={{width:"100%", maxWidth: "360px"}} className={checkLg()}
            src={`${CommonData.dataUrl}board/${props.id}.png`}
            onError={(e: any) => {
                e.target.src=`${CommonData.jacketUrl}empty.jpg`;
            }} />
    )
}

export default ProfileBoard;