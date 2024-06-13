import Htag from "@/app/(site)/components/Htag/Htag";
import P from "@/app/(site)/components/Ptag/Ptag";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { taskProps } from "./contestInfo.props";
import styles from "./contestInfo.module.scss";
import Crumbs from "@/app/(site)/components/Crumbs/crumbs";
import { taskType } from "../../Task/task.props";

export default async function ContestInfo({ info }: taskProps) {
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
            <Crumbs
                crumbs={[
                    { title: "All courses", link: "/contests" },
                    {
                        title: course.course_name,
                        link: `/contests/${info.course_id}`,
                    },
                ]}
                current={info.tasks_title}
            />
            <Htag tag="h1">{info?.tasks_title}</Htag>

            <span>
                <P size="l">Description: </P>
                <P className={styles.darker} size="m">
                    {info?.tasks_description}
                </P>
            </span>

            <span>
                <P size="l">Example input: </P>
                <P className={styles.darker} size="m">
                    {info?.tasks_example_input.map((el: string) => el + " ")}
                </P>
            </span>
            <span>
                <P size="l">Example output:</P>
                <P className={styles.darker} size="m">
                    {" "}
                    {info?.tasks_example_output}
                </P>
            </span>
        </div>
    );
}
