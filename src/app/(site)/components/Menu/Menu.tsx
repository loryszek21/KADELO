"use client";
import Link from "next/link";
import P from "../Ptag/Ptag";
import styles from "./Menu.module.scss";
import { MenuProps } from "./Menu.props";
import { MenuTab, menuTabs as tabs } from "./menu_data";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Menu({ ...props }: MenuProps): JSX.Element {
    const router = usePathname();
    const [selectedTab, setSelectedTab] = useState(
        tabs.find((tab) => tab.link === "/" + router?.split("/")[1]) || tabs[0]
    );

    return (
        <nav {...props}>
            <ul className={styles.list}>
                {tabs.map((item: MenuTab) => (
                    <li
                        key={item.title}
                        className={item === selectedTab ? styles.active : ""}
                        onClick={() => setSelectedTab(item)}
                    >
                        <Link className="activeLink" href={item.link}>
                            {item.title}
                        </Link>
                        {item === selectedTab ? (
                            <motion.div
                                className={styles.underline}
                                layoutId="underline"
                            />
                        ) : null}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
