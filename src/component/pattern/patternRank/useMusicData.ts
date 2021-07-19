import axios from "axios";
import { useEffect, useState } from "react";
import CommonData from "../../common/commonData";
import { getPatternImg600 } from "../../common/pattern";

type MusicDataReturn = [string, string, string, string]

const useMusicData = (
    ptcode: string,
    mid: string,
    setLoaded: (b: boolean) => void,
): MusicDataReturn => {
    const [pattern, setPattern] = useState('')
    const [level, setLevel] = useState('')
    const [mname, setMName] = useState('')
    const [composer, setComposer] = useState('')
    
    useEffect(() => {
        // setup Pattern
        setupPattern()
        loadMusicData()
    }, [ptcode])
    
    const setupPattern = () => {
        switch(ptcode) {
            case "1":
                setPattern("BSC-G")
                break
            case "2":
                setPattern("ADV-G")
                break
            case "3":
                setPattern("EXT-G")
                break
            case "4":
                setPattern("MAS-G")
                break
            case "5":
                setPattern("BSC-B")
                break
            case "6":
                setPattern("ADV-B")
                break
            case "7":
                setPattern("EXT-B")
                break
            case "8":
                setPattern("MAS-B")
                break
            case "9":
                setPattern("BSC-D")
                break
            case "10":
                setPattern("ADV-D")
                break
            case "11":
                setPattern("EXT-D")
                break
            case "12":
                setPattern("MAS-D")
                break
            default:
                break
        }
    }

    const loadMusicData = () => {
        axios.post(`${CommonData.dataUrl}getmusic/${mid}`)
        .then((res) => {
            const json = res.data
            const music = JSON.parse(json.music)

            const pattern = getPatternImg600(parseInt(ptcode))
            let level: string = "";
            switch(parseInt(ptcode)) {
            case 1:
                level = (music.gbsc/100).toFixed(2)
                break
            case 2:
                level = (music.gadv/100).toFixed(2)
                break
            case 3:
                level = (music.gext/100).toFixed(2)
                break
            case 4:
                level = (music.gmas/100).toFixed(2)
                break
            case 5:
                level = (music.bbsc/100).toFixed(2)
                break
            case 6:
                level = (music.badv/100).toFixed(2)
                break
            case 7:
                level = (music.bext/100).toFixed(2)
                break
            case 8:
                level = (music.bmas/100).toFixed(2)
                break
            case 9:
                level = (music.dbsc/100).toFixed(2)
                break
            case 10:
                level = (music.dadv/100).toFixed(2)
                break
            case 11:
                level = (music.dext/100).toFixed(2)
                break
            case 12:
                level = (music.dmas/100).toFixed(2)
                break
            default:
                level = ""
                break
            }

            setPattern(pattern)
            setMName(music.name)
            setComposer(music.composer)
            setLevel(level)
            setLoaded(true)
        })
    }

    return [pattern, level, mname, composer]
}

export default useMusicData