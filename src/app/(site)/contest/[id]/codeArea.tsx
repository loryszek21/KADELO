'use client'
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';
import styles from './page.module.scss';
import cn from 'classnames';
import {motion} from 'framer-motion';
import P from '../../components/Ptag/Ptag';

export default function CodeArea(): JSX.Element{

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { resolvedTheme } = useTheme();
    const [code, setCode] = useState<string>(`function start(a,b) {
    return(a*b)
}
`);
    const [output, setOutput] = useState<any>();
    const [error, setError] = useState<string>('');

    const BUTTON ={
        submit: {
            width: '40px',
            borderRadius: '50%',
            rotate: [0, 360],
            transition: {
                duration: 1,
                repeat: Infinity,
                type: 'bounce',
            }
        },
        reset: {
            width: '100%',
            borderRadius: '10px',
            scale: 1,
            rotate: 0,
        }
    }

    const outputModifier = (output: any) => {
        let changed    
        changed = output.testSolved.map((result:any, index:number) => (
            <P size='s' key={index} className={cn({[styles.passed]: result.isSolved}, {[styles.failed]: !result.isSolved})}>Test {index+1}: {result.isSolved ? "passed": "failed"}</P>
        ))
        setOutput(changed);
        setError("");
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        await fetch('http://localhost:5000/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: JSON.stringify(code), type: '.js' })
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.parse(data));
            // outputModifier(JSON.parse(data));
        })
        .catch(e => {
            console.log('1:', e);
        })
        .finally(() => setSubmitting(false))
    }

    return(
        <div className={styles.codeContainer}>
            <div className={styles.code}>
                <Editor 
                    height="100%"
                    value={code}
                    onChange={(evn:any) => setCode(evn)}
                    defaultLanguage="javascript" 
                    theme={resolvedTheme == "dark" ? 'vs-dark': 'vs-light'}
                />
            </div>
            {error && <div className={styles.output}>
                <P size='s' className={styles.error}>{error}</P>
            </div>}
            {output && <div className={styles.output}>
                {output}
            </div>}
            <div className={styles.submitButton}>
                <motion.button
                    className={cn(styles.button, {[styles.submitting]: isSubmitting})}
                    variants={BUTTON}
                    animate={isSubmitting ? 'submit' : 'reset'}
                    onClick={handleSubmit}
                >
                    <motion.span animate={isSubmitting ? {opacity: 0} : {opacity: 1}}>Submit</motion.span>
                    
                </motion.button>
            </div>
        </div>
        )

}