import { useEffect, useState } from "react"
import store from "@/mobx/store"
import CommonData from "@/component/common/commonData"

type CheckReturn = [boolean, boolean, (b: boolean) => void]

const useUserCheck = (): CheckReturn => {
    const [moveToIndex, setMoveToIndex] = useState(false)
    const [isValidAccess, setValidAccess] = useState(true)
    
    useEffect(() => {
        // params에 token이 있는지 확인
        if(checkParamHasToken()) {
            // 토큰이 이미 DB에 있는지 확인
            checkUserAlreadyExist()
        }
        else {
            setValidAccess(false)
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
        fetch(`${CommonData.dataUrl}getuser/${token}`)
        .then(d => {
            return d.json()
        })
        .then(d => {
            if(d.mydata !== 'null') {
                setValidAccess(false)
            }
        })
    }

    return [moveToIndex, isValidAccess, setMoveToIndex]
}

export default useUserCheck