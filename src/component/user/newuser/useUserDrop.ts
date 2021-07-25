import { apiDropUser } from "@/api/updateUserData"

const useUserDrop = (setMoveToIndex: (b: boolean) => void) => {
    const dropUser = () => {
        apiDropUser()
        .then((data) => {
            setMoveToIndex(true)
        })
    }

    return dropUser
}

export default useUserDrop