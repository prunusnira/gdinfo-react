import store from "@/mobx/store";
import { observer } from "mobx-react";
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

const SideBarItem = observer(({ iconSrc, text, href, sub }: Props) => {
    const { dark } = store;
    if (href) {
        return (
            <>
                <Link to={href}>
                    <SideBarItemWrapper dark={dark.dark}>
                        {iconSrc && <SBIcon src={iconSrc} />}
                        <SBTxt>{text}</SBTxt>
                    </SideBarItemWrapper>
                </Link>
                {sub &&
                    sub.map((x) => (
                        <SideBarSubWrapper>
                            <SideBarItem
                                iconSrc={x.iconSrc}
                                text={x.text}
                                href={x.href}
                                sub={x.sub}
                            />
                        </SideBarSubWrapper>
                    ))}
            </>
        );
    } else {
        return (
            <>
                <SideBarItemWrapper dark={dark.dark}>
                    {iconSrc && <SBIcon src={iconSrc} />}
                    <SBTxt>{text}</SBTxt>
                </SideBarItemWrapper>
                {sub &&
                    sub.map((x) => (
                        <SideBarSubWrapper>
                            <SideBarItem
                                iconSrc={x.iconSrc}
                                text={x.text}
                                href={x.href}
                                sub={x.sub}
                            />
                        </SideBarSubWrapper>
                    ))}
            </>
        );
    }
});

export default SideBarItem;
