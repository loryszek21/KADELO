import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TaskProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: taskType;
    index: number;
}

export type taskType = {
    tasks_id: number;
    lesson_id: number;
    tasks_title: string;
    tasks_example_input: string;
    tasks_example_output: string;
    tasks_content: number;
    tasks_complete: string;
};
