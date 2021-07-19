import { useEffect, useState } from "react"

type PatternSelectorReturn = [
    boolean, () => void,
    boolean, () => void,
    boolean, (e: React.ChangeEvent<HTMLSelectElement>) => void,
    boolean, (type: number) => void,
    string, string,
]

const usePatternSelector = (
    order: string,
    ver: string,
    page: string
): PatternSelectorReturn => {
    const [switchHot, setSwitchHot] = useState(false)
    const [switchOther, setSwitchOther] = useState(false)
    const [switchVer, setSwitchVer] = useState(false)
    const [switchOrder, setSwitchOrder] = useState(false)

    const [nextVer, setNextVer] = useState('')
    const [nextOrder, setNextOrder] = useState('')
    
    useEffect(() => {
        resetSwitch()
    }, [order, ver, page, window.location.search])

    const resetSwitch = () => {
        setSwitchHot(false)
        setSwitchOther(false)
        setSwitchVer(false)
        setSwitchOrder(false)
        setNextVer('')
        setNextOrder('')
    }

    /* Switch */
    const switchHotMethod = () => {
        setSwitchHot(true)
    }

    const switchOtherMethod = () => {
        setSwitchOther(true)
    }

    const switchVerMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "--") {
            setSwitchVer(true)
            setNextVer(e.target.value)
        }
    }

    const switchOrderMethod = (type: number) => {
        const currentOrder = order;
        let next = currentOrder;
        if(type === 0) {
            if(currentOrder === "titleasc") next = "titledesc";
            else next = "titleasc";
        }
        if(type === 1) {
            if(currentOrder === "verasc") next = "verdesc";
            else next = "verasc";
        }
        setSwitchOther(true)
        setNextVer(ver)
        setNextOrder(next)
    }

    return [
        switchHot, switchHotMethod,
        switchOther, switchOtherMethod,
        switchVer, switchVerMethod,
        switchOrder, switchOrderMethod,
        nextVer, nextOrder
    ]
}

export default usePatternSelector