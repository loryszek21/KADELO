'use client'
import Input from '@/app/(site)/components/Form/Input/Input';
import styles from './login.module.scss';
import { LoginProps } from './login.props';
import cn from 'classnames';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import Button from '@/app/(site)/components/Form/Button/Button';
import Link from 'next/link';
import { useRef } from 'react';
import { FaGoogle } from "react-icons/fa";
import P from '@/app/(site)/components/Ptag/Ptag';

export default function Login({ className, callBackUrl, ...props }: LoginProps): JSX.Element {
    const email = useRef<string>('')
    const password = useRef<string>('')

    const login = async (event: any) => {
        event.preventDefault()
        signIn('credentials', {
            email : email.current,
            password : password.current,
            callbackUrl: callBackUrl
        })
    }

    return (
        <div className={cn(className, styles.login)} {...props}>
            <form className={styles.login_container} onSubmit={(e) => login(e)}>
                <P size='l' className={styles.title}>Login</P>
                <Input placeholder='Email' onChange={(e) => email.current = e.target.value} />
                <Input placeholder='Password' password onChange={(e) => password.current = e.target.value} />
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