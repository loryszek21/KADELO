'use client'
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from '../Button/Button.module.scss'
import { motion } from 'framer-motion'
import React from 'react';

export default function Button({ appearance, children, padding = 10, ...props }: ButtonProps): JSX.Element {

    const buttonStyle = {
        initial: { rotate: 0 },
        animate: { rotate: 15, x: 10, y: -10 },
    }
    return (
        <motion.button className={cn(styles.button, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost',
        })}
            initial="initial"
            animate="initial"
            {...props}
            whileHover="animate"
            whileTap={{ scale: 0.9 }}
        >
            <span className={styles.title}>
                {children}
            </span>
            <motion.div className={styles.bg}
                variants={buttonStyle}

            >

            </motion.div>
        </motion.button>
    )
}