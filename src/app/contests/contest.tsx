import Button from '@/components/Form/Button/Button';
import styles from './page.module.scss';
import P from '@/components/Ptag/Ptag';
import Htag from '@/components/Htag/Htag';
import ProgressRing from '@/components/progress_ring/progress_ring';

type ContestProps = {
    title: string;
    description: string;
    start: Date;
    end: Date;
    task: number;
    completed: number;
}

export default function Contest({ title, description, start, end, task, completed }: ContestProps): JSX.Element {

    console.log(end);

    return (
        <div className={styles.contest}>
            <div className={styles.top_part}>
                <section className={styles.info}>
                    <Htag tag='h2'>{title}</Htag>
                    <P size='m'>{description}</P>
                </section>
                <section className={styles.progress_ring}>
                    <ProgressRing start={start.toDateString()} end={end.toDateString()} task={task} completed={completed} />
                </section>
            </div>
            <div className={styles.bottom_part}>
                <P size='s'>{end.toDateString()}</P>
                <Button appearance='ghost'>Solve</Button>
            </div>
        </div>
    )

}