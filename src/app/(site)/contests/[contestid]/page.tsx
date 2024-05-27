import Link from "next/link";
import Htag from "../../components/Htag/Htag";
import P from "../../components/Ptag/Ptag";
import styles from "./page.module.scss";
import { taskType } from "./Task/task.props";
import Task from "./Task/task";

export default async function Contest({
    params,
}: {
    params: { contestid: number };
}) {
    const data: taskType[] = await fetch(
        `http://localhost:5000/courses/tasks/${params.contestid}`,
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error:", error);
        });

    return (
        <div className={styles.main}>
            {data?.map((item, i: number) => (
                <Task key={item.tasks_id} item={item} index={i} />
            ))}
        </div>
    );
}
