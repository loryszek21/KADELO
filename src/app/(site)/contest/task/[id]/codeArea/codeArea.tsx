"use client";
import { JSXElementConstructor, useState } from "react";
import CodeEditor from "../codeEditor/codeEditor";
import SubmitButton from "../submitButton/submitButton";
import styles from "./codeArea.module.scss";
import P from "@/app/(site)/components/Ptag/Ptag";
import cn from "classnames";

export default function CodeArea({ id }: any): JSX.Element {
    const [output, setOutput] = useState<any>();
    const [error, setError] = useState<string>();
    const [code, setCode] = useState<string>(`function start(a,b) {\n\n}`);

    const outputModifier = (output: any) => {
        let changed;
        console.log(output);
        changed = output?.map((result: any, index: number) => (
            <div
                key={index}
                className={cn(
                    { [styles.passed]: result.isSolved },
                    { [styles.failed]: !result.isSolved }
                )}
            >
                {result.isSolved ? (
                    <P size="m">Test {index + 1} passed</P>
                ) : (
                    <>
                        <P size="m">Test {index + 1} failed</P>
                        <P size="m">
                            Expected output: {[...result.correctOutput]}
                        </P>
                        <P size="m">Recieved output: {result.output}</P>
                    </>
                )}
            </div>
        ));
        setOutput(changed);
        setError("");
    };
    return (
        <div className={styles.codeContainer}>
            <div className={styles.code}>
                <CodeEditor code={code} setCode={setCode} />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {output && <div className={styles.output}>{output}</div>}
            <div className={styles.submitButton}>
                <SubmitButton
                    id={id}
                    code={code}
                    setOutput={setOutput}
                    setError={setError}
                    outputModifier={outputModifier}
                />
            </div>
        </div>
    );
}
