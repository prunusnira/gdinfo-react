import React from "react"
import { Link } from "react-router-dom"
import { NavSubItem, NavSubOuter } from "@/styled/styledHeader"

type NavSubItemType = {
    title: string,
    link: string
}

type Props = {
    open: boolean,
    items: NavSubItemType[],
    closeMenu: () => void
}

const NavSubItemWrapper = (props: Props) => {
    return (
        <NavSubOuter isOpen={props.open}>
            {
                props.items.map((d, i) => (
                    <NavSubItem key={`nav${i}`}>
                        <Link
                            to={d.link}
                            onClick={props.closeMenu}
                            data-testid={`header-${d.link}`}>
                            {d.title}
                        </Link>
                    </NavSubItem>
                ))
            }
        </NavSubOuter>
    )
}

export default NavSubItemWrapper