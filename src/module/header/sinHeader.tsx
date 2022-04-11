import React from "react";
import { HeaderOuter, Header } from "./sinHeader.style";
import HeaderNavBar from "./navbar/headernav";
import useHeader from "./useHeader";
import SideBar from "./sidebar/view/sidebar";
import { observer } from "mobx-react";
import store from "@/mobx/store";

const SinHeader = observer(() => {
    const { dark } = store;
    const { isMenuOpen, toggleMenu, closeMenu, isTransparent } = useHeader();

    return (
        <HeaderOuter>
            <Header isTop={isTransparent} dark={dark.dark}>
                <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <HeaderNavBar
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    closeMenu={closeMenu}
                />
            </Header>
        </HeaderOuter>
    );
});

export default SinHeader;
