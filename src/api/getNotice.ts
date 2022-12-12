import axios from "axios"

export const getTopNotice = async () => {
    const res = await axios.get(``)
    return res.data
}

export const getNotice = async (page: number) => {
    const res = await axios.get(``)
    return res.data
}