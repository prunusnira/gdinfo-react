import React from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import store from "@/mobx/store";
import { ItemRow } from "@/styled/styledCommon";
import { NavBar, NavItemX, NavLogo, NavMenu, NavTitle } from "./headernav.style";

import HeaderNavDataKo from "@/lang/header/headerNavData-ko";
import HeaderNavDataJp from "@/lang/header/headerNavData-jp";
import HeaderNavDataEn from "@/lang/header/headerNavData-en";
import CommonData from "@/module/common/commonData";
import { observer } from "mobx-react";

type HeaderNavProps = {
    isMenuOpen: boolean;

    toggleMenu: () => void;
    closeMenu: () => void;
};

const HeaderNavBar = observer((props: HeaderNavProps) => {
    const { language, loginUser, loginStatus } = store;
    const lang = language.lang;

    const HeaderNavData =
        lang === "ko" ? HeaderNavDataKo : lang === "jp" ? HeaderNavDataJp : HeaderNavDataEn;

    const LoginButton = () => {
        if (!loginStatus.isSigned) {
            return (
                <Link to="/login" onClick={props.closeMenu} data-testid={`header-login`}>
                    <ItemRow keepDirHor={true}>
                        <span>{HeaderNavData.login.title}</span>
                    </ItemRow>
                </Link>
            );
        } else {
            return (
                <Link to="#no_div" onClick={props.closeMenu}>
                    <ItemRow keepDirHor={true}>
                        <GoogleLogout
                            clientId={CommonData.googleLoginClientId}
                            buttonText={HeaderNavData.logout.title}
                            icon={false}
                            onLogoutSuccess={() => {
                                loginUser.setLogout();
                                loginStatus.setSignStatus(false);
                            }}
                        />
                    </ItemRow>
                </Link>
            );
        }
    };

    return (
        <NavBar>
            <NavTitle>
                <Link to={HeaderNavData.title.url} data-testid={`header-index`}>
                    <NavLogo
                        alt="icon"
                        src={`${process.env.PUBLIC_URL}/general-img/header/logoidx.png`}
                    />
                </Link>
            </NavTitle>

            <NavMenu isToggled={props.isMenuOpen}>
                <NavItemX>{LoginButton()}</NavItemX>
            </NavMenu>
        </NavBar>
    );
});

export default HeaderNavBar;
