import { TaskProps } from "./task.props";
import styles from "./task.module.scss";
import Link from "next/link";
import Htag from "@/app/(site)/components/Htag/Htag";
import P from "@/app/(site)/components/Ptag/Ptag";
import Button from "@/app/(site)/components/Form/Button/Button";
import { getServerSession } from "next-auth";

export default async function Task({ item, index }: TaskProps) {
    // const { data: session, status } = useSession();

    const session = await getServerSession();
    const data = await fetch(
        `http://localhost:5000/courses/tasks/userSolution/${item.tasks_id}/kamil@example.com`,
        {
            cache: "no-cache",
        }
    ).then((res) => res.json());

    const options: any = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    return (
        <Link key={item.tasks_id} href={`task/${item.tasks_id}`}>
            <div className={styles.contest}>
                <div className={styles.contest_info}>
                    <P size="m">{index + 1}</P>
                    <div className={styles.line}></div>
                    <div className={styles.contest_title}>
                        <Htag tag="h3">{item.tasks_title}</Htag>
                        {data?.complited ? (
                            <P size="m">
                                Solved -{" "}
                                {new Intl.DateTimeFormat(
                                    "en-US",
                                    options
                                ).format(new Date(data?.completion_date))}
                            </P>
                        ) : (
                            <P size="m">
                                Not solved
                                {data?.completion_date &&
                                    " - " +
                                        new Intl.DateTimeFormat(
                                            "en-US",
                                            options
                                        ).format(
                                            new Date(data?.completion_date)
                                        )}
                            </P>
                        )}
                    </div>
                </div>
                {data?.complited ? (
                    <Button appearance={"ghost"}>Solved</Button>
                ) : (
                    <Button appearance={"primary"}>Solve</Button>
                )}
            </div>
        </Link>
    );
}
