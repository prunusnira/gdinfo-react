import axios from "axios"
import CommonData from "@/component/common/commonData"

export const apiNewUser = async (params: URLSearchParams) => {
    const res = await axios.post(`${CommonData.dataUrl}newuser`, params)
    return res.data
}

export const apiDropUser = async () => {
    const res = await axios.post(`${CommonData.dataUrl}dropuser`)
    return res.statusText
}

export const apiSubmitComment = async (comment: string, id: string) => {
    const res = await axios.post(`${CommonData.dataUrl}setcomment`, {
        val: comment,
        id: id
    })
    return res.statusText
}

export const apiSubmitDataOpen = async (id: string, open: string) => {
    const res = await axios.post(`${CommonData.dataUrl}setopencount`, {
        data: {
            open: open,
            id: parseInt(id)
        }
    })
    return res.statusText
}

export const apiForceCountUpdate = async (id: string) => {
    const res = await axios.post(`${CommonData.dataUrl}profile/countupdate/${id}`)
    return res.statusText
}

export const apiResetData = async (data: URLSearchParams) => {
    const res = await axios.post(`${CommonData.dataUrl}resetdata`, data)
    return res
}