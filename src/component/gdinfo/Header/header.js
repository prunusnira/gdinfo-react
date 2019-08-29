import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import LData from '../js/language';
import axios from 'axios';

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
    UncontrolledDropdown
} from 'reactstrap'

let token = null;
const lang = LData.lang;
const txtHeader = require('./txtheader.js').default;

function signOut() {

}

function GetAJAXToken() {

}

export default class GDHeader extends Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.changeSearchType = this.changeSearchType.bind(this);
        this.state = {
            isMenuOpen: false,
            isSearchOpen: false,
            searchType: "name",
            isToken: false
        };
        this.searchBtn = "Player";
        
        this.token = GetAJAXToken();
    }

    componentDidMount() {
        // get data by using ajax
        axios.post("https://gitadora.info/d/gettoken")
        .then((res) => {
            if(res.data != null) {
                this.setState({
                    isToken: true
                });
            }
        });
    }

    LoginButton(token) {
        if(!this.state.isToken) {
            return (
                <NavLink tag={Link} to="/login">
                    <img className="navicon" src={require("./img/login.png")}/>
                    <span className="navlefttxt">
                        {txtHeader.login[lang]}
                    </span>
                </NavLink>
            );
        }
        else {
            return (
                <NavLink className="nav-link" tag={Link} to="#no_div" onClick={signOut}>
                    <img className="navicon" src={require("./img/logout.png")}/>
                    <span className="navlefttxt">
                        {txtHeader.logout[lang]}
                    </span>
                </NavLink>
            );
        }
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    toggleSearch = () => {
        this.setState({
            isSearchOpen: !this.state.isSearchOpen
        });
    }

    render() {
        return (
            <header id="header">
                <Navbar color='dark' className='bg-dark fixed-top'>
                    <NavbarBrand tag={Link} to="/index">
                        <img style={{maxHeight: 32+'px'}} src={require("./img/logoidx.png")}/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleMenu}>
                        <img src={require("./img/btnmenu.jpg")}/>
                        {/*<span className="navbar-toggler-icon"></span>*/}
                    </NavbarToggler>

                    <Collapse isOpen={this.state.isMenuOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {/* login or logout button */}
                            <NavItem>
                                {this.LoginButton(token)}
                            </NavItem>

                            {/* howto */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img className="navicon" src={require("./img/howto.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.howtouse.title[lang]}
                                    </span>
                                </DropdownToggle>
                                {/* howto-dropdown */}
                                <DropdownMenu left>
                                    <DropdownItem tag={Link} to="/about0p">
                                        {txtHeader.howtouse.update_au[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/about1">
                                        {txtHeader.howtouse.update_man[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/about2">
                                        {txtHeader.howtouse.filter_rival[lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* mydata */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img className="navicon" src={require("./img/mydata.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.mymenu.title[lang]}
                                    </span>
                                </DropdownToggle>
                                {/* mydata-dropdown */}
                                <DropdownMenu left>
                                    <DropdownItem tag={Link} to="/profile">
                                        {txtHeader.mymenu.profile[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/myskill/gf">
                                        {txtHeader.mymenu.gfskill[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/myskill/dm">
                                        {txtHeader.mymenu.dmskill[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/mybest">
                                        {txtHeader.mymenu.best[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/rivallist">
                                        {txtHeader.mymenu.rivallist[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/snapshot">
                                        {txtHeader.mymenu.snapshot[lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* skill */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img className="navicon" src={require("./img/skill.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.skill.title[lang]}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu left>
                                    <DropdownItem tag={Link} to="/rank/gf/1">
                                        {txtHeader.skill.rank[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/exc/gf">
                                        {txtHeader.skill.exc[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/cntrank/1">
                                        {txtHeader.etc.countrank[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/register">
                                        {txtHeader.skill.register[lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        
                            {/* pattern */}
                            <UncontrolledDropdown className="nav-item dropdown">
                                <DropdownToggle nav inNavbar>
                                    <img className="navicon" src={require("./img/pattern.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.pattern.title[lang]}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu nav caret>
                                    <DropdownItem tag={Link} to="/ptrank/00/titleasc/1?hot=h">
                                        {txtHeader.pattern.ptlist[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/notplayed">
                                        {txtHeader.mymenu.notplayed[lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/cleartable">
                                        {txtHeader.mymenu.cleartable[lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* tower */}
                            <NavItem>
                                <NavLink tag={Link} to="/tower/index">
                                    <img className="navicon" src={require("./img/tower.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.tower.title[lang]}
                                    </span>
                                </NavLink>
                            </NavItem>
                        
                            {/* piu */}
                            <NavItem>
                                <NavLink tag={Link} to="/piu" className="nav-link">
                                    <img className="navicon" src={require("./img/piu.png")}/>
                                    <span className="navlefttxt">
                                        {txtHeader.piu.title[lang]}
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>

                        {/* search */}
                        <NavbarToggler onClick={this.toggleSearch} href="#no_div">
                            <span color='white'>Search: {this.searchBtn}</span>
                        </NavbarToggler>
                        <input className="form-control" id="searchinp" name="val" type="search" placeholder="Select type, Input and Press Enter" aria-label="Search" style={{width:100+'%'}} />
                        <Collapse isOpen={this.state.isSearchOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavLink onClick={() => this.changeSearchType('name')} href="#no_div">Player</NavLink>
                                <NavLink onClick={() => this.changeSearchType('gskill')} href="#no_div">G-Skill</NavLink>
                                <NavLink onClick={() => this.changeSearchType('dskill')} href="#no_div">D-Skill</NavLink>
                                <NavLink onClick={() => this.changeSearchType('music')} href="#no_div">Music</NavLink>
                            </Nav>
                        </Collapse>
                    </Collapse>
                </Navbar>
            </header>
        );
    }

    changeSearchType(type) {
        this.setState({
            searchType: type
        });
        
        switch(type) {
        case "name":
            this.searchBtn = "Player";
            break;
        case "gskill":
            this.searchBtn = "G-Skill";
            break;
        case "dskill":
            this.searchBtn = "D-Skill";
            break;
        case "music":
            this.searchBtn = "Music";
            break;
        }
        console.log(type);
        this.toggleSearch();
    }
}