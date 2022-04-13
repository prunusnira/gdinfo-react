import { useState } from "react"
import { apiForceCountUpdate, apiSubmitDataOpen } from "@/api/updateUserData"
import store from "@/mobx/store"

type InfoOpenType = [
    boolean, () => void, () => void,
    (id: string, open: string) => void, () => void,
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
]

const useInfoOpen = (setOpenUserInfo: (s: string) => void): InfoOpenType => {
    const [isInfoOpen, setInfoOpen] = useState(false)

    const {loginUser} = store

    const setInfoDlgOpen = () => {
        setInfoOpen(true)
	}
	
	const setInfoDlgClose = () => {
        setInfoOpen(false)
	}
	
	const submitOpen = (id: string, open: string) => {
        apiSubmitDataOpen(id, open)
        .then((res) => {
            setInfoDlgClose();
        });
    }

    const updateOpenValue = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setOpenUserInfo(e.currentTarget.value)
    }
    
    const forceCountUpdate = () => {
		apiForceCountUpdate(loginUser.user.id)
        .then((data) => {
            window.location.reload();
        });
    }

    return [
        isInfoOpen, setInfoDlgOpen, setInfoDlgClose, submitOpen, forceCountUpdate, updateOpenValue
    ]
}

export default useInfoOpen