import { ISidebarItem } from '@/data/ISidebarItem';
import { atomDarkmode } from '@/jotai/darkmode';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { SBIcon, SBSubTxt, SBTxt, SideBarItemWrapper, SideBarSubWrapper } from './sidebarItem.style';

interface Props {
    iconSrc?: string;
    text: string;
    href?: string;
    sub?: ISidebarItem[];
}

interface SubProps {
    text: string;
    href?: string;
    dark: boolean;
}

const SideBarSubItem = ({ text, href, dark }: SubProps) => (
    <ThemedLink dark={dark} to={href!}>
        <SBSubTxt dark={dark}>{text}</SBSubTxt>
    </ThemedLink>
);

const SideBarItem = ({ iconSrc, text, href, sub }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    if (href) {
        return (
            <>
                <ThemedLink dark={dark} to={href}>
                    <SideBarItemWrapper>
                        {iconSrc && <SBIcon src={iconSrc} />}
                        <SBTxt dark={dark}>{text}</SBTxt>
                    </SideBarItemWrapper>
                </ThemedLink>
                <SideBarSubWrapper>
                    {sub &&
                        sub.map((x, i) => (
                            <SideBarSubItem
                                key={`sidebarSub${i}`}
                                text={x.text}
                                href={x.href}
                                dark={dark}
                            />
                        ))}
                </SideBarSubWrapper>
            </>
        );
    }
    return (
        <>
            <SideBarItemWrapper>
                {iconSrc && <SBIcon src={iconSrc} />}
                <SBTxt dark={dark}>{text}</SBTxt>
            </SideBarItemWrapper>
            <SideBarSubWrapper>
                {sub &&
                    sub.map((x, i) => (
                        <SideBarSubItem
                            key={`sidebarSub${i}`}
                            text={x.text}
                            href={x.href}
                            dark={dark}
                        />
                    ))}
            </SideBarSubWrapper>
        </>
    );
};

export default SideBarItem;
