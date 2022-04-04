import React from "react";
import { Link } from "react-router-dom";
import { SideBarItemType } from "../data/sidebarData";
import { SBIcon, SBTxt, SideBarItemWrapper, SideBarSubWrapper } from "./sidebarItem.style";

type Props = {
    iconSrc?: string;
    text: string;
    href?: string;
    sub?: SideBarItemType[];
};

const SideBarItem = ({ iconSrc, text, href, sub }: Props) =>
    href ? (
        <>
            <Link to={href}>
                <SideBarItemWrapper>
                    {iconSrc && <SBIcon src={iconSrc} />}
                    <SBTxt>{text}</SBTxt>
                </SideBarItemWrapper>
            </Link>
            {sub &&
                sub.map((x) => (
                    <SideBarSubWrapper>
                        <SideBarItem iconSrc={x.iconSrc} text={x.text} href={x.href} sub={x.sub} />
                    </SideBarSubWrapper>
                ))}
        </>
    ) : (
        <>
            <SideBarItemWrapper>
                {iconSrc && <SBIcon src={iconSrc} />}
                <SBTxt>{text}</SBTxt>
            </SideBarItemWrapper>
            {sub &&
                sub.map((x) => (
                    <SideBarSubWrapper>
                        <SideBarItem iconSrc={x.iconSrc} text={x.text} href={x.href} sub={x.sub} />
                    </SideBarSubWrapper>
                ))}
        </>
    );
export default SideBarItem;
