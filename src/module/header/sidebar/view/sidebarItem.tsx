import store from "@/mobx/store";
import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { SideBarItemType } from "../data/sidebarData";
import {
    SBIcon,
    SBSubTxt,
    SBTxt,
    SideBarItemWrapper,
    SideBarSubWrapper,
} from "./sidebarItem.style";

type Props = {
    iconSrc?: string;
    text: string;
    href?: string;
    sub?: SideBarItemType[];
};

type SubProps = {
    text: string;
    href?: string;
    dark: boolean;
};

const SideBarItem = observer(({ iconSrc, text, href, sub }: Props) => {
    const { dark } = store;
    if (href) {
        return (
            <>
                <Link to={href}>
                    <SideBarItemWrapper>
                        {iconSrc && <SBIcon src={iconSrc} />}
                        <SBTxt dark={dark.dark}>{text}</SBTxt>
                    </SideBarItemWrapper>
                </Link>
                <SideBarSubWrapper>
                    {sub &&
                        sub.map((x) => (
                            <SideBarSubItem text={x.text} href={x.href} dark={dark.dark} />
                        ))}
                </SideBarSubWrapper>
            </>
        );
    } else {
        return (
            <>
                <SideBarItemWrapper>
                    {iconSrc && <SBIcon src={iconSrc} />}
                    <SBTxt dark={dark.dark}>{text}</SBTxt>
                </SideBarItemWrapper>
                <SideBarSubWrapper>
                    {sub &&
                        sub.map((x) => (
                            <SideBarSubItem text={x.text} href={x.href} dark={dark.dark} />
                        ))}
                </SideBarSubWrapper>
            </>
        );
    }
});

const SideBarSubItem = ({ text, href, dark }: SubProps) => (
    <Link to={href!}>
        <SBSubTxt dark={dark}>{text}</SBSubTxt>
    </Link>
);

export default SideBarItem;
