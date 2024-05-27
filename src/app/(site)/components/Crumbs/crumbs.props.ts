import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CrumbsProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    crumbs: {
        title: string;
        link: string;
    }[];
    current: string;
}
