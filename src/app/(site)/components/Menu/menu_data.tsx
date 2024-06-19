const menuData = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About",
        link: "/about",
    },
    {
        title: "Contests",
        link: "/contests",
    },
    {
        title: "Shop",
        link: "/shop",
    },
];

const [home, about, contest, shop] = menuData;
export type MenuTab = {
    title: string;
    link: string;
};
export const menuTabs = [home, about, contest, shop];
