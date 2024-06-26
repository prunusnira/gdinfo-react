import { useEffect, useState } from 'react';

const useHeader = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isTransparent, setTransparent] = useState(true);

    const positionCheck = () => {
        if(window.scrollY > 100) {
            setTransparent(false)
        }
        else {
            setTransparent(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', positionCheck);
        return () => {
            window.removeEventListener('scroll', positionCheck);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return { isMenuOpen, toggleMenu, closeMenu, isTransparent };
};

export default useHeader;
