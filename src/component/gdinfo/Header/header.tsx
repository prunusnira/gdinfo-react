import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import txtHeader from './txtheader';

import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Alert,
    Row,
    Col
} from 'reactstrap'
import { GoogleLogout } from 'react-google-login';
import CommonData from '../Pages/Common/commonData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import { isSynchronized } from 'mobx-persist-store';
import { Header } from '../../../styled/styledOverall';
import { HeaderNav, NavBar, NavItemX, NavTitle, ImageTitle, ImageIcon, NavMenu } from '../../../styled/styledHeader';
import HeaderNavData from './headerNavData';
import { ItemCol, ItemRow } from '../../../styled/styledCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSortDown } from '@fortawesome/free-solid-svg-icons';
import NavSubItemWrapper from './navbar/navSubWrapper';

import ImgTitle from './img/logoidx.png'
import ImgMenuIcon from './img/btnmenu.jpg'
import ImgMydata from './img/mydata.png'
import ImgSkill from './img/skill.png'
import ImgPattern from './img/pattern.png'
import ImgTower from './img/tower.png'
import ImgLogin from './img/login.png'
import ImgLogout from './img/logout.png'

const GDHeader = observer(() => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [searchType, setSerachType] = useState('name')

    const [searchNameWeight, setNameWeight] = useState<number | "bold" | "normal" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "bolder" | "lighter" | undefined>('bold')
    const [searchGSkillWeight, setGSkillWeight] = useState<number | "bold" | "normal" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "bolder" | "lighter" | undefined>('normal')
    const [searchDSkillWeight, setDSkillWeight] = useState<number | "bold" | "normal" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "bolder" | "lighter" | undefined>('normal')
    const [searchMusicWeight, setMusicWeight] = useState<number | "bold" | "normal" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "bolder" | "lighter" | undefined>('normal')
    
    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    if(!isSynchronized(store.language)) {
        return null
    }

    const LoginButton = () => {
        if(!loginStatus.isSigned) {
            return (
                <NavLink tag={Link} to="/login" onClick={toggleMenu}>
                    <img alt="icon" className="navicon" src={require("./img/login.png")}/>
                    <span className="navlefttxt">
                        {(txtHeader.login as any)[lang]}
                    </span>
                </NavLink>
            );
        }
        else {
            return (
                <NavLink className="nav-link" tag={Link} to="#no_div"
                    onClick={toggleMenu}>
                    <img alt="icon" className="navicon" src={require("./img/logout.png")}/>
                    <GoogleLogout
                        className="logoutbtn"
                        clientId={CommonData.googleLoginClientId}
                        buttonText={(txtHeader.logout as any)[lang]}
                        onLogoutSuccess={
                            () => loginUser.setLogout()
                        } />
                </NavLink>
            );
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    const changeSearchType = (type: string) => {
        setSerachType(type)
        
        switch(type) {
        case "name":
            setNameWeight('bold')
            setGSkillWeight('normal')
            setDSkillWeight('normal')
            setMusicWeight('normal')
            break;
        case "gskill":
            setNameWeight('normal')
            setGSkillWeight('bold')
            setDSkillWeight('normal')
            setMusicWeight('normal')
            break;
        case "dskill":
            setNameWeight('normal')
            setGSkillWeight('normal')
            setDSkillWeight('bold')
            setMusicWeight('normal')
            break;
        case "music":
            setNameWeight('normal')
            setGSkillWeight('normal')
            setDSkillWeight('normal')
            setMusicWeight('bold')
            break;
        default:
            break;
        }
    }

    const doSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13) {
            window.location.href = "/search/"+searchType+"/"+
                            e.currentTarget.value+"/1";
        }
    }

    return (
        <Header>
            <HeaderNav>
                <NavBar>
                    <NavTitle>
                        <Link to={HeaderNavData.title.url}>
                            <ImageTitle alt="icon" src={ImgTitle}/>
                        </Link>
                    </NavTitle>
                    <NavMenu>
                        <NavItemX>
                            <Link to='#none' onClick={toggleMenu}>
                                {/* My Data */}
                                <ItemRow>
                                    <ImageIcon alt="icon" src={ImgMydata}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.mymenu.title as any)[lang]}
                                    </span>
                                    <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                                </ItemRow>
                            </Link>
                            <NavSubItemWrapper
                                key='menu-mydata'
                                open={isMenuOpen}
                                closeMenu={toggleMenu}
                                items={HeaderNavData.mydata.sub} />
                        </NavItemX>
                        <NavItemX>
                            <Link to='#none' onClick={toggleMenu}>
                                {/* Skill */}
                                <ItemRow>
                                    <ImageIcon alt="icon" src={ImgSkill}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.skill.title as any)[lang]}
                                    </span>
                                    <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                                </ItemRow>
                            </Link>
                            <NavSubItemWrapper
                                key='menu-skill'
                                open={isMenuOpen}
                                closeMenu={toggleMenu}
                                items={HeaderNavData.skill.sub} />
                        </NavItemX>
                        <NavItemX>
                            <Link to='#none' onClick={toggleMenu}>
                                {/* Pattern */}
                                <ItemRow>
                                    <ImageIcon alt="icon" src={ImgPattern}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.pattern.title as any)[lang]}
                                    </span>
                                    <FontAwesomeIcon style={{color: 'white'}} icon={faSortDown} />
                                </ItemRow>
                            </Link>
                            <NavSubItemWrapper
                                key='menu-pattern'
                                open={isMenuOpen}
                                closeMenu={toggleMenu}
                                items={HeaderNavData.pattern.sub} />
                        </NavItemX>
                        <NavItemX>
                            <Link to=''>
                                {/* Tower */}
                                <ItemRow>
                                    <ImageIcon alt="icon" src={ImgTower}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.tower.title as any)[lang]}
                                    </span>
                                </ItemRow>
                            </Link>
                        </NavItemX>
                        <NavItemX>
                            {LoginButton()}
                        </NavItemX>
                    </NavMenu>
                </NavBar>
            </HeaderNav>

            <ItemRow style={{backgroundColor: 'lightgreen'}}>
                <ItemCol size={10} style={{textAlign: 'center', color: 'black'}}>
                    <b>{(txtHeader.test as any)[lang]}</b>
                </ItemCol>
            </ItemRow>
        </Header>
    )
})

export default GDHeader;