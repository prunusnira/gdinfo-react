import { atomDarkmode } from '@/jotai/darkmode';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import HeaderNavBar from './navbar/headernav';
import SideBar from './sidebar/view/sidebar';
import { Header, HeaderOuter } from './sinHeader.style';
import useHeader from './useHeader';

const SinHeader = () => {
    const dark = useAtomValue(atomDarkmode);
    const { isMenuOpen, toggleMenu, closeMenu, isTransparent } = useHeader();

    return (
        <HeaderOuter>
            <Header $isTop={isTransparent} $dark={dark}>
                <SideBar isMenuOpen={isMenuOpen} />
                <HeaderNavBar
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    closeMenu={closeMenu}
                />
            </Header>
            {/* <HeaderNotice>
                Skill Navigator is now under construction...
                <br />
                VERSION. FUZZ-UP is getting ready
            </HeaderNotice> */}
        </HeaderOuter>
    );
};

export default SinHeader;
