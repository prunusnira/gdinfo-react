import { useEffect, useState } from "react"
import { getMusicData } from "@/api/getMusicData"
import { GDVer } from "@/component/common/version"

const useMusicInfo = (mid: string) => {
    const [musicName, setMusicName] = useState('')
    const [composer, setComposer] = useState('')
    const [version, setVersion] = useState('')

    useEffect(() => {
        loadMusicInfo()
    }, [])

    const loadMusicInfo = () => {
        getMusicData(mid)
        .then((data) => {
            const json = JSON.parse(data.music)
            setMusicName(json.name)
            setComposer(json.composer)
            setVersion(GDVer[json.version - 1].full)
        })
    }

    return [musicName, composer, version]
}

export default useMusicInfo