'use client'
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';
import styles from './page.module.scss';
import cn from 'classnames';
import {motion} from 'framer-motion';

export default function CodeArea(): JSX.Element{

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { resolvedTheme } = useTheme();
    const [code, setCode] = useState<string>(`function start(a,b) {
    return(a*b)
}

module.exports = {start};`);
    const [output, setOutput] = useState<any>();


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

    const handleSubmit = () => {
        setSubmitting(true);
        fetch('http://localhost:5000/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: JSON.stringify(code), type: '.js' })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                throw new Error("data.details");
            }
            setOutput(data.message);
        })
        .catch(error => {
            console.error('1:', error);
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
                    defaultValue="// some comment" 
                    theme={resolvedTheme == "dark" ? 'vs-dark': 'vs-light'}
                />
            </div>
            <div className={styles.output}>
                <Editor
                    height="100%"
                    value={output}
                    defaultLanguage="txt"
                    theme={resolvedTheme == "dark" ? 'vs-dark': 'vs-light'}
                />
            </div>
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