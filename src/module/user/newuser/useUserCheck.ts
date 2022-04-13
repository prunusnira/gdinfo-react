import { useEffect, useState } from "react"
import store from "@/mobx/store"
import {getUserFromToken} from "@/api/getUserData"

type CheckReturn = [boolean, boolean, boolean, (b: boolean) => void]

const useUserCheck = (): CheckReturn => {
    const [moveToIndex, setMoveToIndex] = useState(false)
    const [isValidAccess, setValidAccess] = useState(false)
    const [isNewUserMode, setNewUserMode] = useState(true)
    
    useEffect(() => {
        // params에 token이 있는지 확인
        if(checkParamHasToken()) {
            // 토큰이 이미 DB에 있는지 확인
            checkUserAlreadyExist()
            setNewUserMode(true)
        }
        else {
            setNewUserMode(false)
        }
    }, [])

    const {loginUser} = store

    const checkParamHasToken = () => {
        const token = loginUser.user.token
        if(token === '') return false
        else return true
    }

    const checkUserAlreadyExist = () => {
        const token = loginUser.user.token
        getUserFromToken(token)
        .then(d => {
            return d
        })
        .then(d => {
            if(d.mydata !== 'null') {
                setValidAccess(false)
            }
        })
    }

    return [moveToIndex, isValidAccess, isNewUserMode, setMoveToIndex]
}

export default useUserCheck