import { useEffect, useState } from "react";

const useHeader = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isTransparent, setTransparent] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", positionCheck);
        return () => {
            window.removeEventListener("scroll", positionCheck);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const positionCheck = () => {
        window.scrollY > 100 ? setTransparent(false) : setTransparent(true);
    };

    return { isMenuOpen, toggleMenu, closeMenu, isTransparent };
};

export default useHeader;
