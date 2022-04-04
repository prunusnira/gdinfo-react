import React from "react";
import { HeaderOuter, Header } from "./sinHeader.style";
import HeaderNavBar from "./navbar/headernav";
import useHeader from "./useHeader";
import SideBar from "./sidebar/view/sidebar";

const SinHeader = () => {
    const { isMenuOpen, toggleMenu, closeMenu, isTransparent } = useHeader();

    return (
        <HeaderOuter>
            <Header isTop={isTransparent}>
                <SideBar />
                <HeaderNavBar
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    closeMenu={closeMenu}
                />
            </Header>
        </HeaderOuter>
    );
};

export default SinHeader;
