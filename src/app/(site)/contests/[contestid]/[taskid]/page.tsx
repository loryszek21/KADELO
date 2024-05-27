import CodeArea from "./codeArea/codeArea";
import ContestInfo from "./contestInfo/contestInfo";
import styles from "./page.module.scss";

export default function Contest({
    params,
}: {
    params: { taskid: number };
}): JSX.Element {
    return (
        <div className={styles.main}>
            <ContestInfo id={params.taskid} />
            <CodeArea id={params.taskid} />
        </div>
    );
}
