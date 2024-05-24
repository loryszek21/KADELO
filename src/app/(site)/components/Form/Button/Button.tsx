"use client";
import { ButtonProps } from "./Button.props";
import cn from "classnames";
import styles from "../Button/Button.module.scss";
import { motion } from "framer-motion";
import React from "react";

export default function Button({
    appearance,
    children,
    ...props
}: ButtonProps): JSX.Element {
    const container = {
        hidden: {},
        visible: {},
    };

    const item = {
        hidden: { y: -100, transition: { duration: 0.5, type: "spring" } },
        visible: { y: 0, transition: { duration: 0.5, type: "spring" } },
    };

    const itemRev = {
        hidden: { y: 0, transition: { duration: 0.5, type: "spring" } },
        visible: { y: 100, transition: { duration: 0.5, type: "spring" } },
    };

    return (
        <motion.button
            className={cn(styles.button, {
                [styles.primary]: appearance === "primary",
                [styles.ghost]: appearance === "ghost",
            })}
            {...props}
            variants={container}
            initial="hidden"
            animate="visible"
            whileHover="hidden"
        >
            <motion.span variants={item}>{children}</motion.span>
            <motion.span variants={itemRev} style={{ position: "absolute" }}>
                {children}
            </motion.span>
        </motion.button>
    );
}
