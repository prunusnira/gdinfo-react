import React, {Component} from 'react';
import CommonData from '../../Common/commonData';

interface Props {
    id: string
}

class ProfileBoard extends Component<Props> {
    render() {
        return (
            <img alt="board" style={{width:"100%", maxWidth: "360px"}}
                src={CommonData.dataUrl+"board/"+this.props.id+".png"}
                onError={(e: any) => {
                    e.target.src=CommonData.jacketUrl+'empty.jpg';
                }} />
        )
    }
}

export default ProfileBoard;