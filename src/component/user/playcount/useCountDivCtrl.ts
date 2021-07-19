import { useState } from "react"

type DivCtrlReturn = [string, string, string, string, (n: number) => void]

const useCountDivCtrl = (): DivCtrlReturn => {
    const [display0, setDisplay0] = useState('none')
    const [display1, setDisplay1] = useState('block')
    const [display2, setDisplay2] = useState('none')
    const [display3, setDisplay3] = useState('none')
    
    const changeDiv = (num: number) => {
        switch(num) {
            case 0:
                setDisplay0('block')
                setDisplay1('none')
                setDisplay2('none')
                setDisplay3('none')
                break;
            case 1:
                setDisplay0('none')
                setDisplay1('block')
                setDisplay2('none')
                setDisplay3('none')
                break;
            case 2:
                setDisplay0('none')
                setDisplay1('none')
                setDisplay2('block')
                setDisplay3('none')
                break;
            case 3:
                setDisplay0('none')
                setDisplay1('none')
                setDisplay2('none')
                setDisplay3('block')
                break;
            default:
                break;
        }
    }

    return [display0, display1, display2, display3, changeDiv]
}

export default useCountDivCtrl