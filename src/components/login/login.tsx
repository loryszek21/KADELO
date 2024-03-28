'use client'
import Input from '@/components/Form/Input/Input';
import P from '../Ptag/Ptag';
import styles from './login.module.scss';
import { LoginProps } from './login.props';
import cn from 'classnames';
import { signIn, useSession } from 'next-auth/react';
import Button from '@/components/Form/Button/Button';
import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";

export default function Login({ className, ...props }: LoginProps): JSX.Element {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const session = useSession();

    const login = async (event: any) => {
        event.preventDefault()
        const resp = await fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (res.ok) {
                    session.data = { user: { email }, expires: '2024-04-27T14:17:38.783Z' }
                    session.status = 'authenticated'
                    session.update()
                    console.log(session)
                }
                throw new Error('Error')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={cn(className, styles.login)} {...props}>
            <form className={styles.login_container} onSubmit={(e) => login(e)}>
                <P size='l' className={styles.title}>Login</P>
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Password' password value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button appearance='primary'>Login</Button>
            </form>
            <div className={styles.line} />
            <div className={cn(className, styles.login_google)}>
                <Button onClick={() => signIn('google')} appearance='primary'>Login with Google <FaGoogle /></Button>
            </div>
            <section className={styles.registration}>
                <P size='m'>Don`t have an account? <Link className={styles.reg_link} href='/registration'>Register</Link></P>
            </section>
        </div>
    )
}