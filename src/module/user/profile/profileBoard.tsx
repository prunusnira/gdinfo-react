import CommonData from '@/module/common/commonData';
import React from 'react';

interface Props {
    id: string;
}

const ProfileBoard = (props: Props) => (
    <img
        alt="board"
        style={{ width: '100%', maxWidth: '360px' }}
        src={`${CommonData.dataUrl}board/${props.id}.png`}
        onError={(e: any) => {
            e.target.src = `${CommonData.jacketUrl}empty.jpg`;
            e.target.style = 'width:0;height:0;';
        }}
    />
);

export default ProfileBoard;
