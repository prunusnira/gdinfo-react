import ToggleSwitch from '@/component/toggleSwitch/toggleSwitch';
import { atomDarkmode } from '@/jotai/darkmode';
import { atomLanguage } from '@/jotai/language';
import { atomLoginUser } from '@/jotai/loginUser';
import HeaderNavDataEn from '@/lang/header/headerNavData-en';
import HeaderNavDataJp from '@/lang/header/headerNavData-jp';
import HeaderNavDataKo from '@/lang/header/headerNavData-ko';
import CommonData from '@/module/common/commonData';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { NavBar, NavItem, NavLogo, NavMenu, NavTitle } from './headernav.style';

interface Props {
    isMenuOpen: boolean;

    toggleMenu: () => void;
    closeMenu: () => void;
}

const HeaderNavBar = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const [loginUser, setLoginUser] = useAtom(atomLoginUser);
    const [dark, setDark] = useAtom(atomDarkmode);

    const HeaderNavData =
        lang === 'ko' ? HeaderNavDataKo : lang === 'jp' ? HeaderNavDataJp : HeaderNavDataEn;

    const LoginButton = () => {
        if (!loginUser) {
            return (
                <Link to="/login" onClick={props.closeMenu} data-testid={`header-login`}>
                    <span>{HeaderNavData.login.title}</span>
                </Link>
            );
        }
        return (
            <Link to="#no_div" onClick={props.closeMenu}>
                <GoogleLogout
                    className="logout"
                    clientId={CommonData.googleLoginClientId}
                    buttonText={HeaderNavData.logout.title}
                    icon={false}
                    onLogoutSuccess={() => {
                        setLoginUser(undefined);
                    }}
                />
            </Link>
        );
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
                <NavItem dark={dark}>
                    Dark
                    <ToggleSwitch
                        id={`darkmode`}
                        actualValue={dark}
                        callback={(mode) => setDark(mode)}
                    />
                </NavItem>
                <NavItem dark={dark}>{LoginButton()}</NavItem>
                <NavItem dark={dark} onClick={() => props.toggleMenu()}>
                    <FontAwesomeIcon icon={faBars} />
                </NavItem>
            </NavMenu>
        </NavBar>
    );
};

export default HeaderNavBar;
