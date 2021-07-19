import axios from "axios"
import { useState } from "react"
import loginUser from "../../../mobx/loginUser"
import CommonData from "../../common/commonData"
import TitleType from "./data/titleType"
import store from "../../../mobx/store"

import txtTowerKo from '../../../lang/tower/txtTower-ko'
import txtTowerJp from '../../../lang/tower/txtTower-jp'
import txtTowerEn from '../../../lang/tower/txtTower-en'

type TitleModalReturn = [
    boolean, TitleType,
    (b: boolean) => void,
    (t: TitleType) => void,
    (s: string) => void,
]

const useTitleModal = (): TitleModalReturn => {
    const [showTitleChangeModal, setTitleChangeModal] = useState(false)
	const [titleToBeChanged, setTitleToBeChanged] = useState<TitleType>({type: 0, title: '', display: ''})

	const lang = store.language.lang

    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn

	const changeTitle = (title: string) => {
		axios.post(`${CommonData.dataUrl}towertitleapply/${loginUser.user.id}/${title}`)
		.then(res => {
			alert(txtTower.title.changed)
			setTitleChangeModal(false)
		})
	}

    return [
        showTitleChangeModal, titleToBeChanged,
        setTitleChangeModal, setTitleToBeChanged, changeTitle
    ]
}

export default useTitleModal