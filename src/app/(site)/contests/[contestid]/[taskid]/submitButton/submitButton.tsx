import { motion } from "framer-motion";
import styles from "./submitButton.module.scss";
import cn from "classnames";
import { useState } from "react";
import P from "@/app/(site)/components/Ptag/Ptag";
import { signIn, useSession } from "next-auth/react";

type SubmitButtonProps = {
    id: number;
    outputModifier: (text: any) => void;
    code: string;
    setOutput: any;
    setError: any;
};

export default function SubmitButton({
    id,
    outputModifier,
    code,
    setOutput,
    setError,
}: SubmitButtonProps): JSX.Element {
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { data: session, status } = useSession();

    const BUTTON = {
        submit: {
            width: "40px",
            borderRadius: "50%",
            rotate: [0, 360],
            transition: {
                duration: 1,
                repeat: Infinity,
                type: "bounce",
            },
        },
        reset: {
            width: "100%",
            borderRadius: "10px",
            scale: 1,
            rotate: 0,
        },
    };

    const handleSubmit = async () => {
        if (status === "unauthenticated") {
            setError(
                <P size="m">
                    You need to be logged in to submit your code{" "}
                    <a onClick={() => signIn()}>Log in</a>
                </P>
            );
            return;
        }
        setOutput(null);
        setError("");
        setSubmitting(true);
        try {
            const response = await fetch(`http://localhost:5000/test/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: JSON.stringify(code),
                    email: session?.user?.email,
                }),
            })
                .then((res) => res.json())
                .then(async (data) => await JSON.parse(data))
                .then((data) => outputModifier(data))
                .catch((error) => {
                    console.error("Error:", error);
                });
        } catch (e: any) {
            console.log(e);
            setError(e.SyntaxError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.button
            className={cn(styles.button, { [styles.submitting]: isSubmitting })}
            variants={BUTTON}
            animate={isSubmitting ? "submit" : "reset"}
            onClick={handleSubmit}
        >
            <motion.span
                animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
            >
                Submit
            </motion.span>
        </motion.button>
    );
}
