'use client'
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from '../Button/Button.module.scss'
import { motion } from 'framer-motion'
import React from 'react';

export default function Button({ appearance, children, ...props }: ButtonProps): JSX.Element {

    return (
        <motion.button className={cn(styles.button, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost',
        })}
            {...props}
            whileTap={{ scale: 0.9 }}
        >
            <span className={styles.title}>
                {children}
            </span>
        </motion.button>
    )
}