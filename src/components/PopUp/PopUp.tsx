'use client'
import styles from './PopUp.module.scss';
import { motion } from 'framer-motion';
import { PupUpProps } from './PopUp.props';
import cn from 'classnames';

export default function PopUp({ children, classname, isOpen = false, setOpened }: PupUpProps): JSX.Element {

    return (
        isOpen ?
            <div className={cn(classname, styles.body)} onClick={() => setOpened(false)}>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
            : <></>
    )

}