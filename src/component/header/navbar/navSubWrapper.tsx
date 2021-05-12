import React from "react";
import { Link } from "react-router-dom";
import store from "../../../mobx/store";
import { NavSubItem, NavSubOuter } from "../../../styled/styledHeader";
import NavSubItemType from "./navSubItemType";

interface Props {
    open: boolean,
    items: NavSubItemType[],
    closeMenu: () => void
}

const NavSubItemWrapper = (props: Props) => {
    const {language} = store
    const lang = language.lang

    return (
        <NavSubOuter isOpen={props.open}>
            {
                props.items.map(d => (
                    <NavSubItem>
                        <Link
                            to={d.link}
                            onClick={props.closeMenu}>
                            {(d.title as any)[lang]}
                        </Link>
                    </NavSubItem>
                ))
            }
        </NavSubOuter>
    )
}

export default NavSubItemWrapper