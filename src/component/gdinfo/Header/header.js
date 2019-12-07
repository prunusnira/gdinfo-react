import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './header.css';
import LData from '../Pages/Common/language';
import * as action from '../Redux/actions/index';

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
    Row,
    Col,
    Alert
} from 'reactstrap'

const lang = LData.lang;
const txtHeader = require('./txtheader.js').default;

class GDHeader extends Component {
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
    }

    signOut = () => {
        this.props.setUserinfo();
    }

    LoginButton() {
        if(!this.props.login) {
            return (
                <NavLink tag={Link} to="/login" onClick={this.toggleMenu}>
                    <img alt="icon" className="navicon" src={require("./img/login.png")}/>
                    <span className="navlefttxt">
                        {txtHeader.login[lang]}
                    </span>
                </NavLink>
            );
        }
        else {
            return (
                <NavLink className="nav-link" tag={Link} to="#no_div" onClick={() => {
                    this.signOut(); this.toggleMenu();}}>
                    <img alt="icon" className="navicon" src={require("./img/logout.png")}/>
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
        default:
            break;
        }
        console.log(type);
        this.toggleSearch();
    }

    doSearch = (e) => {
        if(e.keyCode === 13) {
            window.location.href = "/search/"+this.state.searchType+"/"+
                            e.target.value+"/1";
        }
    }

    render() {
        const self = this;
        return (
            <Fragment>
                <Alert onClose={() => console.log("")}>
                    <Row>
                        <Col xs="12" className="text-center">
                            <b>{txtHeader.test[lang]}</b>
                        </Col>
                    </Row>
                </Alert>
                <header id="header">
                    <Navbar color='dark' className='bg-dark fixed-top'>
                        <NavbarBrand tag={Link} to="/index" onClick={() => {this.setState({isMenuOpen: false})}}>
                            <img alt="icon" style={{maxHeight: 48+'px'}} src={require("./img/logoidx.png")}/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleMenu}>
                            <img alt="icon" src={require("./img/btnmenu.jpg")}/>
                            {/*<span className="navbar-toggler-icon"></span>*/}
                        </NavbarToggler>

                        <Collapse isOpen={this.state.isMenuOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                {/* login or logout button */}
                                <NavItem>
                                    {this.LoginButton()}
                                </NavItem>

                                {/* howto */}
                                <NavItem>
                                    <NavLink tag={Link} to="/aboutpc" onClick={this.toggleMenu}>
                                        <img alt="icon" className="navicon" src={require("./img/howto.png")}/>
                                        <span className="navlefttxt">
                                            {txtHeader.howtouse.title[lang]}
                                        </span>
                                    </NavLink>
                                </NavItem>

                                {/* mydata */}
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img alt="icon" className="navicon" src={require("./img/mydata.png")}/>
                                        <span className="navlefttxt">
                                            {txtHeader.mymenu.title[lang]}
                                        </span>
                                    </DropdownToggle>
                                    {/* mydata-dropdown */}
                                    <DropdownMenu left="true">
                                        <DropdownItem tag={Link} to="/profile" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.profile[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/myskill/gf" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.gfskill[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/myskill/dm" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.dmskill[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/mybest" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.best[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/snapshot" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.snapshot[lang]}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                {/* skill */}
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img alt="icon" className="navicon" src={require("./img/skill.png")}/>
                                        <span className="navlefttxt">
                                            {txtHeader.skill.title[lang]}
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu left="true">
                                        <DropdownItem tag={Link} to="/rank/gf/1" onClick={this.toggleMenu}>
                                            {txtHeader.skill.rank[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/exc/gf" onClick={this.toggleMenu}>
                                            {txtHeader.skill.exc[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/cntrank/1" onClick={this.toggleMenu}>
                                            {txtHeader.etc.countrank[lang]}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            
                                {/* pattern */}
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img alt="icon" className="navicon" src={require("./img/pattern.png")}/>
                                        <span className="navlefttxt">
                                            {txtHeader.pattern.title[lang]}
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu left="true">
                                        <DropdownItem tag={Link} to="/pattern/00/titleasc/1?hot=h" onClick={this.toggleMenu}>
                                            {txtHeader.pattern.ptlist[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/notplayed" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.notplayed[lang]}
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/cleartable" onClick={this.toggleMenu}>
                                            {txtHeader.mymenu.cleartable[lang]}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                {/* tower */}
                                <NavItem>
                                    <NavLink tag={Link} to="/tower/index" onClick={this.toggleMenu}>
                                        <img alt="icon" className="navicon" src={require("./img/tower.png")}/>
                                        <span className="navlefttxt">
                                            {txtHeader.tower.title[lang]}
                                        </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            {/* search */}
                            <NavbarToggler onClick={this.toggleSearch} href="#no_div">
                                <span color='white'>Search: {this.searchBtn}</span>
                            </NavbarToggler>
                            <input className="form-control" id="searchinp" name="val" type="search"
                                placeholder="Select type, Input and Press Enter"
                                aria-label="Search" style={{width:100+'%'}}
                                onKeyDown={self.doSearch} />
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

                <div style={{display: "float"}}>
                    
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: () => {
            dispatch(action.setLogout())
        }
    }
}

GDHeader = connect(mapStateToProps, mapDispatchToProps)(GDHeader);

export default GDHeader;