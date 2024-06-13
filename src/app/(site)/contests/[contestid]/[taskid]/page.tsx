import { taskType } from "../Task/task.props";
import CodeArea from "./codeArea/codeArea";
import ContestInfo from "./contestInfo/contestInfo";
import styles from "./page.module.scss";

export default async function Contest({
    params,
}: {
    params: { taskid: number };
}) {
    const info: taskType = await fetch(
        `http://localhost:5000/task/${params.taskid}`,
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((e) => console.error(e));
    const course = await fetch(
        `http://localhost:5000/courses/${info.course_id}`,
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((e) => console.error(e));

    return (
        <div className={styles.main}>
            <ContestInfo info={info} />
            <CodeArea id={params.taskid} codeFromDB={info.function_code} />
        </div>
    );
}
