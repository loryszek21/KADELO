import Link from "next/link";
import Htag from "../../components/Htag/Htag";
import P from "../../components/Ptag/Ptag";
import styles from "./page.module.scss";

type taskType = {
    tasks_id: number;
    lesson_id: number;
    tasks_title: string;
    tasks_example_input: string;
    tasks_example_output: string;
    tasks_content: number;
    tasks_complete: string;
};

export default async function Contest({ params }: { params: { id: number } }) {
    const data: taskType[] = await fetch(
        `http://localhost:5000/courses/tasks/${params.id}`,
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
            {data?.map((item, i: number) => {
                return (
                    <Link key={item.tasks_id} href={`/task/${item.tasks_id}`}>
                        <div className={styles.contest}>
                            <span>{i}</span>
                            <Htag tag="h2">{item.tasks_title}</Htag>
                            <P size="m">
                                {item.tasks_complete ? "Solved" : "Solve"}
                            </P>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
