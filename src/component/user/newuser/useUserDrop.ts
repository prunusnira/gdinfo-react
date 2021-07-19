import axios from "axios"
import CommonData from "../../common/commonData"

const useUserDrop = (setMoveToIndex: (b: boolean) => void) => {
    const dropUser = () => {
        axios.post(`${CommonData.dataUrl}dropuser`)
        .then((res) => {
            setMoveToIndex(true)
        })
    }

    return dropUser
}

export default useUserDrop