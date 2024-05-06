'use client'
import { useState } from "react";
import CodeEditor from "../codeEditor/codeEditor";
import SubmitButton from "../submitButton/submitButton";
import styles from './codeArea.module.scss';
import P from "@/app/(site)/components/Ptag/Ptag";
import cn from 'classnames';

export default function CodeArea(): JSX.Element{

    const [output, setOutput] = useState<any>();
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<string>(`function start(a,b) {\n   return(a*b)\n}`);

    const outputModifier = (output: any) => {
        let changed    
        changed = output.testSolved.map((result:any, index:number) => (
            <P size='s' key={index} className={cn({[styles.passed]: result.isSolved}, {[styles.failed]: !result.isSolved})}>Test {index+1}: {result.isSolved ? "passed": "failed"}</P>
        ))
        setOutput(changed);
        setError("");
    }

    return(
        <div className={styles.codeContainer}>
            <div className={styles.code}>
                <CodeEditor code={code} setCode={setCode}/>
            </div>
            {error && <div className={styles.output}>
                <P size='s' className={styles.error}>{error}</P>
            </div>}
            {output && <div className={styles.output}>
                {output}
            </div>}
            <div className={styles.submitButton}>
                <SubmitButton code={code} setOutput={setOutput} setError={setError} outputModifier={outputModifier}/>
            </div>
        </div>
    )

}