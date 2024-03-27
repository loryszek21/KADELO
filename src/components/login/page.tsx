'use client'
import Input from '@/components/Form/Input/Input';
import P from '../Ptag/Ptag';
import styles from './page.module.scss';
import { LoginProps } from './page.props';
import cn from 'classnames';
import { signIn } from 'next-auth/react';
import Button from '@/components/Form/Button/Button';
import Link from 'next/link';

export default function Login({ className, ...props }: LoginProps): JSX.Element {

    return (
        <div className={cn(className, styles.login)} {...props}>
            <form action="" className={styles.login_container}>
                <P size='l' className={styles.title}>Login</P>
                <Input placeholder='Email' />
                <Input placeholder='Password' password />
                <Button appearance='primary'>Login</Button>
            </form>
            <div className={styles.line} />
            <div className={cn(className, styles.login_google)}>
                <Button onClick={() => signIn('google')} appearance='primary'>Login with Google</Button>
            </div>
            <section className={styles.registration}>
                <P size='m'>Don`t have an account? <Link className={styles.reg_link} href='/registration'>Register</Link></P>
            </section>
        </div>
    )
}