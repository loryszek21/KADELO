import CodeArea from "./codeArea/codeArea";
import ContestInfo from "./contestInfo";
import styles from "./page.module.scss";

export default function Contest({
    params,
}: {
    params: { id: number };
}): JSX.Element {
    return (
        <div className={styles.main}>
            <ContestInfo id={params.id} />
            <CodeArea id={params.id} />
        </div>
    );
}
