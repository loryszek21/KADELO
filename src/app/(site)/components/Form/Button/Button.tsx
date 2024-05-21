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
    const text = children?.toString().split("");

    const container = {
        hidden: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
            },
        },
        visible: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: [100, 0] },
        visible: {
            y: 0,
        },
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
            exit="hidden"
            whileHover="hidden"
        >
            {text?.map((el, i) => (
                <motion.span variants={item} key={i}>
                    {el}
                    {"\u00A0"}
                </motion.span>
            ))}
        </motion.button>
    );
}
