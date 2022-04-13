import store from "@/mobx/store";
import { ThemedLink } from "@/styled/styledCommon";
import { observer } from "mobx-react";
import React from "react";
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
                <ThemedLink dark={dark.dark} to={href}>
                    <SideBarItemWrapper>
                        {iconSrc && <SBIcon src={iconSrc} />}
                        <SBTxt dark={dark.dark}>{text}</SBTxt>
                    </SideBarItemWrapper>
                </ThemedLink>
                <SideBarSubWrapper>
                    {sub &&
                        sub.map((x, i) => (
                            <SideBarSubItem
                                key={`sidebarSub${i}`}
                                text={x.text}
                                href={x.href}
                                dark={dark.dark}
                            />
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
                        sub.map((x, i) => (
                            <SideBarSubItem
                                key={`sidebarSub${i}`}
                                text={x.text}
                                href={x.href}
                                dark={dark.dark}
                            />
                        ))}
                </SideBarSubWrapper>
            </>
        );
    }
});

const SideBarSubItem = ({ text, href, dark }: SubProps) => (
    <ThemedLink dark={dark} to={href!}>
        <SBSubTxt dark={dark}>{text}</SBSubTxt>
    </ThemedLink>
);

export default SideBarItem;
