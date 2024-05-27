import { TaskProps } from "./task.props";
import styles from "./task.module.scss";
import Link from "next/link";
import Htag from "@/app/(site)/components/Htag/Htag";
import P from "@/app/(site)/components/Ptag/Ptag";
import Button from "@/app/(site)/components/Form/Button/Button";

export default function Task({ item, index }: TaskProps) {
    return (
        <Link key={item.tasks_id} href={`task/${item.tasks_id}`}>
            <div className={styles.contest}>
                <div className={styles.contest_info}>
                    <P size="m">{index + 1}</P>
                    <div className={styles.line}></div>
                    <Htag tag="h2">{item.tasks_title}</Htag>
                </div>
                {item.tasks_complete ? (
                    <Button appearance={index === 0 ? "primary" : "ghost"}>
                        Solved
                    </Button>
                ) : (
                    <Button appearance={index === 0 ? "primary" : "ghost"}>
                        Solve
                    </Button>
                )}
            </div>
        </Link>
    );
}
