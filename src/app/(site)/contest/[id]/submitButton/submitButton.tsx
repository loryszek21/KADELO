import {motion} from 'framer-motion';
import styles from './submitButton.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import P from '@/app/(site)/components/Ptag/Ptag';

type SubmitButtonProps = {
    outputModifier: (text :any) => void,
    code: string,
    setOutput: any,
    setError: any,
}

export default function SubmitButton({outputModifier, code, setOutput, setError}: SubmitButtonProps): JSX.Element{
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

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

    const handleSubmit = async () => {
        setOutput(null);
        setError('');
        setSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: JSON.stringify(code) })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            outputModifier(JSON.parse(data));
        } catch (e: any) {
            console.log(e);
            setError(e.SyntaxError)
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <motion.button
            className={cn(styles.button, {[styles.submitting]: isSubmitting})}
            variants={BUTTON}
            animate={isSubmitting ? 'submit' : 'reset'}
            onClick={handleSubmit}
        >
            <motion.span animate={isSubmitting ? {opacity: 0} : {opacity: 1}}>Submit</motion.span>
        </motion.button>
    )
}