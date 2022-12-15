import React from "react";
import { HeaderOuter, Header, HeaderNotice } from "./sinHeader.style";
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
            <HeaderNotice>
                Skill Navigator is now under construction...
                <br />
                VERSION. FUZZ-UP is getting ready
            </HeaderNotice>
        </HeaderOuter>
    );
});

export default SinHeader;
