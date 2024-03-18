import styles from './page.module.scss';

export const metadata: any = {
    title: "About page",
}

function Contest(): JSX.Element {

    return (
        <div className={styles.main}>
            Contest page
        </div>
    )
}

export default Contest;

