import HeaderNavDataKo from "@/lang/header/headerNavData-ko";
import HeaderNavDataJp from "@/lang/header/headerNavData-jp";
import HeaderNavDataEn from "@/lang/header/headerNavData-en";
import {ISidebarItem} from "@/data/common/ISidebarItem";

export const getSideBarList = (lang: string): Array<ISidebarItem> => {
    const HeaderNavData =
        lang === "ko" ? HeaderNavDataKo : lang === "jp" ? HeaderNavDataJp : HeaderNavDataEn;

    const arr = [
        {
            // index
            iconSrc: "/general-img/header/logo.png",
            text: "Skill Navigator",
            href: HeaderNavData.title.url,
        },
        {
            // profile
            iconSrc: "/general-img/header/mydata.png",
            text: HeaderNavData.mydata.text,
            sub: HeaderNavData.mydata.sub.map((x) => ({
                text: x.title,
                href: x.link,
            })),
        },
        {
            // skill
            iconSrc: "/general-img/header/skill.png",
            text: HeaderNavData.skill.text,
            sub: HeaderNavData.skill.sub.map((x) => ({
                text: x.title,
                href: x.link,
            })),
        },
        {
            // Pattern
            iconSrc: "/general-img/header/pattern.png",
            text: HeaderNavData.pattern.text,
            sub: HeaderNavData.pattern.sub.map((x) => ({
                text: x.title,
                href: x.link,
            })),
        },
        {
            // Tower
            iconSrc: "/general-img/header/tower.png",
            text: HeaderNavData.tower.title,
            href: HeaderNavData.tower.link,
        },
    ];

    return arr;
};
