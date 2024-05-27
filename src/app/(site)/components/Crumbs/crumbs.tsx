import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import styles from "./crumbs.module.scss";
import { CrumbsProps } from "./crumbs.props";
import React from "react";

export default async function Crumbs({ crumbs, current }: CrumbsProps) {
    console.log(crumbs);

    return (
        <nav className={styles.crumbs}>
            {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    <Link className="activeLink" href={crumb.link}>
                        {crumb.title}
                    </Link>
                    {index !== crumbs.length && <RiArrowRightSLine />}
                </React.Fragment>
            ))}
            <span>{current}</span>
        </nav>
    );
}
