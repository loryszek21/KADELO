'use client'
import Link from 'next/link';
import P from '../Ptag/Ptag';
import styles from './Menu.module.scss';
import { MenuProps } from './Menu.props';
import { MenuTab, menuTabs as tabs } from './menu_data';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Menu({ ...props }: MenuProps): JSX.Element {
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const router = usePathname()

    return (
        <nav>
            <ul className={styles.list}>
                {tabs.map((item: MenuTab) => (
                    <li
                        key={item.title}
                        className={item === selectedTab ? styles.active : ""}
                        onClick={() => setSelectedTab(item)}
                    >
                        <Link href={item.link}>
                            {item.title}
                        </Link>
                        {item === selectedTab ? (
                            <motion.div className={styles.underline} layoutId="underline" />
                        ) : null}
                    </li>
                ))}
            </ul>
        </nav>
    )
}