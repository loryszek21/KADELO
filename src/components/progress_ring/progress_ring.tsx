'use client'
import styles from './progress_ring.module.scss'
import { motion } from 'framer-motion';
import { ProgressRingProps } from './progress_ring.props';
import ProgressRingTimer from './progress_ring_timer';

export default function ProgressRing(props: ProgressRingProps) {

    let deg = 360;
    if (props.completed > 0) {
        deg = (props.completed / props.task) * 360;
    }

    return (
        <div className={styles.main_circle}>
            <motion.div className={styles.solved_progression}
                initial={{ "background": `conic-gradient(#54B435 0deg, transparent 0deg)` }}
                animate={{ "background": `conic-gradient(#54B435 ${deg}deg, transparent 0deg)` }}
                transition={{ duration: 0.6, type: 'tween' }}
            >
                <ProgressRingTimer start={props.start} end={props.end} />

            </motion.div>
        </div>
    )
}