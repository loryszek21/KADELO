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
];

const [home, about, contest] = menuData;
export type MenuTab = {
    title: string;
    link: string;
};
export const menuTabs = [home, about, contest];
