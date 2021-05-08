import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import txtProfile from './txtprofile';

import CommonData from '../../Common/commonData';
import store from '../../../../../mobx/store';
import { observer } from 'mobx-react';
import { Button, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface Props {
    isOwnAccount: boolean,
    id: string
}

const ProfileButton = observer((props: Props) => {
    const lang = store.language.lang

    const towerUpdate = () => {
		if(window.confirm((txtProfile.towerupdate.alert as any)[lang])) {
			axios.post(`${CommonData.dataUrl}profile/towerupdate/${props.id}`)
			.then((res) => {
				alert((txtProfile.towerupdate.done as any)[lang]);
			});
		}
    }

    if(props.isOwnAccount) {
        return (
            <>
                <ItemRow>
                    <ItemCol size={5} isFlatUnderLg={true}>
                        <Link to={`/mybest/${props.id}`}>
                            <Button style={{width:"100%"}}>
                                {(txtProfile.button.mybest as any)[lang]}
                            </Button>
                        </Link>
                        <Link to={`/cleartable/${props.id}`}>
                            <Button style={{width:"100%"}}>
                                {(txtProfile.button.clearRankTable as any)[lang]}
                            </Button>
                        </Link>
                    </ItemCol>
                    <ItemCol size={5} isFlatUnderLg={true}>
                        <Button style={{width:"100%"}} onClick={towerUpdate}>
                            {(txtProfile.button.towerupdate as any)[lang]}
                        </Button>
                        <Link to={`/profile/towerstatus/${props.id}`}>
                            <Button style={{width:"100%"}}>
                                {(txtProfile.button.towerstatus as any)[lang]}
                            </Button>
                        </Link>
                    </ItemCol>
                </ItemRow>
            </>
        )
    }
    else {
        return (
            <>
                <ItemRow>
                    <Link to={`/cleartable/${props.id}`}>
                        <Button style={{width:"100%"}}>
                            {(txtProfile.button.clearRankTable as any)[lang]}
                        </Button>
                    </Link>
                    <Link to={`/mybest/${props.id}`}>
                        <Button style={{width:"100%"}}>
                            {(txtProfile.button.mybest as any)[lang]}
                        </Button>
                    </Link>
                    <Link to={`/profile/towerstatus/${props.id}`}>
                        <Button style={{width:"100%"}}>
                            {(txtProfile.button.towerstatus as any)[lang]}
                        </Button>
                    </Link>
                </ItemRow>
            </>
        )
    }
})

export default ProfileButton;