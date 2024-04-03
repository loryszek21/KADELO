import { useEffect, useState } from 'react';
import styles from './progress_ring.module.scss';
import Timestamp from 'react-timestamp';
import { ProgressRingTimerProps } from './progress_ring.props';

export default function ProgressRingTimer(props: ProgressRingTimerProps): JSX.Element {

    const [time, setTime] = useState("");
    var now = new Date().getTime();

    var distance = new Date(props.end).getTime() - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    useEffect(() => {
        if (seconds > 0) {
            const timerInterval = setTimeout(() => {
                setTime(`${hours} : ${minutes} : ${seconds}`);
            }, 1000)
            return () => clearInterval(timerInterval);
        }
    }, [time])

    return (
        <div className={styles.up_circle} >
            {time ? days > 1 ?
                <Timestamp date={new Date()} relativeTo={props.end} /> : time
                : "END"
            }
        </div>
    )

}