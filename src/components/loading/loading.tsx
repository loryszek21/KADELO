import { motion } from 'framer-motion'
import styles from './loading.module.scss'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function LoadingSkeleton() {
    const { resolvedTheme } = useTheme()
    const [color, setColor] = useState<string>('')

    // setColor(getComputedStyle(document.documentElement).getPropertyValue('--primary'));
    useEffect(() => {
        setTimeout(() => {
            setColor(getComputedStyle(document.documentElement).getPropertyValue('--primary'))
        }, 10);
    }, [resolvedTheme])

    const style = {
        background: [
            `conic-gradient(transparent 0%, ${color} 0%, ${color} 0%, transparent 0%)`,
            `conic-gradient(transparent 0%, ${color} 0%, ${color} 25%, transparent 25%)`,
            `conic-gradient(transparent 0%, ${color} 0%, ${color} 50%, transparent 50%)`,
            `conic-gradient(transparent 0%, ${color} 0%, ${color} 75%, transparent 75%)`,
            `conic-gradient(transparent 0%, ${color} 0%, ${color} 100%, transparent 100%)`,
            `conic-gradient(transparent 25%, ${color} 25%, ${color} 100%, transparent 100%)`,
            `conic-gradient(transparent 50%, ${color} 50%, ${color} 100%, transparent 100%)`,
            `conic-gradient(transparent 75%, ${color} 75%, ${color} 100%, transparent 100%)`,
            `conic-gradient(transparent 100%, ${color} 100%, ${color} 100%, transparent 100%)`,
        ],
        rotate: [0, 360],
    }

    return (
        <div className={styles.loading}>
            <motion.span
                transition={{ repeat: Infinity, duration: 2 }}
                animate={style}

            ></motion.span>
        </div>
    )
}