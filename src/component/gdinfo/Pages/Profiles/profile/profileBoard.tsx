import React, {Component} from 'react';
import commonData from '../../Common/commonData';

interface Props {
    id: string
}

class ProfileBoard extends Component<Props> {
    render() {
        return (
            <img alt="board" style={{width:"100%", maxWidth: "360px"}}
                src={commonData.commonMainURL+"board/"+this.props.id+".png"}
                onError={(e: any) => {
                    e.target.src=commonData.commonImageURL+'music/empty.jpg';
                }} />
        )
    }
}

export default ProfileBoard;