import React from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import store from "@/mobx/store";
import { NavBar, NavItem, NavLogo, NavMenu, NavTitle } from "./headernav.style";

import HeaderNavDataKo from "@/lang/header/headerNavData-ko";
import HeaderNavDataJp from "@/lang/header/headerNavData-jp";
import HeaderNavDataEn from "@/lang/header/headerNavData-en";
import CommonData from "@/module/common/commonData";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "@/component/toggleSwitch/toggleSwitch";

type HeaderNavProps = {
    isMenuOpen: boolean;

    toggleMenu: () => void;
    closeMenu: () => void;
};

const HeaderNavBar = observer((props: HeaderNavProps) => {
    const { language, loginUser, loginStatus, dark } = store;
    const lang = language.lang;

    const HeaderNavData =
        lang === "ko" ? HeaderNavDataKo : lang === "jp" ? HeaderNavDataJp : HeaderNavDataEn;

    const LoginButton = () => {
        if (!loginStatus.isSigned) {
            return (
                <Link to="/login" onClick={props.closeMenu} data-testid={`header-login`}>
                    <span>{HeaderNavData.login.title}</span>
                </Link>
            );
        } else {
            return (
                <Link to="#no_div" onClick={props.closeMenu}>
                    <GoogleLogout
                        className="logout"
                        clientId={CommonData.googleLoginClientId}
                        buttonText={HeaderNavData.logout.title}
                        icon={false}
                        onLogoutSuccess={() => {
                            loginUser.setLogout();
                            loginStatus.setSignStatus(false);
                        }}
                    />
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

            <NavMenu>
                <NavItem dark={dark.dark}>
                    Dark
                    <ToggleSwitch
                        id={`darkmode`}
                        actualValue={dark.dark}
                        callback={dark.changeDark}
                    />
                </NavItem>
                <NavItem dark={dark.dark}>{LoginButton()}</NavItem>
                <NavItem dark={dark.dark} onClick={() => props.toggleMenu()}>
                    <FontAwesomeIcon icon={faBars} />
                </NavItem>
            </NavMenu>
        </NavBar>
    );
});

export default HeaderNavBar;
