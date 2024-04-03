'use client'
import Menu from '../Menu/Menu';
import P from '../Ptag/Ptag';
import ThemeChange from '../Theme/Theme';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header({ className, ...props }: HeaderProps): JSX.Element {

    const { data: session } = useSession();
    // console.log(session)

    return (
        <header className={cn(className, styles.header)} {...props}>
            <P size='l'>Logo</P>
            <Menu />
            {session ?
                <button onClick={() => signOut()}>Logout</button> :
                <>
                    <button onClick={() => signIn()}>Login</button>
                </>
            }
        </header>
    )
}