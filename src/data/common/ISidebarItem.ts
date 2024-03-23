export interface ISidebarItem {
    iconSrc?: string;
    text: string;
    sub?: ISidebarItem[];
    href?: string;
}