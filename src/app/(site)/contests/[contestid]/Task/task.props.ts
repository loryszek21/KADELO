import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TaskProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: taskType;
    index: number;
}

export type taskType = {
    tasks_id: number;
    course_id: number;
    tasks_title: string;
    tasks_description: string;
    tasks_example_input: string[];
    tasks_example_output: string[];
    output_explanation: string[];
    function_code: string;
};
