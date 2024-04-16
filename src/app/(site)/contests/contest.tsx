import Button from '@/app/(site)/components/Form/Button/Button';
import styles from './page.module.scss';
import P from '@/app/(site)/components/Ptag/Ptag';
import Htag from '@/app/(site)/components/Htag/Htag';
import ProgressRing from '@/app/(site)/components/progress_ring/progress_ring';
import Link from 'next/link';

export default function Contest(course: CoursePageProps): JSX.Element {

    return (
        <div className={styles.contest}>
            <div className={styles.top_part}>
                <section className={styles.info}>
                    <Htag tag='h2'>{course.course_name}</Htag>
                    <P size='m'>{course.course_description}</P>
                </section>
                <section className={styles.progress_ring}>
                    <ProgressRing start={course.course_time_start.toString()} end={course.course_time_end.toString()} task={5} completed={3} />
                </section>
            </div>
            <div className={styles.bottom_part}>
                {/* <Timestamp date={course.course_time_end} /> */}
                <Link href={`/contest/${course.course_id}`}>
                    <Button appearance='ghost'>Solve</Button>
                </Link>
            </div>
        </div>
    )

}