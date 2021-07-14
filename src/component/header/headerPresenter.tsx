import React from 'react'
import { HeaderNav, NavBar, NavItemX, NavTitle, ImageTitle, ImageIcon, NavMenu, NavToggle, SearchBarSection, SearchBar } from '../../styled/styledHeader'
import {Link} from 'react-router-dom'
import './header.css'
import { GoogleLogout } from 'react-google-login'
import CommonData from '../common/commonData'
import { Header } from '../../styled/styledOverall'
import { ButtonSM, ItemRow } from '../../styled/styledCommon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import NavSubItemWrapper from './navbar/navSubWrapper'
import store from '../../mobx/store'
import { observer } from 'mobx-react'
import { isSynchronized } from 'mobx-persist-store'

import HeaderNavDataKo from './headerNavData-ko'
import HeaderNavDataJp from './headerNavData-jp'
import HeaderNavDataEn from './headerNavData-en'

interface Props {
    isMenuOpen: boolean,

    toggleMenu: () => void,
    closeMenu: () => void,

    searchRef: React.RefObject<HTMLInputElement>,
    searchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    searchClick: () => void,

    searchType: string,
    openSearchTypeDlg: (b: boolean) => void,
}

const HeaderPresenter = observer((props: Props) => {
    const {language, loginUser, loginStatus} = store
    const lang = language.lang
    
    const HeaderNavData =
        lang === 'ko' ? HeaderNavDataKo :
            lang === 'jp' ? HeaderNavDataJp : HeaderNavDataEn
    
    if(!isSynchronized(store.language)) {
        return null
    }

    const LoginButton = () => {
        if(!loginStatus.isSigned) {
            return (
                <Link to="/login" onClick={props.closeMenu} data-testid={`header-login`}>
                    <img alt="icon" className="navicon" src={`${process.env.PUBLIC_URL}/general-img/header/login.png`}/>
                    <span className="navlefttxt">
                        {HeaderNavData.login.title}
                    </span>
                </Link>
            );
        }
        else {
            return (
                <Link to="#no_div" onClick={props.closeMenu}>
                    <img alt="icon" className="navicon" src={`${process.env.PUBLIC_URL}/general-img/header/logout.png`}/>
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
                </Link>
            );
        }
    }

    return (
        <Header>
            <HeaderNav>
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
                
                <SearchBarSection>
                    <ButtonSM onClick={() => props.openSearchTypeDlg(true)}>
                        {
                            (function() {
                                switch(props.searchType) {
                                    case 'music': return 'Music'
                                    case 'gskill': return 'GSkill'
                                    case 'dskill': return 'DSkill'
                                    case 'player': return 'Player'
                                }
                            })()
                        }
                    </ButtonSM>
                    <SearchBar
                        ref={props.searchRef}
                        onKeyDown={props.searchEnter} />
                    <ButtonSM onClick={props.searchClick}>
                        {HeaderNavData.search}
                    </ButtonSM>
                </SearchBarSection>
            </HeaderNav>

            {/*<ItemRow style={{backgroundColor: 'lightgreen'}}>
                <ItemCol size={10} style={{textAlign: 'center', color: 'black'}}>
                    <b>{HeaderNavData.test}</b>
                </ItemCol>
            </ItemRow>*/}
        </Header>
    )
})

export default HeaderPresenter