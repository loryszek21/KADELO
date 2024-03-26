'use client'
import Image from 'next/image';
import Button from '../Form/Button/Button';
import P from '../Ptag/Ptag';
import styles from './Login.module.scss';
import { LoginProps } from './login.props';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login({ className, ...props }: LoginProps): JSX.Element {

    const { data: session } = useSession();
    console.log(session);
    if (session && session.user) {
        return (
            <div className={cn(className, styles.login)} {...props}>
                <P size='m'>{session.user?.name}</P>
                <button onClick={() => signOut()} className={styles.google}>Logout</button>
            </div>
        );
    }

    return (
        <div className={cn(className, styles.login)} {...props}>
            <button onClick={() => signIn()} className={styles.google}>Login with Google</button>
        </div>
    )
}