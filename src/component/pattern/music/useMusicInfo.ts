import axios from "axios"
import { useEffect, useState } from "react"
import CommonData from "../../common/commonData"
import { GDVer } from "../../common/version"

const useMusicInfo = (mid: string) => {
    const [musicName, setMusicName] = useState('')
    const [composer, setComposer] = useState('')
    const [version, setVersion] = useState('')

    useEffect(() => {
        loadMusicInfo()
    }, [])

    const loadMusicInfo = () => {
        axios.post(`${CommonData.dataUrl}getmusic/${mid}`)
        .then((res) => {
            const json = JSON.parse(res.data.music)
            setMusicName(json.name)
            setComposer(json.composer)
            setVersion(GDVer[json.version - 1].full)
        })
    }

    return [musicName, composer, version]
}

export default useMusicInfo