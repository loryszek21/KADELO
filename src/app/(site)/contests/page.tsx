import { error } from 'console';
import Contest from './contest';
import styles from './page.module.scss';

export const metadata: any = {
    title: "About page",
}

async function Contests() {

    const info = await fetch('http://localhost:5000/courses').catch((error)=>console.log(error))
    const data: CoursePageProps[] = await info?.json()

    return (
        <div className={styles.main}>
            <>{
                data?.map((item, i: number) => {
                    return <Contest key={item.course_id} {...item} />
                })
            }</>
        </div>
    )
}

export default Contests;

