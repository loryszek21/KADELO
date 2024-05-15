import Htag from "@/app/(site)/components/Htag/Htag";
import P from "@/app/(site)/components/Ptag/Ptag";

type taskProps = {
    id: number;
};

type taskType = {
    tasks_id: number;
    lesson_id: number;
    tasks_title: string;
    tasks_example_input: string[];
    tasks_example_output: string;
    tasks_content: number;
    tasks_complete: string;
};

export default async function ContestInfo({ id }: taskProps) {
    const info: taskType = await fetch(`http://localhost:5000/task/${id}`, {
        cache: "no-cache",
    })
        .then((res) => res.json())
        .catch((e) => console.log(e));

    return (
        <div>
            <Htag tag="h1">{info?.tasks_title}</Htag>
            <P size="m">{info?.tasks_content}</P>

            <P size="l">Example input: </P>
            <P size="m">
                {info?.tasks_example_input.map((el: string) => el + " ")}
            </P>
            <P size="l">Example output:</P>
            <P size="m"> {info?.tasks_example_output}</P>
        </div>
    );
}
