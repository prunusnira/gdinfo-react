import { useState } from "react"

type UseHeaderReturn = [boolean, () => void, () => void]

const useHeader = (): UseHeaderReturn => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }
    
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return [isMenuOpen, toggleMenu, closeMenu]
}

export default useHeader