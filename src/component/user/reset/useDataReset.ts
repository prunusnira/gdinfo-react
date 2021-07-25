import { useState } from "react"
import { apiResetData } from "@/api/updateUserData"
import store from "@/mobx/store"

type ResetReturn = [boolean, () => void]

const useDataReset = (): ResetReturn => {
    const [redirect, setRedirect] = useState(false)
    const resetData = () => {
        const data = new URLSearchParams()
        data.append("id", store.loginUser.user.id)

        apiResetData(data)
        .then((res) => {
            setRedirect(true)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return [redirect, resetData]
}

export default useDataReset