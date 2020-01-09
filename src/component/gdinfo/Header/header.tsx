import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './header.css';
import LData from '../Pages/Common/language';
import txtHeader from './txtheader';
import {LoginInfo, actionCreator} from '../Redux/action';

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
import { StoreState } from '../Redux/reducer';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

interface Props {
    login: boolean,
    userinfo: LoginInfo,
    Actions: typeof actionCreator
}

interface State {
    isMenuOpen: boolean,
    isSearchOpen: boolean,
    searchType: string,
    isToken: boolean
}

class GDHeader extends Component<Props, State> {
    lang = LData.lang;
    searchBtn = "Player";

    constructor(props: Props) {
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
    }

    signOut = () => {
        this.props.Actions.setLogout();
    }

    LoginButton() {
        if(!this.props.login) {
            return (
                <NavLink tag={Link} to="/login" onClick={this.toggleMenu}>
                    <img alt="icon" className="navicon" src={require("./img/login.png")}/>
                    <span className="navlefttxt">
                        {(txtHeader.login as any)[this.lang]}
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
                        {(txtHeader.logout as any)[this.lang]}
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

    changeSearchType(type: string) {
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

    doSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13) {
            window.location.href = "/search/"+this.state.searchType+"/"+
                            e.currentTarget.value+"/1";
        }
    }

    render() {
        const self = this;
        return (
            <Fragment>
                <Navbar color='dark' className='bg-dark sticky-top'>
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
                                        {(txtHeader.howtouse.title as any)[this.lang]}
                                    </span>
                                </NavLink>
                            </NavItem>

                            {/* mydata */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img alt="icon" className="navicon" src={require("./img/mydata.png")}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.mymenu.title as any)[this.lang]}
                                    </span>
                                </DropdownToggle>
                                {/* mydata-dropdown */}
                                <DropdownMenu left="true">
                                    <DropdownItem tag={Link} to="/profile" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.profile as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/myskill/gf" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.gfskill as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/myskill/dm" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.dmskill as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/mybest" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.best as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/snapshot" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.snapshot as any)[this.lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* skill */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img alt="icon" className="navicon" src={require("./img/skill.png")}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.skill.title as any)[this.lang]}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu left="true">
                                    <DropdownItem tag={Link} to="/rank/gf/1" onClick={this.toggleMenu}>
                                        {(txtHeader.skill.rank as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/exc/gf" onClick={this.toggleMenu}>
                                        {(txtHeader.skill.exc as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/cntrank/1" onClick={this.toggleMenu}>
                                        {(txtHeader.etc.countrank as any)[this.lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        
                            {/* pattern */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img alt="icon" className="navicon" src={require("./img/pattern.png")}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.pattern.title as any)[this.lang]}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu left="true">
                                    <DropdownItem tag={Link} to="/pattern/00/titleasc/1?hot=h" onClick={this.toggleMenu}>
                                        {(txtHeader.pattern.ptlist as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/notplayed" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.notplayed as any)[this.lang]}
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/cleartable" onClick={this.toggleMenu}>
                                        {(txtHeader.mymenu.cleartable as any)[this.lang]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* tower */}
                            <NavItem>
                                <NavLink tag={Link} to="/tower/index" onClick={this.toggleMenu}>
                                    <img alt="icon" className="navicon" src={require("./img/tower.png")}/>
                                    <span className="navlefttxt">
                                        {(txtHeader.tower.title as any)[this.lang]}
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

                <Alert onClose={() => console.log("")}>
                    <Row>
                        <Col xs="12" className="text-center">
                            <b>{(txtHeader.test as any)[this.lang]}</b>
                        </Col>
                    </Row>
                </Alert>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GDHeader);