import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import CommonData from '@/component/common/commonData'
import store from '@/mobx/store'
import { observer } from 'mobx-react'
import { Button, ItemCol, ItemRow } from '@/styled/styledCommon'

import txtProfileKo from '@/lang/user/profile/txtProfile-ko'
import txtProfileJp from '@/lang/user/profile/txtProfile-jp'
import txtProfileEn from '@/lang/user/profile/txtProfile-en'

interface Props {
    isOwnAccount: boolean,
    id: string
}

const ProfileButton = observer((props: Props) => {
    const lang = store.language.lang

    const txtProfile =
        lang === 'ko' ? txtProfileKo :
            lang === 'jp' ? txtProfileJp : txtProfileEn

    const towerUpdate = () => {
		if(window.confirm(txtProfile.towerupdate.alert)) {
			axios.post(`${CommonData.dataUrl}profile/towerupdate/${props.id}`)
			.then((res) => {
				alert(txtProfile.towerupdate.done)
			});
		}
    }

    if(props.isOwnAccount) {
        return (
            <>
                <ItemRow>
                    <ItemCol size={2.5} isFlatUnderLg={true}>
                        <Link to={`/mybest/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.mybest}
                            </Button>
                        </Link>
                    </ItemCol>
                    <ItemCol size={2.5} isFlatUnderLg={true}>
                        <Link to={`/cleartable/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.clearRankTable}
                            </Button>
                        </Link>
                    </ItemCol>
                    <ItemCol size={2.5} isFlatUnderLg={true}>
                        <Button style={{width:"100%"}} onClick={towerUpdate}>
                            {txtProfile.button.towerupdate}
                        </Button>
                    </ItemCol>
                    <ItemCol size={2.5} isFlatUnderLg={true}>
                        <Link to={`/profile/towerstatus/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.towerstatus}
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
                    <ItemCol size={3.3} isFlatUnderLg={true}>
                        <Link to={`/cleartable/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.clearRankTable}
                            </Button>
                        </Link>
                    </ItemCol>
                    <ItemCol size={3.3} isFlatUnderLg={true}>
                        <Link to={`/mybest/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.mybest}
                            </Button>
                        </Link>
                    </ItemCol>
                    <ItemCol size={3.3} isFlatUnderLg={true}>
                        <Link to={`/profile/towerstatus/${props.id}`} style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>
                                {txtProfile.button.towerstatus}
                            </Button>
                        </Link>
                    </ItemCol>
                </ItemRow>
            </>
        )
    }
})

export default ProfileButton;