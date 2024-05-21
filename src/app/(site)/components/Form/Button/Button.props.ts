import { HTMLMotionProps } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    appearance: "primary" | "ghost";
}
