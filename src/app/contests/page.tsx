import Contest from './contest';
import styles from './page.module.scss';

export const metadata: any = {
    title: "About page",
}

function Contests(): JSX.Element {

    return (
        <div className={styles.main}>
            <>{
                [0, 2, 3, 4].map((i) => {
                    return <Contest
                        key={i}
                        title={'Title ' + i}
                        description={'description ' + i}
                        start={new Date(Date.now())}
                        end={new Date(new Date().setDate(new Date().getDate() + i))}
                        task={4}
                        completed={i}
                    />
                })
            }</>
        </div>
    )
}

export default Contests;

