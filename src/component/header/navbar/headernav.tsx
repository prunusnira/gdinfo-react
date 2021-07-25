import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { GoogleLogout } from "react-google-login"
import { Link } from "react-router-dom"
import store from "@/mobx/store"
import { ItemRow } from "@/styled/styledCommon"
import { ImageIcon, ImageTitle, NavBar, NavItemX, NavMenu, NavTitle, NavToggle } from "@/styled/styledHeader"
import NavSubItemWrapper from "./navSubWrapper"
import '../header.css'

import HeaderNavDataKo from '@/lang/header/headerNavData-ko'
import HeaderNavDataJp from '@/lang/header/headerNavData-jp'
import HeaderNavDataEn from '@/lang/header/headerNavData-en'
import CommonData from "@/component/common/commonData"
import { observer } from "mobx-react"

type HeaderNavProps = {
    isMenuOpen: boolean,

    toggleMenu: () => void,
    closeMenu: () => void,
}

const HeaderNavBar = observer((props: HeaderNavProps) => {
    const {language, loginUser, loginStatus} = store
    const lang = language.lang
    
    const HeaderNavData =
        lang === 'ko' ? HeaderNavDataKo :
            lang === 'jp' ? HeaderNavDataJp : HeaderNavDataEn
            
    const LoginButton = () => {
        if(!loginStatus.isSigned) {
            return (
                <Link to="/login" onClick={props.closeMenu} data-testid={`header-login`}>
                    <ItemRow keepDirHor={true}>
                        <ImageIcon alt="icon" className="navicon" src={`${process.env.PUBLIC_URL}/general-img/header/login.png`}/>
                        <span className="navlefttxt">
                            {HeaderNavData.login.title}
                        </span>
                    </ItemRow>
                </Link>
            );
        }
        else {
            return (
                <Link to="#no_div" onClick={props.closeMenu}>
                    <ItemRow keepDirHor={true}>
                        <ImageIcon alt="icon" className="navicon" src={`${process.env.PUBLIC_URL}/general-img/header/logout.png`}/>
                        <GoogleLogout
                            className="logoutbtn"
                            clientId={CommonData.googleLoginClientId}
                            buttonText={HeaderNavData.logout.title}
                            onLogoutSuccess={
                                () => {
                                    loginUser.setLogout()
                                    loginStatus.setSignStatus(false)
                                }
                            } />
                    </ItemRow>
                </Link>
            );
        }
    }
    
    return (
        <NavBar>
            <NavTitle>
                <Link to={HeaderNavData.title.url} data-testid={`header-index`}>
                    <ImageTitle alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/logoidx.png`}/>
                </Link>
            </NavTitle>
            <NavToggle onClick={props.toggleMenu}>
                <img src={`${process.env.PUBLIC_URL}/general-img/header/btnmenu.jpg`} />
            </NavToggle>
            <NavMenu isToggled={props.isMenuOpen}>
                <NavItemX>
                    <Link to='#none' onClick={props.toggleMenu}>
                        {/* My Data */}
                        <ItemRow keepDirHor={true}>
                            <ImageIcon alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/mydata.png`}/>
                            <span className="navlefttxt">
                                {HeaderNavData.mydata.text}
                            </span>
                            <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                        </ItemRow>
                    </Link>
                    <NavSubItemWrapper
                        key='menu-mydata'
                        open={props.isMenuOpen}
                        closeMenu={props.toggleMenu}
                        items={HeaderNavData.mydata.sub} />
                </NavItemX>
                <NavItemX>
                    <Link to='#none' onClick={props.toggleMenu}>
                        {/* Skill */}
                        <ItemRow keepDirHor={true}>
                            <ImageIcon alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/skill.png`}/>
                            <span className="navlefttxt">
                                {HeaderNavData.skill.text}
                            </span>
                            <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                        </ItemRow>
                    </Link>
                    <NavSubItemWrapper
                        key='menu-skill'
                        open={props.isMenuOpen}
                        closeMenu={props.toggleMenu}
                        items={HeaderNavData.skill.sub} />
                </NavItemX>
                <NavItemX>
                    <Link to='#none' onClick={props.toggleMenu}>
                        {/* Pattern */}
                        <ItemRow keepDirHor={true}>
                            <ImageIcon alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/pattern.png`}/>
                            <span className="navlefttxt">
                                {HeaderNavData.pattern.text}
                            </span>
                            <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                        </ItemRow>
                    </Link>
                    <NavSubItemWrapper
                        key='menu-pattern'
                        open={props.isMenuOpen}
                        closeMenu={props.toggleMenu}
                        items={HeaderNavData.pattern.sub} />
                </NavItemX>
                <NavItemX>
                    <Link to='/tower/index' onClick={props.closeMenu} data-testid='header-tower'>
                        {/* Tower */}
                        <ItemRow keepDirHor={true}>
                            <ImageIcon alt="icon" src={`${process.env.PUBLIC_URL}/general-img/header/tower.png`}/>
                            <span className="navlefttxt">
                                {HeaderNavData.tower.title}
                            </span>
                        </ItemRow>
                    </Link>
                </NavItemX>
                <NavItemX>
                    {LoginButton()}
                </NavItemX>
            </NavMenu>
        </NavBar>
    )
})

export default HeaderNavBar